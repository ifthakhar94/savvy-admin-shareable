import axios from "axios";
import { axiosConfig } from "../../Clients/auth/axiosConfig";
export const dataSymbolConfig = (type: string) => {
  const imageType = type === "image/png" ? "png" : "jpg";
  var datasymbol = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{
    createS3PresignedUrl(input:{
        type: monthlytheme
         fileExtension: ${imageType}
    }){
         monthlyThemeSymbolImage{
             url
             bucket
             key
             XAmzAlgorithm
             XAmzCredential
             XAmzDate
             XAmzSecurityToken
             Policy
             XAmzSignature
     }
    }
}`,
    variables: {}
  });
  return datasymbol;
};
export const getBgConfig = (data: any, image: any, type: string) => {
  const imageType = type === "image/png" ? "png" : "jpg";
  var data1 = new FormData();
  data1.append("X-Amz-Algorithm", data.XAmzAlgorithm);
  data1.append("X-Amz-Credential", data.XAmzCredential);
  data1.append("X-Amz-Date", data.XAmzDate);
  data1.append("X-Amz-Security-Token", data.XAmzSecurityToken);
  data1.append("key", data.key);
  data1.append("Policy", data.Policy);
  data1.append("X-Amz-Signature", data.XAmzSignature);
  data1.append("Content-Type", `image/${imageType}`);
  data1.append("file", image);

  var config = {
    method: "post",
    url: process.env.REACT_APP_AWS_IMAGE_UPLOAD_URL,
    headers: {},
    data: data1
  };
  return config;
};
export async function imageUploadSymbol(backgroundImage: any, type: string) {
  const config_bg: any = axiosConfig(dataSymbolConfig(type));
  let firstResponse;
  let imageUrl;
  await axios(config_bg)
    .then(function (response) {
      console.log(
        response?.data?.data?.createS3PresignedUrl?.monthlyThemeSymbolImage
      );
      firstResponse =
        response?.data?.data?.createS3PresignedUrl?.monthlyThemeSymbolImage;
      imageUrl = process.env.REACT_APP_AWS_IMAGE_BASE_URL + firstResponse.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let firstConfig;
  if (firstResponse != null) {
    firstConfig = getBgConfig(firstResponse, backgroundImage, type);
  await  axios(firstConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return imageUrl;
}
