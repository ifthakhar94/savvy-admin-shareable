export const deleteMonthlyTimerTrialQuestionTheme = (
  themePrimaryKey: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_MONTHLY_TIME_TRIAL_QUESTION_THEME{
    updateMonthlyTimerTrialQuestionTheme(input:{
        themePrimaryKey:"${themePrimaryKey}"
        currentStatus: Deleted
    }){
        message
    }
}`,
    variables: {}
  });

  return request_parameters;
};
