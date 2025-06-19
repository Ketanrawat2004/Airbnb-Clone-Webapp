
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FlightBaggage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Baggage Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Cabin Baggage</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 7 kg allowed</li>
                <li>• 55 x 35 x 25 cm</li>
                <li>• 1 piece included</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Check-in Baggage</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 20 kg included</li>
                <li>• Additional bags: ₹1,500</li>
                <li>• Max 32 kg per piece</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Important Notes</h4>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• Liquids must be in containers ≤ 100ml</li>
                  <li>• Electronics must be easily accessible</li>
                  <li>• Prohibited items will be confiscated</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightBaggage;
