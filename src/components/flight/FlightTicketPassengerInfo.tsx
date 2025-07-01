
interface FlightTicketPassengerInfoProps {
  bookingId: string;
  passengerData: any[];
}

const FlightTicketPassengerInfo = ({ bookingId, passengerData }: FlightTicketPassengerInfoProps) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="font-bold text-lg text-gray-900 mb-2">
            PASSENGER: {passengerData[0]?.firstName?.toUpperCase() || 'PASSENGER'} {passengerData[0]?.lastName?.toUpperCase() || 'NAME'} {passengerData[0]?.title?.toUpperCase() || 'MR'} (ADT)
          </div>
          <div className="bg-yellow-200 inline-block px-3 py-1 rounded font-bold text-sm mb-2">
            BOOKING REFERENCE: {bookingId.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600">
            TICKET NUMBER: {Math.random().toString().slice(2, 15)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            <strong>Issuing office:</strong><br />
            STAFF ON DUTY DEL OFFICE, TR220123680,<br />
            DELHI<br />
            <strong>Date of issue:</strong> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketPassengerInfo;
