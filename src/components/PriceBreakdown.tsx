
interface PriceBreakdownProps {
  nights: number;
  total: number;
  appliedCoupon?: { code: string; discountAmount: number; couponId: string } | null;
}

const PriceBreakdown = ({ nights, total, appliedCoupon }: PriceBreakdownProps) => {
  if (nights <= 0) return null;

  // The total parameter comes from hotel.price_per_night which is already in paise
  // So we need to calculate: nights * price_per_night_in_paise
  const basePriceInPaise = nights * total * 100; // total is price per night in rupees, convert to paise
  
  // Apply coupon discount if available (discount is already in paise)
  const couponDiscountInPaise = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalAmountInPaise = basePriceInPaise - couponDiscountInPaise;

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>1 Room x {nights} Night{nights > 1 ? 's' : ''}</span>
        <span></span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Base Price</span>
        <span>₹{(basePriceInPaise / 100).toLocaleString('en-IN')}</span>
      </div>
      
      {appliedCoupon && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Coupon ({appliedCoupon.code})</span>
          <span>- ₹{(couponDiscountInPaise / 100).toLocaleString('en-IN')}</span>
        </div>
      )}
      
      <div className="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total Amount</span>
        <span>₹{(finalAmountInPaise / 100).toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
