import axios from "axios";
import { axiosConfig } from "../../Clients/auth/axiosConfig";
import {
  checkTokenValidation,
  handleApiError,
  handleBadRequestException
} from "../utils/handleError";
export const axiosCall = async (config: any) => {
  await checkTokenValidation("from top");
  // await handleExpiredTokenException();
  const result = await axios(axiosConfig(config));
  console.log(result);

  if (result.status === 403) {
    console.log(result);
    await checkTokenValidation("from 403 condition");
    return await axios(axiosConfig(config));
  } else if (result.status === 400) {
    handleBadRequestException();
    setTimeout(() => {
      return;
    }, 2000);
  } else if (result.status >= 401 && result.status < 500) {
    await handleApiError(result?.data);
    axios(axiosConfig(config));

  } 
   else if (result.status === 200) {
     return result;
   }

  //return result;
};
