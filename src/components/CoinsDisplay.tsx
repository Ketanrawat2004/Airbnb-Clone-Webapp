import { Coins, Loader2 } from 'lucide-react';
import { useCoins } from '@/hooks/useCoins';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const CoinsDisplay = () => {
  const { balance, loading } = useCoins();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full">
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/games')}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
    >
      <Coins className="h-5 w-5" />
      <span>{balance.toLocaleString()}</span>
      <span className="text-xs">BNB</span>
    </Button>
  );
};

export default CoinsDisplay;