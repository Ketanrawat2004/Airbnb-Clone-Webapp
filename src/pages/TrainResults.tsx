import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRandomTrains } from '@/utils/trainGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Train, ArrowRight } from 'lucide-react';

const TrainResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const trainClass = searchParams.get('class') || 'All Classes';
  const quota = searchParams.get('quota') || 'GENERAL';
  
  const trains = generateRandomTrains(from, to, date);
  
  const [selectedClasses, setSelectedClasses] = useState<string[]>(['1A', '2A', '3A', 'SL']);

  const generateDateTabs = () => {
    const dates = [];
    const baseDate = new Date(date);
    for (let i = -1; i <= 5; i++) {
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };
  
  const dateTabs = generateDateTabs();
  const currentDate = new Date(date);

  const handleBookNow = (train: any, selectedClass: string) => {
    navigate(`/train-booking?trainNumber=${train.number}&trainName=${train.name}&from=${from}&to=${to}&date=${date}&class=${selectedClass}&price=${train.price}&departureTime=${train.departure}&arrivalTime=${train.arrival}&duration=${train.duration}`);
  };

  const handleDateChange = (newDate: Date) => {
    const formattedDate = newDate.toISOString().split('T')[0];
    navigate(`/train-results?from=${from}&to=${to}&date=${formattedDate}&class=${trainClass}&quota=${quota}`);
  };

  const timeSlots = [
    { label: 'Early Morning', range: '00:00 - 06:00' },
    { label: 'Morning', range: '06:00 - 12:00' },
    { label: 'Mid Day', range: '12:00 - 18:00' },
    { label: 'Night', range: '18:00 - 24:00' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 md:py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
              <span className="font-bold text-lg md:text-xl">{from}</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-bold text-lg md:text-xl">{to}</span>
              <span className="mx-2 hidden sm:inline">|</span>
              <span className="text-sm md:text-base">{new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-100 text-blue-600 border-none shadow-md font-semibold"
              onClick={() => navigate('/trains')}
            >
              Modify Search
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4 mt-3 md:mt-4 text-xs md:text-sm">
            <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Checkbox className="border-white" />
              <span>Flexible With Date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Checkbox className="border-white" />
              <span>Train with Available Berth</span>
            </label>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-72 space-y-4">
            <Card className="p-4 md:p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="font-bold text-lg">Refine Results</h3>
                <Button variant="link" className="text-blue-600 p-0 hover:text-blue-700 font-semibold">Reset</Button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3 text-gray-700">JOURNEY CLASS</h4>
                <div className="space-y-3">
                  {['1A', '2A', '3A', 'SL'].map((cls) => (
                    <label key={cls} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <Checkbox checked={selectedClasses.includes(cls)} />
                      <span className="text-sm font-medium">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 text-gray-700">DEPARTURE TIME</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot.label} className="p-3 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      <div className="font-bold">{slot.range}</div>
                      <div className="text-[10px] font-normal mt-1">{slot.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Date Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-4 md:mb-6 overflow-x-auto">
              <div className="flex min-w-max">
                {dateTabs.map((dateTab, index) => {
                  const isSelected = dateTab.toDateString() === currentDate.toDateString();
                  const isPast = dateTab < new Date(new Date().setHours(0, 0, 0, 0));
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !isPast && handleDateChange(dateTab)}
                      disabled={isPast}
                      className={`flex-1 min-w-[140px] md:min-w-[160px] p-3 md:p-4 border-r transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-b-4 border-green-600 shadow-sm' 
                          : isPast 
                          ? 'bg-gray-50 cursor-not-allowed' 
                          : 'hover:bg-blue-50 cursor-pointer'
                      }`}
                    >
                      <div className="text-sm md:text-base font-bold">
                        {dateTab.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}
                      </div>
                      <div className={`text-xs mt-1 font-bold ${
                        isPast ? 'text-red-600' : isSelected ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {isPast ? 'DEPARTED' : isSelected ? 'AVAILABLE' : 'CHECK'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Train List */}
            <div className="space-y-4">
              {trains.map((train) => (
                <Card key={train.number} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{train.name}</h3>
                            <p className="text-sm text-gray-600">#{train.number}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Duration</div>
                            <div className="text-sm font-semibold text-gray-700">{train.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                          <div className="flex-1">
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{train.departure}</div>
                            <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">{from}</div>
                          </div>
                          <div className="flex-1 relative">
                            <div className="border-t-2 border-dashed border-gray-300" />
                            <Train className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 bg-white" />
                          </div>
                          <div className="flex-1 text-right">
                            <div className="text-xl md:text-2xl font-bold text-gray-900">{train.arrival}</div>
                            <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">{to}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {train.class.map((cls) => (
                            <Button 
                              key={cls} 
                              onClick={() => handleBookNow(train, cls)} 
                              variant="outline" 
                              size="sm"
                              className="hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-colors"
                            >
                              <span className="font-semibold">{cls}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Button 
                        className="flex-1 md:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]" 
                        onClick={() => handleBookNow(train, train.class[0])}
                      >
                        <span className="mr-2">🎫</span>
                        Book Now
                      </Button>
                      <Button 
                        variant="outline"
                        className="hidden md:inline-flex hover:bg-gray-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrainResults;
