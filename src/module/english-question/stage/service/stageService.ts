import { axiosConfig } from "../../../../Clients/auth/axiosConfig";
import { axiosCall } from "../../../../Services/api/axiosCall";

export const createStageConfig = (
  imageData: any,
  imageDataFileName: string,
  stageStatus: any
  // lastStageSortKey: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_STAGE{
        createStage(input:{
            imageData:"${imageData}"
            imageDataFileName:"${imageDataFileName}"
            stageStatus: ${stageStatus}
        }){
            message 
        }
    }`,
    variables: {}
  });

  return request_parameters;
};
export const createStage = async (
  imageData: any,
  imageDataFileName: string,
  stageStatus: any
) => {
  const response = await axiosCall(
    createStageConfig(imageData, imageDataFileName, stageStatus)
  );
  return response;
};

export const getStageListConfig = (currentPageNumber: number) => {
  let request_parameters = JSON.stringify({
    query: `query GET_STAGE_LIST{
      stages: getStageList(perPage:18,pageNumber:${currentPageNumber}){
          currentPageNumber
          perPage
          totalPage
          totalItem
          from
          to
          lastStageSortKey
          items{
              SK
              title
              stageStatus
              imageData,
              imageDataFileName
              numberOfQuestion
              createdAt
              registeredQuestions
          }
      }
  }`,
    variables: {}
  });

  return request_parameters;
};
export const getStageList = async (currentPageNumber: number) => {
  const response = await axiosCall(getStageListConfig(currentPageNumber));
  return response?.data?.data?.stages;
};

// update graphql api

export const updateStageConfig = (
  imageData: any,
  imageDataFileName: string,
  stageStatus: any,
  stageSortKey: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_STAGE{
      updateStage(input:{
          stageSortKey:"${stageSortKey}"
          imageData:"${imageData}"
          imageDataFileName:"${imageDataFileName}"
          stageStatus: ${stageStatus}
      }){
          message
      }
  }`,
    variables: {}
  });

  return request_parameters;
};
export const updateStage = async (
  imageData: any,
  imageDataFileName: string,
  stageStatus: any,
  stageSortKey: string
) => {
  const response = await axiosCall(
    updateStageConfig(imageData, imageDataFileName, stageStatus, stageSortKey)
  );
  return response;
};
