import axios from "axios";
import { axiosConfig } from "../../../Clients/auth/axiosConfig";
export const getImageRequestParameter = (imageType: string) => {
  const image = imageType === "image/png" ? "png" : "jpg";

  var databg = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{
    p1WordSelectionImageData: createS3PresignedUrl(input:{
        type: englishQuestion
        fileExtension: ${image}
    }){
        englishQuestionImageData{
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
export const getAudioRequestParameter = (voiceDataType: string) => {
  const audioType1 = voiceDataType === "audio/mpeg" ? "mp3" : "m4a";

  var databg = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{
   
    p1WordSelectionOptionOneVoiceData: createS3PresignedUrl(input:{
        type: englishQuestion
        fileExtension: ${audioType1}
    }){
        englishQuestionVoiceData{
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
export const getAudioConfig = (data: any, image: any, type?: string) => {
  const audioType = type === "audio/mpeg" ? "mpeg" : "m4a";
  var data1 = new FormData();
  data1.append("X-Amz-Algorithm", data.XAmzAlgorithm);
  data1.append("X-Amz-Credential", data.XAmzCredential);
  data1.append("X-Amz-Date", data.XAmzDate);
  data1.append("X-Amz-Security-Token", data.XAmzSecurityToken);
  data1.append("key", data.key);
  data1.append("Policy", data.Policy);
  data1.append("X-Amz-Signature", data.XAmzSignature);
  data1.append("Content-Type", `audio/${audioType}`);
  data1.append("file", image);

  var config = {
    method: "post",
    url: process.env.REACT_APP_AWS_IMAGE_UPLOAD_URL,
    headers: {},
    data: data1
  };
  return config;
};
export const getImageConfig = (data: any, image: any, type?: string) => {
  console.log(data);
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
      imageResponse =
        response?.data?.data?.p1WordSelectionImageData
          ?.englishQuestionImageData;
      firstResponse = response?.data?.data;
      imageUrl =
        process.env.REACT_APP_AWS_IMAGE_BASE_URL +
        firstResponse?.p1WordSelectionImageData?.englishQuestionImageData?.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let imageConfig;
  if (firstResponse != null) {
    imageConfig = getImageConfig(imageResponse, image, imageType);

   await axios(imageConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return imageUrl;
}
export async function audioUploadSignedUrl(
  voiceData: any,
  voiceDataType: string
) {
  const config_bg: any = axiosConfig(getAudioRequestParameter(voiceDataType));
  let firstResponse, voiceData1Response;
  let voiceDataUrl1;
  await axios(config_bg)
    .then(function (response) {
      console.log(response);

      voiceData1Response =
        response?.data?.data?.p1WordSelectionOptionOneVoiceData
          ?.englishQuestionVoiceData;

      firstResponse = response?.data?.data;
      voiceDataUrl1 =
        process.env.REACT_APP_AWS_IMAGE_BASE_URL +
        firstResponse?.p1WordSelectionOptionOneVoiceData
          ?.englishQuestionVoiceData?.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let voiceData1Config;
  if (firstResponse != null) {
    voiceData1Config = getAudioConfig(
      voiceData1Response,
      voiceData,
      voiceDataType
    );

   await axios(voiceData1Config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return voiceDataUrl1;
}
