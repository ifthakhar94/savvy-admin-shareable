import axios from "axios";
import { clearAllLocalStorage } from "../../../assets/static/static";
import { logout } from "../../../Services/api/auth/logout";

export const awsConfig = () => {
  let request_parameters = JSON.stringify({
    query: `mutation COGNITO_USER_FEDERATED_IDENTITIES{
    regenerateCognitoUserIdentities{
        accessKeyId
        secretKey
        sessionToken
        expiration
    }
}`,
    variables: {}
  });
  var config: any = {
    method: "POST",
    url:
      process.env.REACT_APP_DB === "dev"
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL_PROD,
    headers: {
      // "X-Api-Key": process.env.REACT_APP_API_KEY,
      authorization: localStorage.getItem("idToken")
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };
  return config;
};
export const getAwsCredentials = async () => {
  // const config: any = axiosConfig(awsConfig());
  const response = await axios(awsConfig());

  if (response.data.data.regenerateCognitoUserIdentities !== null) {
    let { sessionToken, expiration, accessKeyId, secretKey } =
      response?.data?.data?.regenerateCognitoUserIdentities;
    localStorage.setItem("expiration", expiration);
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("accessKeyId", accessKeyId);
    localStorage.setItem("secretKey", secretKey);
  } else {
    const config = logout();
    clearAllLocalStorage();
    window.location.assign("/");
  }
  return;
};
