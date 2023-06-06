import axios from "axios";
export const couponExpiryCheckConfig = (couponId: string) => {
  let request_parameters = JSON.stringify({
    query: `query COUPON_EXPIRY_CHECK{
    checkCouponExpiryDate(linkUrlKey:"${couponId}"){
        couponStatus
        couponId
    }
}`,
    variables: {}
  });
  var config: any = {
    method: "POST",
    url: process.env.REACT_APP_DB === "dev"
    ? process.env.REACT_APP_COUPON_BASE_URL
    : process.env.REACT_APP_COUPON_BASE_URL_PROD,
    headers: {
      "X-API-KEY": process.env.REACT_APP_DB === "dev"
      ? process.env.REACT_APP_COUPON_API_KEY
      : process.env.REACT_APP_COUPON_API_KEY_PROD,
      "x-app-env": process.env.REACT_APP_DB 
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };
  return config;
};
export const couponExpiryCheck = async (couponId: string) => {
  const response = await axios(couponExpiryCheckConfig(couponId));
  return response?.data?.data?.checkCouponExpiryDate;
};
export const updateCouponConfig = (couponId: string) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_COUPON_STATUS{
    updateCouponStatus(couponSortKey:"${couponId}"){
        message
    }
}`,
    variables: {}
  });
  var config: any = {
    method: "POST",
    url: "https://df5f4so5n5ew5li7xho56jd7oe.appsync-api.us-east-1.amazonaws.com/graphql",
    headers: {
      "X-API-KEY": "da2-lxrx3bj3lfdyvnlb6hhr7666ba",
      "x-app-env": `${process.env.REACT_APP_DB}`
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };
  return config;
};
export const updateCoupon = async (couponId: string) => {
  const response = await axios(updateCouponConfig(couponId));
  return response?.data?.data?.updateCouponStatus;
};
