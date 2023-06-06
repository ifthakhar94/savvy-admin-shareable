import { axiosCall } from "../../Services/api/axiosCall";
export const createCategoryConfig = (
  categoryName: string,
  categoryPosition: number,
  categoryStatus: any
  // lastCategorySortKey: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_CATEGORY{
      createItemShopCategory(input:{
            title: "${categoryName}"
            shopCategoryStatus: ${categoryStatus}
            appUiPosition: ${categoryPosition}
      }){
            message
      }
}`,
    variables: {}
  });

  return request_parameters;
};
export const createCategory = async (
  categoryName: string,
  categoryPosition: number,
  categoryStatus: any
) => {
  const response = await axiosCall(
    createCategoryConfig(categoryName, categoryPosition, categoryStatus)
  );
  return response?.data?.data;
};
export const getCategoryListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query CATEGORY_LIST{
      getCategoryList{
        SK
            appUiPosition
            createdAt
            createdBy
            shopCategoryStatus
            title
            updatedAt
      } 
}`,
    variables: {}
  });

  return request_parameters;
};
export const getCategoryList = async () => {
  const response = await axiosCall(getCategoryListConfig());
  return response?.data?.data?.getCategoryList;
};
export const getCategoryConfig = (categorySK: string) => {
  let request_parameters = JSON.stringify({
    query: `query CATEGORY_DETAILS{
      getCategoryDetails(
            SK: "${categorySK}"
      ){
            SK
            appUiPosition
            createdAt
            createdBy
            item
            shopCategoryStatus
            status
            title
            type
            updatedAt
            updatedBy
      }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getCategory = async (categorySK: string) => {
  const response = await axiosCall(getCategoryConfig(categorySK));
  return response?.data?.data?.getCategoryDetails;
};


// update graphql api

export const updateCategoryConfig = (
  categoryName: any,
  categoryStatus: any,
  categoryPosition: number,
  categorySortKey: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_CATEGORY{
      updateItemShopCategory(input:{
            SK: "${categorySortKey}"
            title: "${categoryName}"
            shopCategoryStatus: ${categoryStatus}
            appUiPosition: ${categoryPosition}
      }){
            message
      }
}`,
    variables: {}
  });

  return request_parameters;
};
export const updateCategory = async (
  categoryName: any,
  categoryStatus: any,
  categoryPosition: number,
  categorySortKey: string
) => {
  const response = await axiosCall(
    updateCategoryConfig(categoryName, categoryStatus, categoryPosition, categorySortKey)
  );
  return response;
};
export const getCategoryUIPositionConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query APP_UI_POSITION_LIST{
      getAppUiPositionList{
            isUsed
            position
      }
}`,
    variables: {}
  });

  return request_parameters;
}
export const getCategoryUIPosition = async() => {
  const response = await axiosCall(getCategoryUIPositionConfig())
  return response?.data?.data?.getAppUiPositionList;
}