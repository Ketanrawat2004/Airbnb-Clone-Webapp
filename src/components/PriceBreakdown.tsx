
interface PriceBreakdownProps {
  nights: number;
  total: number;
  appliedCoupon?: { code: string; discountAmount: number; couponId: string } | null;
}

const PriceBreakdown = ({ nights, total, appliedCoupon }: PriceBreakdownProps) => {
  if (nights <= 0) return null;

  // Convert total from USD to INR (already converted in backend, but total comes in USD)
  const basePrice = total * 83; // Convert USD to INR
  
  // Apply coupon discount if available
  const couponDiscountAmount = appliedCoupon ? appliedCoupon.discountAmount / 100 : 0;
  const finalAmount = basePrice - couponDiscountAmount;

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>1 Room x {nights} Night{nights > 1 ? 's' : ''}</span>
        <span></span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Base Price</span>
        <span>₹{basePrice.toLocaleString('en-IN')}</span>
      </div>
      
      {appliedCoupon && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Coupon ({appliedCoupon.code})</span>
          <span>- ₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
        </div>
      )}
      
      <div className="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total Amount</span>
        <span>₹{finalAmount.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
