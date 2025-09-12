
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetchCount = async () => {
      try {
        // Increment the visitor count
        const { data, error } = await supabase.rpc('increment_visitor_count');
        
        if (error) {
          console.error('Error incrementing visitor count:', error);
          // If incrementing fails, try to just fetch the current count
          const { data: countData, error: fetchError } = await supabase
            .from('visitor_counter')
            .select('visit_count')
            .eq('id', 1)
            .single();
          
          if (!fetchError && countData) {
            setVisitorCount(countData.visit_count);
          }
        } else if (data && (Array.isArray(data) ? data.length > 0 : true)) {
          const count = Array.isArray(data) ? data[0].visit_count : (data as any).visit_count;
          if (typeof count === 'number') setVisitorCount(count);
        }
      } catch (error) {
        console.error('Error with visitor counter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementAndFetchCount();

    // Realtime subscription to visitor count updates
    const channel = supabase
      .channel('visitor-counter')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'visitor_counter', filter: 'id=eq.1' }, (payload: any) => {
        const newCount = (payload.new?.visit_count as number) ?? null;
        if (typeof newCount === 'number') setVisitorCount(newCount);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { visitorCount, isLoading };
};
