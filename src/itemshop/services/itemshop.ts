import { axiosCall } from "../../Services/api/axiosCall";
export const createItemConfig = (
  categorySortKey: string,
  title: string,
  imageData: string,
  imageDataFileName: string,
  price: number
) => {
  let request_parameters = JSON.stringify({
    query: `mutation create_shop_item{
    createShopCategoryItem(input:{
        categorySortKey:"${categorySortKey}"
        title: "${title}"
        imageData:"${imageData}"
        imageDataFileName:"${imageDataFileName}"
        shopItemStatus: Published
        price: ${price}
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const createItem = async (
  categorySortKey: string,
  title: string,
  imageData: string,
  imageDataFileName: string,
  price: number
) => {
  const response = await axiosCall(
    createItemConfig(
      categorySortKey,
      title,
      imageData,
      imageDataFileName,
      price
    )
  );
  return response?.data?.data?.createShopCategoryItem;
};
export const getItemDetailsConfig = (itemSK: string) => {
  let request_parameters = JSON.stringify({
    query: `query GET_SHOP_ITEM{
    getShopItem(shopItemSortKey:"${itemSK}"){
        SK
        categorySortKey
        title
        imageData
        imageDataFileName
        price
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getItemDetails = async (itemSK: string) => {
  const response = await axiosCall(getItemDetailsConfig(itemSK));
  return response?.data?.data?.getShopItem;
};
export const getItemShopListConfig = (currentPageNumber: number) => {
  let request_parameters = JSON.stringify({
    query: `query GET_SHOP_ITEM_LIST{
    getShopItemList(     
        perPage: 16
        pageNumber: ${currentPageNumber}   
    ){
        currentPageNumber
        perPage
        totalPage
        totalItem
        from
        to
        items{
            SK
            title
            categoryTitle
            price
            createdAt
            updatedAt
            createdBy
        }
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getItemShopList = async (currentPageNumber: number) => {
  const response = await axiosCall(getItemShopListConfig(currentPageNumber));
  return response?.data?.data?.getShopItemList;
};
export const getCategoryListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query SHOP_ITEM_CATGEORY_OPTIONS{
    getShopItemCategoryOptions{
        title
        categorySortKey
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getCategoryList = async () => {
  const response = await axiosCall(getCategoryListConfig());
  return response?.data?.data?.getShopItemCategoryOptions;
};
export const getUiPositionConfig = () => {
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
};
export const getUiPosition = async () => {
  const response = await axiosCall(getUiPositionConfig());
  return response?.data?.data?.getAppUiPositionList;
};
export const updateItemConfig = (
  itemSortKey: string,
  title: string,
  categorySortKey: string,
  coin: number,
  imageData: string,
  imageDataFileName: string,
  status: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_SHOP_ITEM{
    updateShopCategoryItem(input:{
      shopItemSortKey:"${itemSortKey}"
        categorySortKey:"${categorySortKey}"
        title: "${title}"
        imageData:"${imageData}"
        imageDataFileName:"${imageDataFileName}"
        shopItemStatus: ${status}
        price: ${coin}
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const updateItem = async (
  itemSortKey: string,
  title: string,
  categorySortKey: string,
  coin: number,
  imageData: string,
  imageDataFileName: string,
  status: string
) => {
  const response = await axiosCall(
    updateItemConfig(
      itemSortKey,
      title,
      categorySortKey,
      coin,
      imageData,
      imageDataFileName,
      status
    )
  );
  return response?.data?.data?.updateShopCategoryItem;
};
export const deleteItemListConfig = (questionSortKey: any) => {
  let allquery = "";
  for (let i = 1; i <= questionSortKey.length; i++) {
    allquery += `type${i}:createShopCategoryItem(input:{
        shopItemSortKey: "${questionSortKey[i - 1].SK}"   
        shopItemStatus: Deleted
    }){
        message
    },`;
  }
  let request_parameters = JSON.stringify({
    query: `mutation delete_shopitem{
           ${allquery}
        }`,
    variables: {}
  });

  return request_parameters;
};
export const deleteItemList = async (questionSortKey: any) => {
  const response = await axiosCall(deleteItemListConfig(questionSortKey));
  console.log(response);
  return response;
};
