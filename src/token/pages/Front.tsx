import { useState, useLayoutEffect } from "react";
import Coupon from "../component/Coupon";
import CouponButton from "../component/CouponButton";
import CouponText from "../component/CouponText";
import { notUsed, valid, invalid } from "../component/static";
import { useParams } from "react-router";
import { couponExpiryCheck, updateCoupon } from "../service/coupon";
import Loader from "../../Components/loader/Loader";
function Front() {
  const { id }: any = useParams();
  console.log(id);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [couponStatus, setCouponStatus] = useState(notUsed);
  const checkCouponExpiration = async () => {
    const response = await couponExpiryCheck(id);
    console.log(response)
    if (response?.couponStatus === false || response == null)  {
      setCouponStatus(invalid);
      setCouponId(response?.couponId);
    }

    // else setCouponStatus(valid);
    setDataLoaded(true);
    console.log(response);
  };
  useLayoutEffect(() => {
    checkCouponExpiration();
  }, []);
  const useCoupon = async () => {
    setDataLoaded(false);
    const response = await updateCoupon(couponId);
    setCouponStatus(valid);
    setDataLoaded(true);
  };
  // const isCouponValid = () => {
  //   useCoupon();
  //   // let isCouponValid = Math.random() > 0.5 ? true : false;
  //   // if (isCouponValid) setCouponStatus(valid);
  //   // else setCouponStatus(invalid);
  // };
  return (
    <div className="text-align-center">
      <div className="coupon-header fs-30">Coupon</div>
      <Coupon>
        {dataLoaded ? (
          <CouponText couponStatus={couponStatus}>
            {couponStatus !== valid ? (
              <CouponButton
                value="TAP"
                couponStatus={couponStatus}
                useCoupon={useCoupon}
              />
            ) : (
              <></>
            )}
          </CouponText>
        ) : (
          <></>
        )}
      </Coupon>
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default Front;
