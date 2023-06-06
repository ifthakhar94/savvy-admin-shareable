const Crypto = require("crypto-js");

export const axiosConfig = (request_parameters: string) => {
  const algorithm = "AWS4-HMAC-SHA256";
  const method = "POST";

  let amz_content_sha256 = Crypto.SHA256(request_parameters).toString();
  const date_stamp = amz_date.split("T")[0];
  const region = "us-east-1";
  const service = "appsync";
  const canonical_uri = "/graphql";
  const canonical_querystring = "";

  let credential_scope =
    date_stamp + "/" + region + "/" + service + "/aws4_request";
  let signed_headers =
    "host;x-amz-content-sha256;x-amz-date;x-amz-security-token";
  const host =
    process.env.REACT_APP_DB === "dev"
      ? process.env.REACT_APP_HOST
      : process.env.REACT_APP_HOST_PROD;

  let canonical_headers =
    "host:" +
    host +
    "\n" +
    "x-amz-content-sha256:" +
    amz_content_sha256 +
    "\n" +
    "x-amz-date:" +
    amz_date +
    "\n" +
    "x-amz-security-token:" +
    localStorage.getItem("sessionToken") +
    "\n";
  let payload_hash = Crypto.SHA256(request_parameters).toString();

  let canonical_request =
    method +
    "\n" +
    canonical_uri +
    "\n" +
    canonical_querystring +
    "\n" +
    canonical_headers +
    "\n" +
    signed_headers +
    "\n" +
    payload_hash;

  let signing_key = getSignatureKey(
    localStorage.getItem("secretKey"),
    date_stamp,
    region,
    service
  );
  let string_to_sign =
    algorithm +
    "\n" +
    amz_date +
    "\n" +
    credential_scope +
    "\n" +
    Crypto.SHA256(canonical_request).toString();

  let signature = Crypto.HmacSHA256(string_to_sign, signing_key);
  let authorization_header =
    algorithm +
    " " +
    "Credential=" +
    localStorage.getItem("accessKeyId") +
    "/" +
    credential_scope +
    ", " +
    "SignedHeaders=" +
    signed_headers +
    ", " +
    "Signature=" +
    signature;

  var config: any = {
    method: "POST",
    url:
      process.env.REACT_APP_DB === "dev"
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL_PROD,
    headers: {
      "Content-Type": "application/json",
      "X-Amz-Date": amz_date,
      "x-amz-security-token": localStorage.getItem("sessionToken"),
      "x-amz-content-sha256": amz_content_sha256,
      Authorization: authorization_header,
      "x-app-env": `${process.env.REACT_APP_DB}`
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };

  return config;
};

export const getAmzDate = (dateStr: any) => {
  var chars = [":", "-"];
  for (var i = 0; i < chars.length; i++) {
    while (dateStr.indexOf(chars[i]) != -1) {
      dateStr = dateStr.replace(chars[i], "");
    }
  }
  dateStr = dateStr.split(".")[0] + "Z";
  return dateStr;
};
const sum = (date: string) => {
  return parseInt(date) + 6;
};
let amz_date = getAmzDate(new Date().toISOString());
export const getSignatureKey = (
  key: any,
  dateStamp: any,
  regionName: any,
  serviceName: any
) => {
  var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
  var kRegion = Crypto.HmacSHA256(regionName, kDate);
  var kService = Crypto.HmacSHA256(serviceName, kRegion);
  var kSigning = Crypto.HmacSHA256("aws4_request", kService);
  return kSigning;
};
