
interface PriceBreakdownProps {
  nights: number;
  total: number;
}

const PriceBreakdown = ({ nights, total }: PriceBreakdownProps) => {
  if (nights <= 0) return null;

  const basePrice = total * 83; // Convert to INR
  const discount = Math.round(basePrice * 0.64);
  const discountedPrice = Math.round(basePrice * 0.36);
  const taxes = Math.round(basePrice * 0.2);
  const finalAmount = Math.round(basePrice * 0.56);

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>1 Room x {nights} Night{nights > 1 ? 's' : ''}</span>
        <span></span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Base Price</span>
        <span>₹ {basePrice.toFixed(0)}</span>
      </div>
      <div className="flex justify-between text-sm text-green-600">
        <span>Total Discount</span>
        <span>- ₹ {discount}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Price after Discount</span>
        <span>₹ {discountedPrice}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Taxes & Service Fees</span>
        <span>₹ {taxes}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total Amount to be paid</span>
        <span>₹ {finalAmount}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
