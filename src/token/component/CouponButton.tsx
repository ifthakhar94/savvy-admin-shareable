import React from "react";
import { invalid, notUsed } from "./static";
import buttonTop from "../assets/image/buttonTop.png";
function CouponButton({ useCoupon, value, couponStatus }: any) {
  const couponClassName =
    couponStatus === notUsed
      ? "bg-red"
      : couponStatus === invalid
      ? "bg-gray"
      : "";
  return (
    <button
      disabled={couponStatus === invalid && true}
      type="submit"
      className={`mt-40 coupon-button ${couponClassName}`}
      onClick={useCoupon}
    >
      {couponStatus === notUsed && (
        <img src={buttonTop} className="button-top" alt="Coupon Tab Button" />
      )}
      {value}
    </button>
  );
}

export default CouponButton;
