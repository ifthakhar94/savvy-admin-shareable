import axios from "axios";
import { axiosConfig } from "../../Clients/auth/axiosConfig";
export const dataBgConfig = (type: string) => {
  const imageType = type === "image/png" ? "png" : "jpg";
  var databg = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{
    createS3PresignedUrl(input:{
        type: monthlytheme
         fileExtension: ${imageType}
    }){
        monthlyThemeBackgroundImage{
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
  return databg;
};

export const getBgConfig = (data: any, image: any, type?: string) => {
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
export async function imageUpload(backgroundImage: any, type: string) {
  const config_bg: any = axiosConfig(dataBgConfig(type));
  let firstResponse;
  let imageUrl;
  await axios(config_bg)
    .then(function (response) {
      firstResponse =
        response?.data?.data?.createS3PresignedUrl?.monthlyThemeBackgroundImage;
      imageUrl = process.env.REACT_APP_AWS_IMAGE_BASE_URL + firstResponse.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let firstConfig;
  if (firstResponse != null) {
    firstConfig = getBgConfig(firstResponse, backgroundImage, type);
   await axios(firstConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return imageUrl;
}
