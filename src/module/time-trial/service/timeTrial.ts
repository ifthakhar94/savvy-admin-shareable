import { axiosCall } from "../../../Services/api/axiosCall";
//THEME CRUD API CALLS
export const createMonthlyTimerTrialQuestionThemeConfig = (
  categoryPrimaryKey: string,
  backgroundImage: any,
  backgroundImageFileName: string,
  symbolImage: any,
  symbolImageFileName: string,
  boardText: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_MONTHLY_TIME_TRIAL_QUESTION_THEME{
        createMonthlyTimerTrialQuestionTheme(input:{
          categoryPrimaryKey:"${categoryPrimaryKey}"
          backgroundImage:"${backgroundImage}"
          backgroundImageFileName: "${backgroundImageFileName}"
          symbolImage:"${symbolImage}"
          symbolImageFileName:"${symbolImageFileName}"
          boardText:"${boardText}"
      }){
        message
              }
            }`,
    variables: {}
  });

  return request_parameters;
};
export const createMonthlyTimerTrialQuestionTheme = async (
  categoryPrimaryKey: string,
  backgroundImage: any,
  backgroundImageFileName: string,
  symbolImage: any,
  symbolImageFileName: string,
  boardText: string
) => {
  const response = await axiosCall(
    createMonthlyTimerTrialQuestionThemeConfig(
      categoryPrimaryKey,
      backgroundImage,
      backgroundImageFileName,
      symbolImage,
      symbolImageFileName,
      boardText
    )
  );
  return response;
};
export const getMonthlyTimerTrialQuestionThemeConfig = (
  themeSortKey: string
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_MONTHLY_TIME_TRIAL_QUESTION_THEME{
    getMonthlyTimerTrialQuestionTheme(themePrimaryKey:"${themeSortKey}")
    {
        PK
        SK
        type
        status
        title
        currentStatus
        backgroundImage
        backgroundImageFileName
        symbolImage
        symbolImageFileName
        boardText
        createdAt
        updatedAt
        createdBy
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getMonthlyTimerTrialQuestionTheme = async (
  themeSortKey: string
) => {
  const response = await axiosCall(
    getMonthlyTimerTrialQuestionThemeConfig(themeSortKey)
  );
  return response?.data?.data?.getMonthlyTimerTrialQuestionTheme;
};
export const getMonthlyTimeTrialQuestionThemeListConfig = (
  currentPageNumber: number
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_MONTHLY_TIME_TRIAL_QUESTION_THEME_LIST{
    getMonthlyTimerTrialQuestionThemeList(
            categoryPrimaryKey:"timetrialquestion#3eac30fe-43b9-4efd-be08-3c909bc7277d"
            perPage: 20
            pageNumber: ${currentPageNumber}
        )
    {
        currentPageNumber
        perPage
        totalPage
        totalItem
        from
        to
        nextMonthYearThemeCreation
        items{
            PK
            SK
            type
            status
            title
            currentStatus
            backgroundImage
            backgroundImageFileName
            symbolImage
            symbolImageFileName
            boardText
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
export const getMonthlyTimeTrialQuestionThemeList = async (
  currentPageNumber: number
) => {
  const response = await axiosCall(
    getMonthlyTimeTrialQuestionThemeListConfig(currentPageNumber)
  );
  return response?.data?.data?.getMonthlyTimerTrialQuestionThemeList;
};
export const updateMonthlyTimerTrialQuestionThemeConfig = (
  categoryPrimaryKey: string,
  backgroundImage: string,
  backgroundImageFileName: string,
  symbolImage: string,
  symbolImageFileName: string,
  boardText: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION_THEME{
      updateMonthlyTimerTrialQuestionTheme(input:{
          themePrimaryKey:"${categoryPrimaryKey}"
          backgroundImage:"${backgroundImage}"
          backgroundImageFileName:"${backgroundImageFileName}"
          symbolImage:"${symbolImage}"
          symbolImageFileName:"${symbolImageFileName}"
          boardText:"${boardText}"
      }){
          message
      }
  }`,
    variables: {}
  });

  return request_parameters;
};
export const updateMonthlyTimerTrialQuestionTheme = async (
  categoryPrimaryKey: string,
  backgroundImage: string,
  backgroundImageFileName: string,
  symbolImage: string,
  symbolImageFileName: string,
  boardText: string
) => {
  const response = await axiosCall(
    updateMonthlyTimerTrialQuestionThemeConfig(
      categoryPrimaryKey,
      backgroundImage,
      backgroundImageFileName,
      symbolImage,
      symbolImageFileName,
      boardText
    )
  );
  return response?.data?.data?.updateMonthlyTimerTrialQuestionTheme;
};

//THEME QUESTION CRUD API CALLS
export const createMonthlyTimerTrialQuestionConfig = (
  categoryThemeSortKey: string,
  title: string,
  imageData: any,
  imageDataFileName: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  answer: string,
  questionStatus: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_MONTHLY_TIME_TRIAL_QUESTION{
        createMonthlyTimerTrialQuestion(input:{
            categoryThemeSortKey:"${categoryThemeSortKey}"
            title:"${title}",
            questionText:"${questionText}"
            imageData:"${imageData}"
            imageDataFileName: "${imageDataFileName}"
            choiceA:"${choiceA}"
            choiceB:"${choiceB}"
            choiceC:"${choiceC}"
            answer: ${answer}
            questionStatus: ${questionStatus}
        }){
        message
              }
            }`,
    variables: {}
  });

  return request_parameters;
};
export const createMonthlyTimerTrialQuestion = async (
  categoryThemeSortKey: string,
  title: string,
  imageData: any,
  imageDataFileName: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  answer: string,
  questionStatus: any
) => {
  const response = await axiosCall(
    createMonthlyTimerTrialQuestionConfig(
      categoryThemeSortKey,
      title,
      imageData,
      imageDataFileName,
      questionText,
      choiceA,
      choiceB,
      choiceC,
      answer,
      questionStatus
    )
  );
  return response?.data?.data?.createMonthlyTimerTrialQuestion;
};
export const getMonthlyTimeTrialQuestionListConfig = (
  currentPageNumber: number,
  filterText: string,
  concatData: string,
  status: any
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_MONTHLY_TIME_TRIAL_QUESTION_LIST{
    getMonthlyTimerTrialQuestionList(
        categoryThemeSortKey:"${concatData}"
        perPage: 16
        pageNumber: ${currentPageNumber}
        title: "${filterText}"
       ${status ? `questionStatus: ${status}` : ""} 
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
            title
            questionText
            imageData
            choiceA
            choiceB
            choiceC
            answer
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
export const getMonthlyTimeTrialQuestionList = async (
  currentPageNumber: number,
  filterText: string,
  concatData: string,
  status: any
) => {
  const response = await axiosCall(
    getMonthlyTimeTrialQuestionListConfig(
      currentPageNumber,
      filterText,
      concatData,
      status
    )
  );
  return response?.data?.data?.getMonthlyTimerTrialQuestionList;
};
export const getTimeTrialMonthlyEditdataConfig = (questionSortKey: string) => {
  let request_parameters = JSON.stringify({
    query: `query GET_MONTHLY_TIME_TRIAL_QUESTION{
        getMonthlyTimerTrialQuestion(questionSortKey:"${questionSortKey}"){
            PK
            SK
            status
            type
            title
            questionText
            imageData
            imageDataFileName
            choiceA
            choiceB
            choiceC
            answer
            questionStatus
            createdAt
            updatedAt
            createdBy
        }
    }`,
    variables: {}
  });

  return request_parameters;
};
export const getTimeTrialMonthlyEditdata = async (questionSortKey: string) => {
  const response = await axiosCall(
    getTimeTrialMonthlyEditdataConfig(questionSortKey)
  );
  return response?.data?.data?.getMonthlyTimerTrialQuestion;
};
export const updateMonthlyTimerTrialQuestionConfig = (
  // categoryThemeSortKey: string,
  SK: string,
  title: string,
  imageData: string,
  imageDataFileName: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  answer: string,
  questionStatus: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION{
        updateMonthlyTimerTrialQuestion(input:{
            
            questionSortKey:"${SK}"
            title:"${title}"
            questionText:"${questionText}"
            imageData:"${imageData}"
            imageDataFileName: "${imageDataFileName}"
            choiceA:"${choiceA}"
            choiceB:"${choiceB}"
            choiceC:"${choiceC}"
            answer: ${answer}
            questionStatus: ${questionStatus}
        }){
        message
              }
            }`,
    variables: {}
  });

  return request_parameters;
};
export const updateMonthlyTimerTrialQuestion = async (
  SK: string,
  title: string,
  imageData: string,
  imageDataFileName: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  answer: string,
  questionStatus: any
) => {
  const response = await axiosCall(
    updateMonthlyTimerTrialQuestionConfig(
      SK,
      title,
      imageData,
      imageDataFileName,
      questionText,
      choiceA,
      choiceB,
      choiceC,
      answer,
      questionStatus
    )
  );
  return response?.data?.data?.updateMonthlyTimerTrialQuestion;
};
export const deleteTimetrialMonthlyQuestionConfig = (
  // categoryThemeSortKey: string,
  SK: string,
  questionStatus: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION{
        updateMonthlyTimerTrialQuestion(input:{
            questionSortKey:"${SK}",
            questionStatus: ${questionStatus}
        }){
        message
              }
            }`,
    variables: {}
  });

  return request_parameters;
};
export const deleteTimetrialMonthlyQuestion = async (
  SK: string,
  questionStatus: any
) => {
  const response = await axiosCall(
    deleteTimetrialMonthlyQuestionConfig(SK, questionStatus)
  );
  return response;
};
export const deleteMonthlyTimerTrialQuestionConfig = (questionSortKey: any) => {
  let allquery = "";
  for (let i = 1; i <= questionSortKey.length; i++) {
    allquery += `type${i}:updateMonthlyTimerTrialQuestion(input:{
        questionSortKey: "${questionSortKey[i - 1].SK}"   
        questionStatus: Deleted
    }){
        message
    },`;
  }
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION{
           ${allquery}
        }`,
    variables: {}
  });

  return request_parameters;
};
export const deleteMonthlyTimerTrialQuestion = async (questionSortKey: any) => {
  const response = await axiosCall(
    deleteMonthlyTimerTrialQuestionConfig(questionSortKey)
  );
  return response;
};
