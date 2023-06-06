import axios from "axios";
import { login } from "../../assets/static/routes";
import { clearAllLocalStorage } from "../../assets/static/static";
import { logout } from "../../Services/api/auth/logout";
export const handleBadRequestException = () => {
  window.location.assign(window.location.href);
};
export const getIdTokenConfig = () => {
  let request_parameters = JSON.stringify({
    query: `mutation USER_RFESH_ID_TOKEN{
    refreshUserIdToken{
        idToken
        expiresIn
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
      "X-Api-Key":
        process.env.REACT_APP_DB === "dev"
          ? process.env.REACT_APP_API_KEY
          : process.env.REACT_APP_API_KEY_PROD,
      "X-Refresh-Token": localStorage.getItem("refreshToken")
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };
  return config;
};
export const getIdToken = () => {
  axios(getIdTokenConfig())
    .then((response) => {
      if (response.data.data.refreshUserIdToken !== null) {
        let {
          sessionToken,
          expiration,
          accessKeyId,
          secretKey,
          idToken,
          expiresIn
        } = response?.data?.data?.refreshUserIdToken;
        let idTokenExpirationToken = parseInt(expiresIn) + Date.now();
        // console.log(idTokenExpirationToken);
        localStorage.setItem("idToken", idToken);
        localStorage.setItem(
          "idTokenExpiresIn",
          idTokenExpirationToken.toString()
        );
        localStorage.setItem("expiration", expiration);
        localStorage.setItem("sessionToken", sessionToken);
        localStorage.setItem("accessKeyId", accessKeyId);
        localStorage.setItem("secretKey", secretKey);
      } else {
        logout();
        window.location.assign(`${login}`);
        clearAllLocalStorage();
      }
    })
    .catch((e) => {
      logout();
      window.location.assign(`${login}`);
      clearAllLocalStorage();
    });
};
export const handleExpiredTokenException = async () => {
  if (
    Date.parse(localStorage.getItem("refreshTokenExpiresIn") as string) <
    Date.now()
  ) {
    clearAllLocalStorage();
    logout();
    window.location.assign(`${login}`);
  } else if (
    Date.parse(localStorage.getItem("idTokenExpiresIn") as string) <
      Date.now() ||
    Date.parse(localStorage.getItem("expiration") as string) < Date.now()
  ) {
    getIdToken();
    return true;
  }
};
export const handleApiError = async (data: any) => {
  if (
    data?.hasOwnProperty("errors") &&
    data?.errors[0].errorType === "UnauthorizedException"
  ) {
    getIdToken();
    return true;
  }
  if (
    data?.hasOwnProperty("errors") &&
    data?.errors[0].errorType === "BadRequestException"
  ) {
    handleBadRequestException();

    return true;
  }
};
export const checkTokenValidation = async (text: string) => {
  if (
    Date.parse(localStorage.getItem("idTokenExpiresIn") as string) - 100000 <
      Date.now() ||
    Date.parse(localStorage.getItem("expiration") as string) - 100000 <
      Date.now()
  ) {;
    getIdToken();
  }
};
