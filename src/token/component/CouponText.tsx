import React from "react";
import Invalid from "./Invalid";
import NotUsed from "./NotUsed";
import { valid, notUsed } from "./static";
import Valid from "./Valid";
type getCouponType = {
  couponStatus: string;
  children: React.ReactElement;
};
function CouponText({ couponStatus, children }: getCouponType) {
  const text =
    couponStatus === notUsed ? (
      <NotUsed />
    ) : couponStatus === valid ? (
      <Valid />
    ) : (
      <Invalid />
    );
  return (
    <div className={`${couponStatus === notUsed && "rotate-180"}`}>
      {text}
      {children}
    </div>
  );
}

export default CouponText;
