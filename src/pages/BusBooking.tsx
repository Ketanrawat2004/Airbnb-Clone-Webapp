import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useCoins } from '@/hooks/useCoins';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Bus, Coins } from 'lucide-react';

const BusBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance, useCoinsForBooking } = useCoins();
  
  const busId = searchParams.get('busId') || '';
  const operator = searchParams.get('operator') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const price = parseInt(searchParams.get('price') || '800');
  
  const [passengerName, setPassengerName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [useDemoPayment, setUseDemoPayment] = useState(false);
  
  const maxCoinsUsable = Math.min(balance, Math.floor(price * 0.5));
  const finalAmount = price - coinsToUse;

  const handleCoinsChange = (value: number) => {
    if (value <= maxCoinsUsable) {
      setCoinsToUse(value);
    }
  };

  const handlePayment = async (paymentMethod: 'razorpay' | 'demo') => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (!passengerName || !age || !gender || !mobile || !email || !seatNumber) {
      toast.error('Please fill all passenger details');
      return;
    }

    try {
      const { data: booking, error: bookingError } = await supabase
        .from('bus_bookings')
        .insert({
          user_id: user.id,
          bus_data: {
            busId,
            operator,
            from,
            to,
            date
          },
          passenger_data: {
            name: passengerName,
            age,
            gender,
            seatNumber
          },
          contact_info: {
            mobile,
            email
          },
          total_amount: price,
          coins_used: coinsToUse,
          actual_amount_paid: finalAmount,
          payment_status: paymentMethod === 'demo' ? 'completed' : 'pending',
          status: paymentMethod === 'demo' ? 'confirmed' : 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      if (coinsToUse > 0) {
        await useCoinsForBooking(coinsToUse);
      }

      if (paymentMethod === 'demo') {
        toast.success('Booking confirmed! (Demo Payment)');
        navigate('/profile');
      } else {
        const { data: orderData } = await supabase.functions.invoke('create-razorpay-payment', {
          body: {
            amount: finalAmount,
            bookingId: booking.id,
            bookingType: 'bus'
          }
        });

        const options = {
          key: 'rzp_test_u0iXBOe3j5A9Uf',
          amount: orderData.amount,
          currency: 'INR',
          name: 'Bus Booking',
          description: `${from} to ${to}`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            const { data: verifyData } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking.id,
                bookingType: 'bus'
              }
            });

            if (verifyData.success) {
              toast.success('Booking confirmed!');
              navigate('/profile');
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Complete Your Bus Booking</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Bus className="h-5 w-5 text-green-600" />
                  Journey Details
                </h2>
                <div className="space-y-2">
                  <p><span className="font-semibold">Operator:</span> {operator}</p>
                  <p><span className="font-semibold">Bus ID:</span> {busId}</p>
                  <p><span className="font-semibold">From:</span> {from}</p>
                  <p><span className="font-semibold">To:</span> {to}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(date).toLocaleDateString()}</p>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={passengerName} onChange={(e) => setPassengerName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Age *</Label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>
                  <div>
                    <Label>Gender *</Label>
                    <select 
                      className="w-full border rounded-md p-2"
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label>Seat Number *</Label>
                    <Input value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} placeholder="e.g., A1" />
                  </div>
                  <div>
                    <Label>Mobile *</Label>
                    <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Email *</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Price Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Base Fare:</span>
                    <span className="font-semibold">₹{price}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-yellow-500" />
                        BNB Coins:
                      </span>
                      <span className="text-sm text-gray-600">{balance} available</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="0"
                        max={maxCoinsUsable}
                        value={coinsToUse}
                        onChange={(e) => handleCoinsChange(parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCoinsToUse(maxCoinsUsable)}
                      >
                        Max
                      </Button>
                    </div>
                    {coinsToUse > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        -₹{coinsToUse} discount
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Max 50% of total can be paid with coins
                    </p>
                  </div>

                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">₹{finalAmount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="demo" 
                      checked={useDemoPayment}
                      onCheckedChange={(checked) => setUseDemoPayment(checked as boolean)}
                    />
                    <label htmlFor="demo" className="text-sm cursor-pointer">
                      Use Demo Payment (Testing)
                    </label>
                  </div>

                  {useDemoPayment ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700"
                      onClick={() => handlePayment('demo')}
                    >
                      Complete Demo Booking
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700"
                      onClick={() => handlePayment('razorpay')}
                    >
                      Pay with Razorpay
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusBooking;
