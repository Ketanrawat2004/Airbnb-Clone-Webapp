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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <span className="font-semibold">{from}</span>
              <ArrowRight className="h-4 w-4" />
              <span className="font-semibold">{to}</span>
              <span className="mx-2">|</span>
              <span>{new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              Modify Search
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="border-white" />
              <span>Flexible With Date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="border-white" />
              <span>Train with Available Berth</span>
            </label>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-4">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Refine Results</h3>
                <Button variant="link" className="text-orange-600 p-0">Reset</Button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">JOURNEY CLASS</h4>
                <div className="space-y-2">
                  {['1A', '2A', '3A', 'SL'].map((cls) => (
                    <label key={cls} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox checked={selectedClasses.includes(cls)} />
                      <span className="text-sm">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">DEPARTURE TIME</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot.label} className="p-2 rounded text-xs font-semibold bg-primary/10 text-primary">
                      <div>{slot.range}</div>
                      <div className="text-[10px] font-normal">{slot.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Date Tabs */}
            <div className="bg-white rounded-lg shadow mb-4 overflow-x-auto">
              <div className="flex min-w-max">
                {dateTabs.map((dateTab, index) => {
                  const isSelected = dateTab.toDateString() === currentDate.toDateString();
                  const isPast = dateTab < new Date(new Date().setHours(0, 0, 0, 0));
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !isPast && handleDateChange(dateTab)}
                      disabled={isPast}
                      className={`flex-1 min-w-[150px] p-4 border-r ${isSelected ? 'bg-green-50 border-b-4 border-green-600' : isPast ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <div className="text-sm font-semibold">
                        {dateTab.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' })}
                      </div>
                      <div className={`text-xs mt-1 font-bold ${isPast ? 'text-red-600' : isSelected ? 'text-green-600' : 'text-gray-600'}`}>
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
                <Card key={train.number}>
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4">{train.name} ({train.number})</h3>

                        <div className="flex items-center gap-4 mb-4">
                          <div>
                            <div className="text-2xl font-bold">{train.departure}</div>
                            <div className="text-sm text-gray-600">{from}</div>
                          </div>
                          <div className="flex-1 border-t-2 border-gray-300" />
                          <div className="text-right">
                            <div className="text-2xl font-bold">{train.arrival}</div>
                            <div className="text-sm text-gray-600">{to}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {train.class.map((cls) => (
                            <Button key={cls} onClick={() => handleBookNow(train, cls)} variant="outline" size="sm">
                              {cls}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => handleBookNow(train, train.class[0])}>
                        Book Now
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
