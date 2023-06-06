import React from "react";

function Coupon({ children }: any) {
  return (
    <div className={`coupon-body`}>
      <div className={`coupton-content`}>{children}</div>
    </div>
  );
}

export default Coupon;
