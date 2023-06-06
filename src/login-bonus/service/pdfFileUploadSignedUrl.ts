import axios from "axios";
import { axiosConfig } from "../../Clients/auth/axiosConfig";
export const getPdfRequestParameter = () => {
  var databg = JSON.stringify({
    query: `mutation S3_BUCKET_FILE_UPLOAD_CRIDENTIAL{
    shopListPdfs: createS3PresignedUrl(input:{
        type: shopListPdf
        fileExtension: pdf
    }){
        shopListPdfData{
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
export const getImageConfig = (data: any, pdf: any) => {
  var data1 = new FormData();
  data1.append("X-Amz-Algorithm", data.XAmzAlgorithm);
  data1.append("X-Amz-Credential", data.XAmzCredential);
  data1.append("X-Amz-Date", data.XAmzDate);
  data1.append("X-Amz-Security-Token", data.XAmzSecurityToken);
  data1.append("key", data.key);
  data1.append("Policy", data.Policy);
  data1.append("X-Amz-Signature", data.XAmzSignature);
  data1.append("Content-Type", `application/pdf`);
  data1.append("file", pdf);

  var config = {
    method: "post",
    url: process.env.REACT_APP_AWS_IMAGE_UPLOAD_URL,
    headers: {},
    data: data1
  };
  return config;
};
export async function pdfFileUploadSignedUrl(pdf: any) {
  const pdfUploadConfig: any = axiosConfig(getPdfRequestParameter());
  let firstResponse, imageResponse;
  let pdfUrl, error;
  await axios(pdfUploadConfig)
    .then(function (response) {
      console.log(response);
      imageResponse = response?.data?.data?.shopListPdfs?.shopListPdfData;
      firstResponse = response?.data?.data;
      error = response.data.errors;
      pdfUrl =
        process.env.REACT_APP_AWS_IMAGE_BASE_URL +
        firstResponse?.shopListPdfs?.shopListPdfData?.key;
    })
    .catch(function (error) {
      console.log(error);
    });
  let pdfConfig;
  if (firstResponse != null) {
    pdfConfig = getImageConfig(imageResponse, pdf);

   await axios(pdfConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return { pdfUrl, error };
}
