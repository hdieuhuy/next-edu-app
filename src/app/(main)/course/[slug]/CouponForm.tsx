"use client";
import { ECouponType } from "@/_types/enums";
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const CouponForm = ({
  setPrice,
  courseId,
  originalPrice,
  setCouponId,
}: {
  originalPrice: number;
  courseId: string;
  setPrice: Dispatch<SetStateAction<number>>;
  setCouponId: Dispatch<SetStateAction<string>>;
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);

  const handleApplyCoupon = async () => {
    try {
      // handle valid coupon code
      const response = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });
      const couponType = response?.type;
      let finalPrice = originalPrice;
      if (!response) {
        toast.error("Mã giảm giá không hợp lệ");
        setCouponCode("");
        setCouponId("");
        return;
      }

      if (couponType === ECouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp dụng mã giảm giá thành công");
      setIsApplied(true);
      setCouponId(response._id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCoupon = debounce((e: any) => {
    setCouponCode(e.target.value);
  }, 500);
  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-semibold"
        onChange={handleChangeCoupon}
        defaultValue={couponCode}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
