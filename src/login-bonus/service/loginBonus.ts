import { axiosCall } from "../../Services/api/axiosCall";
export const createLoginBonusConfig = (
  countrySortKey: string,
  cityName: string,
  title: string,
  bonusCoin: number,
  loginBonusItemStatus: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_LOGIN_BONUS_ITEM{
    createLoginBonusItem(input:{
        countrySortKey:"${countrySortKey}"
        cityName:"${cityName}"
        title:"${title}"
        bonusCoin:${bonusCoin}
        loginBonusItemStatus: ${loginBonusItemStatus}
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const createLoginBonus = async (
  countrySortKey: string,
  cityName: string,
  title: string,
  bonusCoin: number,
  loginBonusItemStatus: any
) => {
  const response = await axiosCall(
    createLoginBonusConfig(
      countrySortKey,
      cityName,
      title,
      bonusCoin,
      loginBonusItemStatus
    )
  );
  return response?.data?.data?.createLoginBonusItem;
};
export const getCountryOptionListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_COUNTRY_OPTION_LIST{
    countryList{
        SK
        name
        code
        cities{
            title
        }
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getCountryOptionList = async () => {
  const response = await axiosCall(getCountryOptionListConfig());
  return response?.data?.data?.countryList;
};
export const getLoginBonusListConfig = (pageNumber: number) => {
  let request_parameters = JSON.stringify({
    query: `query LOGIN_BONUS_ITEM_LIST{
    getLoginBonusItems(
        perPage: 20
        pageNumber: ${pageNumber}
    ){
        currentPageNumber
        perPage
        totalPage
        totalItem
        from
        to
        items{
            SK
            countryName
            countryCode
            cityName
            bonusCoin
            title
            loginBonusItemStatus
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
export const getLoginBonusList = async (pageNumber: number) => {
  const response = await axiosCall(getLoginBonusListConfig(pageNumber));
  return response?.data?.data?.getLoginBonusItems;
};
export const getSingleLoginBonusDetailConfig = (loginBonusSortKey: string) => {
  let request_parameters = JSON.stringify({
    query: `query GET_LOGIN_BONUS_ITEM{
    getLoginBonusItem(loginBonusItemSortKey:"${loginBonusSortKey}"){
        SK
        countryName
        countryCode
        cityName
        bonusCoin
        title
        loginBonusItemStatus
        createdAt
        updatedAt
        createdBy
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getSingleLoginBonusDetail = async (loginBonusSortKey: string) => {
  const response = await axiosCall(
    getSingleLoginBonusDetailConfig(loginBonusSortKey)
  );
  return response?.data?.data?.getLoginBonusItem;
};
export const updateLoginBonusConfig = (
  loginBonusItemSortKey: string,
  countrySortKey: string,
  cityName: string,
  title: string,
  bonusCoin: number,
  loginBonusItemStatus: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_LOGIN_BONUS_ITEM{
    updateLoginBonusItem(input:{
        loginBonusItemSortKey:"${loginBonusItemSortKey}"
        countrySortKey:"${countrySortKey}"
        cityName:"${cityName}"
        title:"${title}"
        bonusCoin: ${bonusCoin}
        loginBonusItemStatus: ${loginBonusItemStatus}
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const updateLoginBonus = async (
  loginBonusItemSortKey: string,
  countrySortKey: string,
  cityName: string,
  title: string,
  bonusCoin: number,
  loginBonusItemStatus: any
) => {
  const response = await axiosCall(
    updateLoginBonusConfig(
      loginBonusItemSortKey,
      countrySortKey,
      cityName,
      title,
      bonusCoin,
      loginBonusItemStatus
    )
  );
  return response?.data?.data?.updateLoginBonusItem;
};
