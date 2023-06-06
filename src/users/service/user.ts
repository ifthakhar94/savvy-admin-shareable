import { axiosCall } from "../../Services/api/axiosCall";

export const userListConfig = (
  currentPageNumber: number,
  filterText: string,
  contract: any,
  status: any,
  startPoint: number | null,
  endPoint: number | null,
  startStage: number | null,
  endStage: number | null
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_PLAYER_LIST{
      getPlayerList(
          perPage:16
          pageNumber:${currentPageNumber}
         ${contract === "" ? "" : ` contract: ${contract}`} 
        ${status === "" ? "" : `status: ${status}`} 
          stageLowerBound: 0
          stageUpperBound: 1
          coinLowerBound: ${startPoint}
          coinUpperBound: ${endPoint} 
          stageLowerBound: ${startStage} 
          stageUpperBound: ${endStage} 
          searchKeyword:"${filterText}"
      ){
          currentPageNumber
          perPage
          totalPage
          totalItem
          from
          to
          items{
            SK
            status
            contract
            email
            firstName
            lastName
            coin
            stage
            userCreatedDate
            contractExpiredAt
          }
      }
  }`,
    variables: {}
  });

  return request_parameters;
};
export const userList = async (
  currentPageNumber: number,
  filterText: string,
  contract: any,
  status: any,
  startPoint: number | null,
  endPoint: number | null,
  startStage: number | null,
  endStage: number | null
) => {
  const response = await axiosCall(
    userListConfig(
      currentPageNumber,
      filterText,
      contract,
      status,
      startPoint,
      endPoint,
      startStage,
      endStage
    )
  );
  return response?.data?.data?.getPlayerList;
};
export const userDetailsConfig = (SK: any) => {
  let request_parameters = JSON.stringify({
    query: `query GET_PLAYER_INFO{
    getPlayerInfo(playerSortKey:"${SK}"){
        SK
        status
        contract
        contractExpiredAt
        email
        firstName
        lastName
        birthYear
        totalCoin
        stage
        totalCoupons
        lastLoginAt
        phoneNumber
        userCreatedDate
        english{
            stage
        }
        residence{
            en
            jp
        }
        phoneNumber
        mapOfJapan{
            easy
            medium
            hard
            varyHard
        }
        specialProduct{
            easy
            medium
            hard
        }
        monthly{
            medium
        }
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const userDetails = async (SK: any) => {
  const response = await axiosCall(userDetailsConfig(SK));
  return response?.data?.data?.getPlayerInfo;
};
