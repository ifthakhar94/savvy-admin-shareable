import { axiosCall } from "../../../Services/api/axiosCall";

export const createSpecialProductConfig = (
  categoryPrimaryKey: string,
  productName: string,
  imageData: any,
  imageDataFileName: string,
  prefecture: string,
  status: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_SPECIAL_PRODUCT_TIME_TRIAL_QUESTION{
    createSpecialProductTimerTrialQuestion(input:{
        categoryPrimaryKey:"${categoryPrimaryKey}"
        productName:"${productName}"
        imageData:"${imageData}"
        imageDataFileName:"${imageDataFileName}"
        prefecture:"${prefecture}"
       ${status ? `questionStatus: ${status}` : ""} 
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const createSpecialProduct = async (
  categoryPrimaryKey: string,
  productName: string,
  imageData: any,
  imageDataFileName: string,
  prefecture: string,
  status: any
) => {
  const response = await axiosCall(
    createSpecialProductConfig(
      categoryPrimaryKey,
      productName,
      imageData,
      imageDataFileName,
      prefecture,
      status
    )
  );
  return response?.data?.data?.createSpecialProductTimerTrialQuestion;
};
export const updateSpecialProductConfig = (
  questionSortKey: string,
  productName: string,
  imageData: any,
  imageDataFileName: string,
  prefecture: string,
  status: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_SPECIAL_PRODUCT_TIME_TRIAL_QUESTION{
    updateSpecialProductTimerTrialQuestion(input:{
        questionSortKey: "${questionSortKey}"
        productName:"${productName}"
        imageData:"${imageData}"
        imageDataFileName: "${imageDataFileName}"
        prefecture:"${prefecture}"
       ${status ? `questionStatus: ${status}` : ""} 
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const updateSpecialProduct = async (
  questionSortKey: string,
  productName: string,
  imageData: any,
  imageDataFileName: string,
  prefecture: string,
  status: string
) => {
  const response = await axiosCall(
    updateSpecialProductConfig(
      questionSortKey,
      productName,
      imageData,
      imageDataFileName,
      prefecture,
      status
    )
  );
  return response?.data?.data?.updateSpecialProductTimerTrialQuestion;
};
export const getSpecialProductListConfig = (
  currentPageNumber: number,
  filterText: string,
  status: any
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_SPECIAL_PRODUCT_TIME_TRIAL_QUESTION_LIST{
    getSpecialProductTimerTrialQuestionList(
        categoryPrimaryKey:"timetrialquestion#bda2e087-9b22-4ed5-be53-3a0020297b2e",
         perPage: 16
         pageNumber: ${currentPageNumber}
         searchKeyword: "${filterText}"        
          ${status !== "all" ? `questionStatus: ${status}` : ""} 
    ){
        currentPageNumber
        perPage
        totalPage
        totalItem
        from
        to
        items{
            PK
            SK
            type
            status
            questionStatus
            productName
            imageData
            imageDataFileName
            prefecture{
                id
                en
                jp
            }
            createdAt
            createdBy
            updatedAt
        }
    }

}`,
    variables: {}
  });

  return request_parameters;
};
export const getSpecialProductList = async (
  currentPageNumber: number,
  filterText: string,
  status: any
) => {
  const response = await axiosCall(
    getSpecialProductListConfig(currentPageNumber, filterText, status)
  );
  return response?.data?.data?.getSpecialProductTimerTrialQuestionList;
};
export const getSpecialProductConfig = (SK: string) => {
  let request_parameters = JSON.stringify({
    query: `query GET_SPECIAL_PRODUCT_TIME_TRIAL_QUESTION{
    getSpecialProductTimerTrialQuestion(
        questionSortKey:"${SK}"
    ){
        PK
        SK
        type
        status
        questionStatus
        productName
        imageData
        imageDataFileName
        prefecture{
            id
            en
            jp
        }
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getSpecialProduct = async (SK: string) => {
  const response = await axiosCall(getSpecialProductConfig(SK));
  return response?.data?.data?.getSpecialProductTimerTrialQuestion;
};
export const getJapanMapListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_LIST_OF_JAPAN_MAP{
    getJapanMapList{
        id
        en
        jp
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getJapanMapList = async () => {
  const response = await axiosCall(getJapanMapListConfig());
  return response?.data?.data?.getJapanMapList;
};
export const deleteSpecialProductConfig = (questionSortKey: any) => {
  let allquery = "";
  for (let i = 1; i <= questionSortKey.length; i++) {
    allquery += `type${i}:updateSpecialProductTimerTrialQuestion(input:{
        questionSortKey: "${questionSortKey[i - 1].SK}"   
        questionStatus: Deleted
    }){
        message
    },`;
  }
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_SPECIAL_PRODUCT_TIME_TRIAL_QUESTION{
           ${allquery}
        }`,
    variables: {}
  });

  return request_parameters;
};
export const deleteSpecialProduct = async (questionSortKey: any) => {
  const response = await axiosCall(deleteSpecialProductConfig(questionSortKey));
  return response;
};
