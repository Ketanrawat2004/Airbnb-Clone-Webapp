
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
        } else if (data && data.length > 0) {
          setVisitorCount(data[0].visit_count);
        }
      } catch (error) {
        console.error('Error with visitor counter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementAndFetchCount();
  }, []);

  return { visitorCount, isLoading };
};
