import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useCoins = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    if (!user) {
      setBalance(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setBalance(data.balance);
      } else {
        // Create initial coins record
        const { error: insertError } = await supabase
          .from('user_coins')
          .insert({
            user_id: user.id,
            balance: 0,
            total_earned: 0,
            total_spent: 0
          });

        if (insertError) throw insertError;
        setBalance(0);
      }
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCoins = async (amount: number, reason: string) => {
    if (!user) return false;

    try {
      const { data: current, error: fetchError } = await supabase
        .from('user_coins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('user_coins')
        .update({
          balance: current.balance + amount,
          total_earned: current.total_earned + amount
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setBalance(prev => prev + amount);
      toast.success(`+${amount} BNB Coins! ${reason}`);
      return true;
    } catch (error) {
      console.error('Error adding coins:', error);
      toast.error('Failed to add coins');
      return false;
    }
  };

  const useCoinsForBooking = async (amount: number) => {
    if (!user) return false;
    if (balance < amount) {
      toast.error('Insufficient BNB Coins');
      return false;
    }

    try {
      const { data: current, error: fetchError } = await supabase
        .from('user_coins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('user_coins')
        .update({
          balance: current.balance - amount,
          total_spent: current.total_spent + amount
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setBalance(prev => prev - amount);
      return true;
    } catch (error) {
      console.error('Error using coins:', error);
      toast.error('Failed to use coins');
      return false;
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  return {
    balance,
    loading,
    addCoins,
    useCoinsForBooking,
    refetchBalance: fetchBalance
  };
};