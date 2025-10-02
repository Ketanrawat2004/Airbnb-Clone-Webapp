import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Trophy, Gamepad2, Zap, Target } from 'lucide-react';
import { useCoins } from '@/hooks/useCoins';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Games = () => {
  const { balance, addCoins } = useCoins();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState<string | null>(null);

  const games = [
    {
      id: 'number-guess',
      name: 'Number Guess',
      icon: Target,
      description: 'Guess the number between 1-100',
      reward: '10-50 BNB Coins',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'memory-match',
      name: 'Memory Match',
      icon: Gamepad2,
      description: 'Match pairs to win coins',
      reward: '20-100 BNB Coins',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'quick-click',
      name: 'Quick Click',
      icon: Zap,
      description: 'Click as fast as you can!',
      reward: '15-75 BNB Coins',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const playNumberGuess = async () => {
    if (!user) {
      toast.error('Please login to play games');
      return;
    }

    setPlaying('number-guess');
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guess = 0;

    while (guess !== target && attempts < 10) {
      const input = prompt(`Attempt ${attempts + 1}/10: Guess a number between 1-100:`);
      if (input === null) break;
      
      guess = parseInt(input);
      attempts++;

      if (guess < target) {
        alert('Too low!');
      } else if (guess > target) {
        alert('Too high!');
      } else {
        const coins = Math.max(10, 50 - (attempts * 4));
        await addCoins(coins, `Won Number Guess in ${attempts} attempts!`);
        
        // Save score
        await supabase.from('game_scores').insert({
          user_id: user.id,
          game_name: 'Number Guess',
          score: 100 - (attempts * 10),
          coins_earned: coins
        });
        
        break;
      }
    }

    if (guess !== target) {
      toast('Game Over', { description: `The number was ${target}` });
    }

    setPlaying(null);
  };

  const playMemoryMatch = async () => {
    if (!user) {
      toast.error('Please login to play games');
      return;
    }

    setPlaying('memory-match');
    
    const items = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒'];
    const pairs = [...items, ...items].sort(() => Math.random() - 0.5);
    
    let found = 0;
    let attempts = 0;
    const maxAttempts = 20;

    alert('Remember these emojis: ' + items.join(' '));
    await new Promise(resolve => setTimeout(resolve, 3000));

    while (found < items.length && attempts < maxAttempts) {
      const pos1 = prompt(`Attempt ${attempts + 1}/${maxAttempts}\nPick first position (1-12):`);
      if (pos1 === null) break;
      
      const pos2 = prompt(`Pick second position (1-12):`);
      if (pos2 === null) break;

      attempts++;
      const idx1 = parseInt(pos1) - 1;
      const idx2 = parseInt(pos2) - 1;

      if (pairs[idx1] === pairs[idx2] && idx1 !== idx2) {
        alert(`Match! ${pairs[idx1]}`);
        found++;
      } else {
        alert('No match!');
      }
    }

    if (found === items.length) {
      const coins = Math.max(20, 100 - (attempts * 4));
      await addCoins(coins, `Won Memory Match with ${attempts} attempts!`);
      
      await supabase.from('game_scores').insert({
        user_id: user.id,
        game_name: 'Memory Match',
        score: 100 - (attempts * 5),
        coins_earned: coins
      });
    } else {
      toast('Game Over', { description: 'Better luck next time!' });
    }

    setPlaying(null);
  };

  const playQuickClick = async () => {
    if (!user) {
      toast.error('Please login to play games');
      return;
    }

    setPlaying('quick-click');
    
    alert('Click OK as fast as you can! (10 rounds)');
    const startTime = Date.now();
    
    for (let i = 1; i <= 10; i++) {
      alert(`Round ${i}/10 - Click OK quickly!`);
    }
    
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    
    const score = Math.max(0, 100 - Math.floor(totalTime));
    const coins = Math.max(15, Math.floor(75 - (totalTime * 3)));
    
    await addCoins(coins, `Completed Quick Click in ${totalTime.toFixed(2)}s!`);
    
    await supabase.from('game_scores').insert({
      user_id: user.id,
      game_name: 'Quick Click',
      score: score,
      coins_earned: coins
    });

    toast.success(`Your time: ${totalTime.toFixed(2)}s`, { description: `Earned ${coins} BNB Coins!` });
    
    setPlaying(null);
  };

  const handlePlay = (gameId: string) => {
    if (!user) {
      toast.error('Please login to play games');
      navigate('/profile');
      return;
    }

    switch (gameId) {
      case 'number-guess':
        playNumberGuess();
        break;
      case 'memory-match':
        playMemoryMatch();
        break;
      case 'quick-click':
        playQuickClick();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-4 rounded-full shadow-lg mb-6"
          >
            <Coins className="h-8 w-8" />
            <span className="text-3xl font-bold">{balance}</span>
            <span>BNB Coins</span>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4">Play Games & Earn Coins</h1>
          <p className="text-gray-600 text-lg">
            Win BNB Coins and use them for booking discounts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center mb-4 mx-auto`}>
                  <game.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-center mb-2">{game.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-4">{game.description}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4 text-yellow-600">
                  <Trophy className="h-4 w-4" />
                  <span className="font-semibold text-sm">{game.reward}</span>
                </div>

                <Button
                  onClick={() => handlePlay(game.id)}
                  disabled={playing === game.id}
                  className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90`}
                >
                  {playing === game.id ? 'Playing...' : 'Play Now'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-600" />
              How to Use BNB Coins
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Play games to earn BNB Coins</li>
              <li>• Use coins during booking for instant discounts</li>
              <li>• 1 BNB Coin = ₹1 discount</li>
              <li>• Valid on hotels, flights, trains & buses</li>
              <li>• No expiry - use anytime!</li>
            </ul>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Games;