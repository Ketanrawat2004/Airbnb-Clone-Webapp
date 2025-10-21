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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Train, IndianRupee, Coins, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const TrainBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance, useCoinsForBooking } = useCoins();
  
  const trainNumber = searchParams.get('trainNumber') || '';
  const trainName = searchParams.get('trainName') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const trainClass = searchParams.get('class') || 'SL';
  const departureTime = searchParams.get('departureTime') || '';
  const arrivalTime = searchParams.get('arrivalTime') || '';
  const duration = searchParams.get('duration') || '';
  const price = parseInt(searchParams.get('price') || '500');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState([{
    name: '',
    age: '',
    gender: '',
    nationality: 'India',
    berthPreference: 'No Preference'
  }]);
  const [mobile, setMobile] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [autoUpgrade, setAutoUpgrade] = useState(false);
  const [confirmBerth, setConfirmBerth] = useState(false);
  const [coachPreference, setCoachPreference] = useState('');
  const [paymentMode, setPaymentMode] = useState<'online' | 'upi'>('online');
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [useDemoPayment, setUseDemoPayment] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState({
    passengers: true,
    contact: false,
    preferences: false,
    insurance: false,
    payment: false
  });
  
  const insuranceFee = 45;
  const convenienceFee = paymentMode === 'online' ? 15 : 10;
  const maxCoinsUsable = Math.min(balance, Math.floor(price * 0.5));
  const totalAmount = price + (travelInsurance ? insuranceFee : 0) + convenienceFee - coinsToUse;

  const addPassenger = () => {
    setPassengers([...passengers, {
      name: '',
      age: '',
      gender: '',
      nationality: 'India',
      berthPreference: 'No Preference'
    }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const validateStep1 = () => {
    for (const passenger of passengers) {
      if (!passenger.name || !passenger.age || !passenger.gender) {
        toast.error('Please fill all passenger details');
        return false;
      }
    }
    if (!mobile || mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    try {
      const { data: booking, error: bookingError } = await supabase
        .from('train_bookings')
        .insert({
          user_id: user.id,
          train_data: {
            trainNumber,
            trainName,
            from,
            to,
            date,
            class: trainClass,
            departureTime,
            arrivalTime,
            duration
          },
          passenger_data: passengers,
          contact_info: {
            mobile,
            gstNumber,
            travelInsurance,
            autoUpgrade,
            confirmBerth,
            coachPreference
          },
          total_amount: price + (travelInsurance ? insuranceFee : 0) + convenienceFee,
          coins_used: coinsToUse,
          actual_amount_paid: totalAmount,
          payment_status: useDemoPayment ? 'completed' : 'pending',
          status: useDemoPayment ? 'confirmed' : 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      if (coinsToUse > 0) {
        await useCoinsForBooking(coinsToUse);
      }

      if (useDemoPayment) {
        toast.success('Booking confirmed! (Demo Payment)');
        navigate('/profile');
      } else {
        const { data: orderData } = await supabase.functions.invoke('create-razorpay-payment', {
          body: {
            amount: totalAmount,
            bookingId: booking.id,
            bookingType: 'train'
          }
        });

        const options = {
          key: 'rzp_test_u0iXBOe3j5A9Uf',
          amount: orderData.amount,
          currency: 'INR',
          name: 'Train Booking',
          description: `${trainName} - ${from} to ${to}`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            const { data: verifyData } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking.id,
                bookingType: 'train'
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

  const steps = [
    { number: 1, label: 'Passenger Details' },
    { number: 2, label: 'Review Journey' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    currentStep >= step.number 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className={`mt-2 text-xs md:text-sm font-semibold ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 md:w-24 h-1 mx-2 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Journey Details */}
            <Card className="p-4 md:p-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4 flex items-center gap-2 text-sm">
                <span className="text-yellow-700">⚠</span>
                <span className="text-gray-700">Senior Citizen concession not allowed for this Train/Quota/Class. Person With Disability/ Journalist may check after entering details.</span>
              </div>

              <h2 className="text-xl font-bold mb-4">{trainName} ({trainNumber})</h2>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">{departureTime} | {from}</div>
                  <div className="text-sm text-gray-600">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-gray-600">{duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{arrivalTime} | {to}</div>
                  <div className="text-sm text-gray-600">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {trainClass} | General | Boarding at {from} | Boarding Date: {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} {departureTime}
              </div>
            </Card>

            {currentStep === 1 && (
              <>
                {/* Passenger Details */}
                <Card>
                  <button 
                    onClick={() => toggleSection('passengers')}
                    className="w-full p-4 md:p-6 flex justify-between items-center"
                  >
                    <h2 className="text-lg md:text-xl font-bold">Passenger Details</h2>
                    {expandedSections.passengers ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {expandedSections.passengers && (
                    <div className="px-4 md:px-6 pb-6 space-y-6">
                      <div className="bg-orange-50 p-3 rounded text-sm space-y-1">
                        <p>• Note: Please submit full name of the passengers instead of initials.</p>
                        <p>• Note: The ID card will be required during journey</p>
                      </div>

                      {passengers.map((passenger, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Passenger {index + 1}</h3>
                            {passengers.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removePassenger(index)}
                                className="text-red-600"
                              >
                                ✕
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                              placeholder="Name"
                              value={passenger.name}
                              onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                              className="md:col-span-1"
                            />
                            <Input
                              type="number"
                              placeholder="Age"
                              value={passenger.age}
                              onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                            />
                            <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, 'gender', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Transgender">Transgender</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select value={passenger.berthPreference} onValueChange={(value) => updatePassenger(index, 'berthPreference', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Berth Preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="No Preference">No Preference</SelectItem>
                                <SelectItem value="Lower">Lower</SelectItem>
                                <SelectItem value="Middle">Middle</SelectItem>
                                <SelectItem value="Upper">Upper</SelectItem>
                                <SelectItem value="Side Lower">Side Lower</SelectItem>
                                <SelectItem value="Side Upper">Side Upper</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}

                      <Button 
                        variant="link" 
                        className="text-blue-600"
                        onClick={addPassenger}
                      >
                        + Add Passenger/ Add Infant With Berth
                      </Button>
                      
                      <p className="text-sm text-gray-600">
                        *Children under 5 years of age shall be carried free and no purchase of any ticket is required. (If no separate berth is opted.)
                      </p>
                    </div>
                  )}
                </Card>

                {/* Contact Details */}
                <Card>
                  <button 
                    onClick={() => toggleSection('contact')}
                    className="w-full p-4 md:p-6 flex justify-between items-center"
                  >
                    <h2 className="text-lg md:text-xl font-bold">Contact Details</h2>
                    {expandedSections.contact ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {expandedSections.contact && (
                    <div className="px-4 md:px-6 pb-6 space-y-4">
                      <p className="text-sm text-gray-600">
                        (Ticket details will be sent to email and registered mobile number)
                      </p>
                      
                      <div className="flex gap-2">
                        <div className="w-20">
                          <Input value="+91" disabled />
                        </div>
                        <Input
                          placeholder="Mobile Number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          maxLength={10}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="GST Details (Optional)" />
                        <Input 
                          placeholder="GST Identification Number (GSTIN)"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </Card>

                {/* Other Preferences */}
                <Card>
                  <button 
                    onClick={() => toggleSection('preferences')}
                    className="w-full p-4 md:p-6 flex justify-between items-center"
                  >
                    <h2 className="text-lg md:text-xl font-bold">Other Preferences</h2>
                    {expandedSections.preferences ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {expandedSections.preferences && (
                    <div className="px-4 md:px-6 pb-6 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="autoUpgrade"
                          checked={autoUpgrade}
                          onCheckedChange={(checked) => setAutoUpgrade(checked as boolean)}
                        />
                        <label htmlFor="autoUpgrade" className="text-sm cursor-pointer">
                          Consider for Auto Upgradation. (ⓘ)
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="confirmBerth"
                          checked={confirmBerth}
                          onCheckedChange={(checked) => setConfirmBerth(checked as boolean)}
                        />
                        <label htmlFor="confirmBerth" className="text-sm cursor-pointer">
                          Book only if confirm berths are allotted.
                        </label>
                      </div>

                      <div>
                        <Label>Preferred Coach No.</Label>
                        <Input 
                          placeholder="Enter coach number"
                          value={coachPreference}
                          onChange={(e) => setCoachPreference(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </>
            )}

            {currentStep === 2 && (
              <Card className="p-4 md:p-6">
                <h2 className="text-xl font-bold mb-6">Review Your Journey</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Passengers</h3>
                    {passengers.map((passenger, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <span>{passenger.name}, {passenger.age} yrs, {passenger.gender}</span>
                        <span className="text-sm text-gray-600">{passenger.berthPreference}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p className="text-gray-600">+91 {mobile}</p>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <>
                {/* Travel Insurance */}
                <Card>
                  <button 
                    onClick={() => toggleSection('insurance')}
                    className="w-full p-4 md:p-6 flex justify-between items-center"
                  >
                    <h2 className="text-lg md:text-xl font-bold">Travel Insurance (Incl. of GST)</h2>
                    {expandedSections.insurance ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {expandedSections.insurance && (
                    <div className="px-4 md:px-6 pb-6">
                      <p className="text-sm text-gray-600 mb-4">Do you want to take Travel Insurance (₹{insuranceFee}/person)?</p>
                      
                      <RadioGroup value={travelInsurance ? 'yes' : 'no'} onValueChange={(value) => setTravelInsurance(value === 'yes')}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="insurance-yes" />
                          <label htmlFor="insurance-yes" className="text-sm cursor-pointer">
                            Yes, and I accept the <span className="text-blue-600">terms & conditions</span>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="insurance-no" />
                          <label htmlFor="insurance-no" className="text-sm cursor-pointer">
                            No, I don't want travel insurance
                          </label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </Card>

                {/* Payment Mode */}
                <Card>
                  <button 
                    onClick={() => toggleSection('payment')}
                    className="w-full p-4 md:p-6 flex justify-between items-center"
                  >
                    <h2 className="text-lg md:text-xl font-bold">Payment Mode</h2>
                    {expandedSections.payment ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {expandedSections.payment && (
                    <div className="px-4 md:px-6 pb-6 space-y-4">
                      <RadioGroup value={paymentMode} onValueChange={(value: 'online' | 'upi') => setPaymentMode(value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="payment-online" />
                          <label htmlFor="payment-online" className="text-sm cursor-pointer">
                            Pay through Credit & Debit Cards / Net Banking / Wallets / EMI / Rewards and Others
                            <div className="text-xs text-gray-500">Convenience Fee: ₹{15}/- + GST</div>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="upi" id="payment-upi" />
                          <label htmlFor="payment-upi" className="text-sm cursor-pointer">
                            Pay through BHIM/UPI
                            <div className="text-xs text-gray-500">Convenience Fee: ₹{10}/- + GST</div>
                          </label>
                        </div>
                      </RadioGroup>

                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox 
                          id="demo" 
                          checked={useDemoPayment}
                          onCheckedChange={(checked) => setUseDemoPayment(checked as boolean)}
                        />
                        <label htmlFor="demo" className="text-sm cursor-pointer">
                          Use Demo Payment (Testing)
                        </label>
                      </div>
                    </div>
                  )}
                </Card>
              </>
            )}
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:w-80">
            <Card className="p-4 md:p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Fare Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Ticket Fare:</span>
                  <span className="font-semibold">₹{price}</span>
                </div>
                
                {travelInsurance && (
                  <div className="flex justify-between text-sm">
                    <span>Travel Insurance:</span>
                    <span>₹{insuranceFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span>Convenience Fee:</span>
                  <span>₹{convenienceFee}</span>
                </div>

                {/* BNB Coins */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 text-sm">
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
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        if (value <= maxCoinsUsable) {
                          setCoinsToUse(value);
                        }
                      }}
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
                  <span>Total Fare</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>

              {currentStep < 3 ? (
                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  <Button 
                    onClick={handleContinue}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {useDemoPayment ? 'Complete Demo Booking' : 'Proceed to Payment'}
                </Button>
              )}

              <p className="text-xs text-gray-500 mt-4">
                *This availability is for all berths, not for your preferred berth type. As tickets are booked throughout the country across PRS counters, any confirmed status shown above may decline into RAC/ Waiting List status, while your payment being processed.
              </p>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrainBooking;
