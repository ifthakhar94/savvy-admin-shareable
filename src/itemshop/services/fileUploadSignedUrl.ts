import axios from "axios";
import { axiosConfig } from "../../Clients/auth/axiosConfig";
export const getImageRequestParameter = (imageType: string) => {
  const image = imageType === "image/png" ? "png" : "jpg";

  var databg = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{    
    shopItemImageData: createS3PresignedUrl(input:{
        type: shopItem    
        fileExtension: ${image}
    }){
        shopImageData{
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
export const getImageConfig = (data: any, image: any, type?: string) => {
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
export async function imageUploadSignedUrl(image: any, imageType: string) {
  const imageUploadConfig: any = axiosConfig(
    getImageRequestParameter(imageType)
  );
  let firstResponse, imageResponse;
  let imageUrl;
  await axios(imageUploadConfig)
    .then(function (response) {
      console.log(response);
      imageResponse = response?.data?.data?.shopItemImageData?.shopImageData;
      firstResponse = response?.data?.data;
      imageUrl =
        process.env.REACT_APP_AWS_IMAGE_BASE_URL +
        firstResponse?.shopItemImageData?.shopImageData?.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let imageConfig;
  if (firstResponse != null) {
    imageConfig = getImageConfig(imageResponse, image, imageType);

    axios(imageConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return imageUrl;
}
