
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tag, Loader2 } from 'lucide-react';

interface CouponInputProps {
  bookingAmount: number;
  onCouponApplied: (couponData: { code: string; discountAmount: number; couponId: string } | null) => void;
  appliedCoupon: { code: string; discountAmount: number; couponId: string } | null;
}

const CouponInput = ({ bookingAmount, onCouponApplied, appliedCoupon }: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: 'Invalid coupon',
        description: 'Please enter a coupon code.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('validate_coupon', {
        coupon_code_param: couponCode.trim().toUpperCase(),
        booking_amount_param: bookingAmount
      });

      if (error) {
        console.error('Error validating coupon:', error);
        toast({
          title: 'Error',
          description: 'Failed to validate coupon. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      const result = data[0];
      
      if (result.valid) {
        onCouponApplied({
          code: couponCode.trim().toUpperCase(),
          discountAmount: result.discount_amount,
          couponId: result.coupon_id
        });
        
        toast({
          title: 'Coupon applied!',
          description: `You saved ₹${(result.discount_amount / 100).toLocaleString('en-IN')}`,
        });
        
        setCouponCode('');
      } else {
        toast({
          title: 'Invalid coupon',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      toast({
        title: 'Error',
        description: 'Failed to validate coupon. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    onCouponApplied(null);
    toast({
      title: 'Coupon removed',
      description: 'Coupon has been removed from your booking.',
    });
  };

  return (
    <div className="space-y-3">
      <Label className="flex items-center text-sm font-medium">
        <Tag className="h-3 w-3 mr-1" />
        Coupon Code
      </Label>
      
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <p className="font-medium text-green-800">{appliedCoupon.code}</p>
            <p className="text-sm text-green-600">
              Discount: ₹{(appliedCoupon.discountAmount / 100).toLocaleString('en-IN')}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeCoupon}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            maxLength={20}
          />
          <Button
            type="button"
            variant="outline"
            onClick={validateCoupon}
            disabled={loading || !couponCode.trim()}
            className="px-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Apply'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
