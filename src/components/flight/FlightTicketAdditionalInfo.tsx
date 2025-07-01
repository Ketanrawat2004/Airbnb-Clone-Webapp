
interface FlightTicketAdditionalInfoProps {
  flightData: any;
  totalAmount: number;
  contactInfo: any;
}

const FlightTicketAdditionalInfo = ({ flightData, totalAmount, contactInfo }: FlightTicketAdditionalInfoProps) => {
  return (
    <div className="px-4 sm:px-6 pb-6">
      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Class:</span>
            <span>Y</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Baggage:</span>
            <span>2PC</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Fare basis:</span>
            <span>ID00S1</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Flight duration:</span>
            <span>{flightData.duration || '08:30'}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Operated by:</span>
            <span>AIR INDIA</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Marketed by:</span>
            <span>AIR INDIA</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Booking status:</span>
            <span className="text-green-600 font-semibold">CONFIRMED</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-lg text-green-600">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-3">Important Travel Information:</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• Please carry a valid photo ID for domestic flights or passport for international flights</p>
          <p>• Web check-in opens 48 hours before departure</p>
          <p>• Arrive at airport at least 2 hours before domestic flights, 3 hours for international</p>
          <p>• Contact: {contactInfo.phone} | {contactInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketAdditionalInfo;
