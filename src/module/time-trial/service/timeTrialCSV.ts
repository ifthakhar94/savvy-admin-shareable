import { axiosCall } from "../../../Services/api/axiosCall";
export const getThemeListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_MONTHLY_TIME_TRIAL_QUESTION_THEME_OPTION_LIST{
    getMonthlyTimerTrialQuestionThemeOptionList{
        SK
        title
        currentStatus
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const fetchThemeList = async () => {
  const fetchThemeListConfig = getThemeListConfig();
  const response = await axiosCall(fetchThemeListConfig);
  return response?.data?.data?.getMonthlyTimerTrialQuestionThemeOptionList;
};
export const getExportUrlThemeConfig = (SK: string) => {
  let request_parameters = JSON.stringify({
    query: `query EXPORT_MONTHLY_TIME_TRIAL_QUESTION{
    exportMonthlyTimeTrailQuestion(
        categoryThemeSortKey:"${SK}"
    ){
        downloadUrl
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const fetchExportThemeUrl = async (SK: string) => {
  const fetchThemeListConfig = getExportUrlThemeConfig(SK);
  const response = await axiosCall(fetchThemeListConfig);
  return response?.data?.data?.exportMonthlyTimeTrailQuestion?.downloadUrl;
};
