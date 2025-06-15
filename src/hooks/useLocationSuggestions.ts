
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LocationSuggestion {
  location: string;
  count: number;
}

export const useLocationSuggestions = (location: string) => {
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchLocationSuggestions = async () => {
      if (location.trim().length >= 2) {
        setIsLoadingSuggestions(true);
        try {
          // Get the current session to check if user is authenticated
          const { data: { session } } = await supabase.auth.getSession();
          
          // Query hotels table with proper error handling
          const query = supabase
            .from('hotels')
            .select('location')
            .ilike('location', `%${location.trim()}%`)
            .limit(10);

          const { data, error } = await query;

          if (error) {
            console.warn('Error fetching location suggestions:', error.message);
            // Handle the case where RLS might be blocking the query
            if (error.message.includes('RLS') || error.message.includes('policy')) {
              console.info('Note: Location suggestions require authentication for full functionality');
            }
            setLocationSuggestions([]);
            setShowSuggestions(false);
          } else if (data) {
            // Group by location and count occurrences
            const locationMap = new Map<string, number>();
            data.forEach(hotel => {
              const loc = hotel.location;
              locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
            });

            const suggestions = Array.from(locationMap.entries())
              .map(([location, count]) => ({ location, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5);

            setLocationSuggestions(suggestions);
            setShowSuggestions(suggestions.length > 0);
          }
        } catch (error) {
          console.warn('Unexpected error fetching location suggestions:', error);
          setLocationSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocationSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [location]);

  return {
    locationSuggestions,
    showSuggestions,
    setShowSuggestions,
    isLoadingSuggestions
  };
};
