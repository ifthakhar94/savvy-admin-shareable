import { loginConfig } from "../../../Clients/auth/loginConfig";
import { validation } from "../../utils/validation";
import axios from "axios";

export const login = async (email: string, password: string) => {
  const validationStatus = validation(email);
  if (!validationStatus) return false;
  const config: any = loginConfig(email, password);
  const response = await axios(config);
  // console.log(response);
  if (response?.data?.data?.loginUser !== null) {
    let {
      idToken,
      expiresIn,
      refreshToken,
      sessionToken,
      accessKeyId,
      secretKey,
      expiration
    } = response?.data?.data?.loginUser;
    let idTokenExpirationToken = parseInt(expiresIn) + Date.now();
    let refreshTokenExpiresIn = Date.now() + 30 * 86400;
    // console.log(30 * 86400);
    // console.log(refreshTokenExpiresIn);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("idTokenExpiresIn", idTokenExpirationToken.toString());
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem(
      "refreshTokenExpiresIn",
      refreshTokenExpiresIn.toString()
    );
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("accessKeyId", accessKeyId);
    localStorage.setItem("secretKey", secretKey);
    localStorage.setItem("expiration", expiration);
  }
};
