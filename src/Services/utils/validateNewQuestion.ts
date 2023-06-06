export const validateNewQuestion = (values: any) => {
  const errors = {
    title: "",
    questionText: "",
    choiceA: "",
    choiceB: "",
    choiceC: ""
  };

  if (!values.title || values.title.length > 40) {
    errors.title = "Up to 40 characters!";
  }
  if (!values.questionText || values.questionText.length > 20) {
    errors.questionText = "Up to 20 characters!";
  }
  if (!values.choiceA || values.choiceA.length > 20) {
    errors.choiceA = "Up to 20 characters!";
  }
  if (!values.choiceB || values.choiceB.length > 20) {
    errors.choiceB = "Up to 20 characters!";
  }
  if (!values.choiceC || values.choiceC.length > 20) {
    errors.choiceC = "Up to 20 characters!";
  }

  return errors;
};
