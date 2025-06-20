
import { motion } from 'framer-motion';
import { Plane, Check, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingSummaryCardProps {
  flightData: any;
  passengerData: any[];
  totalAmount: number;
}

const BookingSummaryCard = ({ flightData, passengerData, totalAmount }: BookingSummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-lg sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <span>Flight Booking Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Flight Details */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Flight Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium">{flightData?.from} → {flightData?.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{flightData?.departureDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium">{passengerData?.length || 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flight:</span>
                <span className="font-medium">{flightData?.airline} {flightData?.flightNumber}</span>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Passengers</h4>
            <div className="space-y-2">
              {passengerData?.map((passenger, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium text-gray-900">
                    {passenger.title} {passenger.firstName} {passenger.lastName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Base Fare</span>
              <span>₹{Math.round(totalAmount * 0.83).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Taxes & Fees</span>
              <span>₹{Math.round(totalAmount * 0.17).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total Amount</span>
              <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Instant E-Ticket</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Free Cancellation*</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Download className="h-4 w-4" />
              <span>Downloadable Ticket</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingSummaryCard;
