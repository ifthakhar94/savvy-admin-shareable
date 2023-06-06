import { axiosCall } from "../../../Services/api/axiosCall";
export const p1WordSelectionCreateConfig = (
  title: string,
  questionText: string,
  format: string,
  imageData: any,
  imageDataFileName: any,
  status: any,
  stage: string,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  voicedata1FileName?: string,
  voicedata2FileName?: string,
  voicedata3FileName?: string,
  urls1?: string,
  urls2?: string,
  urls3?: string,
  answer?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    ${format}: createEnglishQuestion(input:{
        title:"${title}",
        questionText: "${questionText}",
        imageData: "${imageData}",
        imageDataFileName: "${imageDataFileName}",
        options: [
          {
            title: "${choiceText1}",
            voiceData: "${urls1}",
            voiceDataFileName: "${voicedata1FileName}",
             answer: ${answer === "choiceText1" ? true : false}  
          },
          {
            title: "${choiceText2}",
            voiceData: "${urls2}",
            voiceDataFileName: "${voicedata2FileName}"
             answer: ${answer === "choiceText2" ? true : false}  
          }
          ,
          {
            title: "${choiceText3}",
            voiceData: "${urls3}",
            voiceDataFileName: "${voicedata3FileName}"
             answer: ${answer === "choiceText3" ? true : false}  
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p1WordSelectionCreate = async (
  title: string,
  questionText: string,
  format: string,
  imageData: any,
  imageDataFileName: any,
  status: any,
  stage: string,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  voicedata1FileName?: string,
  voicedata2FileName?: string,
  voicedata3FileName?: string,
  urls1?: string,
  urls2?: string,
  urls3?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p1WordSelectionCreateConfig(
      title,
      questionText,
      format,
      imageData,
      imageDataFileName,
      status,
      stage,
      choiceText1,
      choiceText2,
      choiceText3,
      voicedata1FileName,
      voicedata2FileName,
      voicedata3FileName,
      urls1,
      urls2,
      urls3,
      answer
    )
  );
  return response?.data?.data?.p1WordSelection;
};
export const p1WordSelectionUpdateConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  imageData?: any,
  imageDataFileName?: string | undefined,
  choiceText1?: string,
  choiceText2?: string,
  choiceText3?: string,
  voicedata1FileName?: string,
  voicedata2FileName?: string,
  voicedata3FileName?: string,
  urls1?: string,
  urls2?: string,
  urls3?: string,
  answer?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
       questionSortKey: "${SK}"
        title:"${title}",
        questionText: "${questionText}",
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
       imageData: "${imageData}",
        imageDataFileName: "${imageDataFileName}",
        options: [
          {
            title: "${choiceText1}",
            voiceData: "${urls1}",
            voiceDataFileName: "${voicedata1FileName}",
             answer: ${answer === "choiceText1" ? true : false}  
          },
          {
            title: "${choiceText2}",
            voiceData: "${urls2}",
            voiceDataFileName: "${voicedata2FileName}"
             answer: ${answer === "choiceText2" ? true : false}  
          }
          ,
          {
            title: "${choiceText3}",
            voiceData: "${urls3}",
            voiceDataFileName: "${voicedata3FileName}"
             answer: ${answer === "choiceText3" ? true : false}  
          }
        ]
          
    }){
        message
    }
}
`,
    variables: {}
  });

  return request_parameters;
};
export const p1WordSelectionUpdate = async (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  imageData?: any,
  imageDataFileName?: string | undefined,
  choiceText1?: string,
  choiceText2?: string,
  choiceText3?: string,
  voicedata1FileName?: string,
  voicedata2FileName?: string,
  voicedata3FileName?: string,
  urls1?: string,
  urls2?: string,
  urls3?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p1WordSelectionUpdateConfig(
      SK,
      title,
      format,
      stage,
      status,
      questionText,
      imageData,
      imageDataFileName,
      choiceText1,
      choiceText2,
      choiceText3,
      voicedata1FileName,
      voicedata2FileName,
      voicedata3FileName,
      urls1,
      urls2,
      urls3,
      answer
    )
  );
  return response?.data?.data?.p1WordSelection;
};
export const p2ImageSelectionCreateConfig = (
  title: string,
  questionText: string,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  urls0?: string,
  urls1?: string,
  urls2?: string,
  answer?: string
) => {
  // console.log(option);

  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    ${format}: createEnglishQuestion(input:{
        title:"${title}",
        questionText: "${questionText}",
        options: [
          {
            imageData: "${urls0}",
            imageDataFileName: "${imageFileName1}",
            answer: ${answer === "radio1" ? true : false}  
          },
          {
            imageData: "${urls1}",
            imageDataFileName: "${imageFileName2}",
            answer: ${answer === "radio2" ? true : false}  
          }
          ,
          {
            imageData: "${urls2}",
            imageDataFileName: "${imageFileName3}",
            answer: ${answer === "radio3" ? true : false}  
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p2ImageSelectionCreate = async (
  title: string,
  questionText: string,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  urls0?: string,
  urls1?: string,
  urls2?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p2ImageSelectionCreateConfig(
      title,
      questionText,
      format,
      status,
      stage,
      imageFileName1,
      imageFileName2,
      imageFileName3,
      urls0,
      urls1,
      urls2,
      answer
    )
  );
  return response?.data?.data?.p2ImageSelection;
};
export const p2ImageSelectionUpdateConfig = (
  SK: string,
  title: string,
  questionText: string,
  format: string,
  status: any,
  stage: string,
  newImagedataUrl1: any,
  newImagedataUrl2: any,
  newImagedataUrl3: any,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  answer?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
      p2ImageSelection: updateEnglishQuestion(input:{
          questionSortKey:"${SK}"
          title:"${title}"
          questionText: "${questionText}"
          options: [{
            imageData: "${newImagedataUrl1}",
            imageDataFileName: "${imageFileName1}",
            answer: ${answer === "radio1" ? true : false}  
            },
            {
            imageData: "${newImagedataUrl2}",
            imageDataFileName: "${imageFileName2}",
            answer: ${answer === "radio2" ? true : false}  
            },
            {
            imageData: "${newImagedataUrl3}",
            imageDataFileName: "${imageFileName3}",
            answer: ${answer === "radio3" ? true : false} 
            }
          ],
          questionStatus: ${status}
          questionFormat: ${format}
          stageSortKey:"${stage}"
      }){
          message
      }
  
  }`,
    variables: {}
  });

  return request_parameters;
};
export const p2ImageSelectionUpdate = async (
  SK: string,
  title: string,
  questionText: string,
  format: string,
  status: any,
  stage: string,
  newImagedataUrl1: any,
  newImagedataUrl2: any,
  newImagedataUrl3: any,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p2ImageSelectionUpdateConfig(
      SK,
      title,
      questionText,
      format,
      status,
      stage,
      newImagedataUrl1,
      newImagedataUrl2,
      newImagedataUrl3,
      imageFileName1,
      imageFileName2,
      imageFileName3,
      answer
    )
  );
  return response?.data?.data?.p2ImageSelection;
};
export const p3WordSortingCreateConfig = (
  title: string,
  format: string,
  stage: string,
  status: any,
  imageData: any,
  imageDataFileName: any,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string,
  wordSix: string,
  wordSeven: string,
  wordEight: string,
  choiceWordOne: string,
  choiceWordTwo: string,
  choiceWordThree: string,
  voiceData1: any,
  voiceData2: any,
  voiceData3: any,
  voiceData1FileName: any,
  voiceData2FileName: any,
  voiceData3FileName: any
) => {
  console.log(
    wordOne,
    wordTwo,
    wordThree,
    wordFour,
    wordFive,
    wordSix,
    wordSeven,
    wordEight
  );

  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    ${format}: createEnglishQuestion(input:{
        title:"${title}",
        imageData: "${imageData}",
         imageDataFileName: "${imageDataFileName}",
         wordQuestionText:[
            ${
              wordOne !== ""
                ? `{
                questionText: "${wordOne}"
            }`
                : ""
            }
           ${
             wordTwo !== ""
               ? `{
                questionText: "${wordTwo}"
            }`
               : ""
           }
             ${
               wordThree !== ""
                 ? `{
                questionText: "${wordThree}"
            }`
                 : ""
             }
            ${
              wordFour !== ""
                ? `{
                questionText: "${wordFour}"
            }`
                : ""
            }
            ${
              wordFive !== ""
                ? `{
                questionText: "${wordFive}"
            }`
                : ""
            }
            ${
              wordSix !== ""
                ? `{
                questionText: "${wordSix}"
            }`
                : ""
            }
            ${
              wordSeven !== ""
                ? `{
                questionText: "${wordSeven}"
            }`
                : ""
            }
            ${
              wordEight !== ""
                ? `{
                questionText: "${wordEight}"
            }`
                : ""
            }
        ]
         wordQuestionAnswer:[
                     ${
                       wordOne !== ""
                         ? `{
                questionText: "${
                  wordOne === "1"
                    ? choiceWordOne
                    : wordOne === "2"
                    ? choiceWordTwo
                    : wordOne === "3"
                    ? choiceWordThree
                    : wordOne
                }"
            }`
                         : ""
                     }
           ${
             wordTwo !== ""
               ? `{
                questionText: "${
                  wordTwo === "1"
                    ? choiceWordOne
                    : wordTwo === "2"
                    ? choiceWordTwo
                    : wordTwo === "3"
                    ? choiceWordThree
                    : wordTwo
                }"
            }`
               : ""
           }
             ${
               wordThree !== ""
                 ? `{
                questionText: "${
                  wordThree === "1"
                    ? choiceWordOne
                    : wordThree === "2"
                    ? choiceWordTwo
                    : wordThree === "3"
                    ? choiceWordThree
                    : wordThree
                }"
            }`
                 : ""
             }
            ${
              wordFour !== ""
                ? `{
                questionText: "${
                  wordFour === "1"
                    ? choiceWordOne
                    : wordFour === "2"
                    ? choiceWordTwo
                    : wordFour === "3"
                    ? choiceWordThree
                    : wordFour
                }"
            }`
                : ""
            }
            ${
              wordFive !== ""
                ? `{
                questionText: "${
                  wordFive === "1"
                    ? choiceWordOne
                    : wordFive === "2"
                    ? choiceWordTwo
                    : wordFive === "3"
                    ? choiceWordThree
                    : wordFive
                }"
            }`
                : ""
            }
            ${
              wordSix !== ""
                ? `{
                questionText: "${
                  wordSix === "1"
                    ? choiceWordOne
                    : wordSix === "2"
                    ? choiceWordTwo
                    : wordSix === "3"
                    ? choiceWordThree
                    : wordSix
                }"
            }`
                : ""
            }
            ${
              wordSeven !== ""
                ? `{
                questionText: "${
                  wordSeven === "1"
                    ? choiceWordOne
                    : wordSeven === "2"
                    ? choiceWordTwo
                    : wordSeven === "3"
                    ? choiceWordThree
                    : wordSeven
                }"
            }`
                : ""
            }
            ${
              wordEight !== ""
                ? `{
                questionText: "${
                  wordEight === "1"
                    ? choiceWordOne
                    : wordEight === "2"
                    ? choiceWordTwo
                    : wordEight === "3"
                    ? choiceWordThree
                    : wordEight
                }"
            }`
                : ""
            }
        ]
        options: [
          { 
            title: "${choiceWordOne}"
            ${voiceData1 !== "" ? `voiceData: "${voiceData1}"` : ""}
            ${
              voiceData1FileName !== ""
                ? `voiceDataFileName: "${voiceData1FileName}"`
                : ""
            }
           
          },
          {
             title: "${choiceWordTwo}"
            ${voiceData2 !== "" ? `voiceData: "${voiceData2}"` : ""}
            ${
              voiceData2FileName !== ""
                ? `voiceDataFileName: "${voiceData2FileName}"`
                : ""
            }
          }
          ,
          ${
            choiceWordThree !== '' 
            ?
            `{
              title: "${choiceWordThree}"
               ${voiceData3 !== "" ? `voiceData: "${voiceData3}"` : ""}
              ${
                voiceData3FileName !== ""
                  ? `voiceDataFileName: "${voiceData3FileName}"`
                  : ""
              }
            }`
            : ''
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p3WordSortingCreate = async (
  title: string,
  format: string,
  stage: string,
  status: any,
  imageData: string,
  imageDataFileName: string,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string,
  wordSix: string,
  wordSeven: string,
  wordEight: string,
  choiceWordOne: string,
  choiceWordTwo: string,
  choiceWordThree: string,
  voiceData1: string,
  voiceData2: string,
  voiceData3: string,
  voiceData1FileName: string,
  voiceData2FileName: string,
  voiceData3FileName: string
) => {
  const response = await axiosCall(
    p3WordSortingCreateConfig(
      title,
      format,
      stage,
      status,
      imageData,
      imageDataFileName,
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      wordFive,
      wordSix,
      wordSeven,
      wordEight,
      choiceWordOne,
      choiceWordTwo,
      choiceWordThree,
      voiceData1,
      voiceData2,
      voiceData3,
      voiceData1FileName,
      voiceData2FileName,
      voiceData3FileName
    )
  );
  return response?.data?.data?.p3WordSorting;
};
export const p3WordSortingUpdateConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  imageData: string,
  imageDataFileName: string,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string,
  wordSix: string,
  wordSeven: string,
  wordEight: string,
  choiceWordOne: string,
  choiceWordTwo: string,
  choiceWordThree: string,
  voiceData1: string,
  voiceData2: string,
  voiceData3: string,
  voiceData1FileName: string,
  voiceData2FileName: string,
  voiceData3FileName: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
        questionSortKey: "${SK}"
        title:"${title}",
        imageData: "${imageData}",
         imageDataFileName: "${imageDataFileName}",
         wordQuestionText:[
            ${
              wordOne !== ""
                ? `{
                questionText: "${wordOne}"
            }`
                : ""
            }
           ${
             wordTwo !== ""
               ? `{
                questionText: "${wordTwo}"
            }`
               : ""
           }
             ${
               wordThree !== ""
                 ? `{
                questionText: "${wordThree}"
            }`
                 : ""
             }
            ${
              wordFour !== ""
                ? `{
                questionText: "${wordFour}"
            }`
                : ""
            }
            ${
              wordFive !== ""
                ? `{
                questionText: "${wordFive}"
            }`
                : ""
            }
            ${
              wordSix !== ""
                ? `{
                questionText: "${wordSix}"
            }`
                : ""
            }
            ${
              wordSeven !== ""
                ? `{
                questionText: "${wordSeven}"
            }`
                : ""
            }
            ${
              wordEight !== ""
                ? `{
                questionText: "${wordEight}"
            }`
                : ""
            }
        ]
         wordQuestionAnswer:[
                     ${
                       wordOne !== ""
                         ? `{
                questionText: "${
                  wordOne === "1"
                    ? choiceWordOne
                    : wordOne === "2"
                    ? choiceWordTwo
                    : wordOne === "3"
                    ? choiceWordThree
                    : wordOne
                }"
            }`
                         : ""
                     }
           ${
             wordTwo !== ""
               ? `{
                questionText: "${
                  wordTwo === "1"
                    ? choiceWordOne
                    : wordTwo === "2"
                    ? choiceWordTwo
                    : wordTwo === "3"
                    ? choiceWordThree
                    : wordTwo
                }"
            }`
               : ""
           }
             ${
               wordThree !== ""
                 ? `{
                questionText: "${
                  wordThree === "1"
                    ? choiceWordOne
                    : wordThree === "2"
                    ? choiceWordTwo
                    : wordThree === "3"
                    ? choiceWordThree
                    : wordThree
                }"
            }`
                 : ""
             }
            ${
              wordFour !== ""
                ? `{
                questionText: "${
                  wordFour === "1"
                    ? choiceWordOne
                    : wordFour === "2"
                    ? choiceWordTwo
                    : wordFour === "3"
                    ? choiceWordThree
                    : wordFour
                }"
            }`
                : ""
            }
            ${
              wordFive !== ""
                ? `{
                questionText: "${
                  wordFive === "1"
                    ? choiceWordOne
                    : wordFive === "2"
                    ? choiceWordTwo
                    : wordFive === "3"
                    ? choiceWordThree
                    : wordFive
                }"
            }`
                : ""
            }
            ${
              wordSix !== ""
                ? `{
                questionText: "${
                  wordSix === "1"
                    ? choiceWordOne
                    : wordSix === "2"
                    ? choiceWordTwo
                    : wordSix === "3"
                    ? choiceWordThree
                    : wordSix
                }"
            }`
                : ""
            }
            ${
              wordSeven !== ""
                ? `{
                questionText: "${
                  wordSeven === "1"
                    ? choiceWordOne
                    : wordSeven === "2"
                    ? choiceWordTwo
                    : wordSeven === "3"
                    ? choiceWordThree
                    : wordSeven
                }"
            }`
                : ""
            }
            ${
              wordEight !== ""
                ? `{
                questionText: "${
                  wordEight === "1"
                    ? choiceWordOne
                    : wordEight === "2"
                    ? choiceWordTwo
                    : wordEight === "3"
                    ? choiceWordThree
                    : wordEight
                }"
            }`
                : ""
            }
        ]
        options: [
          { 
            title: "${choiceWordOne}"
            ${voiceData1 !== "" ? `voiceData: "${voiceData1}"` : ""}
            ${
              voiceData1FileName !== ""
                ? `voiceDataFileName: "${voiceData1FileName}"`
                : ""
            }
           
          },
          {
             title: "${choiceWordTwo}"
            ${voiceData2 !== "" ? `voiceData: "${voiceData2}"` : ""}
            ${
              voiceData2FileName !== ""
                ? `voiceDataFileName: "${voiceData2FileName}"`
                : ""
            }
          }
          ,
          ${
            choiceWordThree !== '' 
            ?
            `{
              title: "${choiceWordThree}"
               ${voiceData3 !== "" ? `voiceData: "${voiceData3}"` : ""}
              ${
                voiceData3FileName !== ""
                  ? `voiceDataFileName: "${voiceData3FileName}"`
                  : ""
              }
            }`
            : ''
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p3WordSortingUpdate = async (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  imageData: any,
  imageDataFileName: any,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string,
  wordSix: string,
  wordSeven: string,
  wordEight: string,
  choiceWordOne: string,
  choiceWordTwo: string,
  choiceWordThree: string,
  voiceData1: any,
  voiceData2: any,
  voiceData3: any,
  voiceData1FileName: any,
  voiceData2FileName: any,
  voiceData3FileName: any
) => {
  const response = await axiosCall(
    p3WordSortingUpdateConfig(
      SK,
      title,
      format,
      stage,
      status,
      imageData,
      imageDataFileName,
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      wordFive,
      wordSix,
      wordSeven,
      wordEight,
      choiceWordOne,
      choiceWordTwo,
      choiceWordThree,
      voiceData1,
      voiceData2,
      voiceData3,
      voiceData1FileName,
      voiceData2FileName,
      voiceData3FileName
    )
  );
  return response;
};
export const p4NewspaperCreateConfig = (
  title: string,
  format: string,
  stage: string,
  status: any,
  newsPaperTitle: string,
  newsPaperTextArea: string,
  publicationSource: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  image: any,
  imageFileName: any,
  voiceData1: any,
  voiceData1fileName: any,
  voiceData2: any,
  voiceData2fileName: any,
  voiceData3: any,
  voiceData3fileName: any,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    ${format}: createEnglishQuestion(input:{
        title:"${title}",
        questionText: "${questionText}",
        imageData: "${image}" 
        imageDataFileName: "${imageFileName}" 
        newsPaperTitle:"${newsPaperTitle}" 
        newsPaperText:"${newsPaperTextArea}" 
        publicationSource:"${publicationSource}" 
        options: [
          {
            title:"${choiceA}"
            ${voiceData1 !== "" ? `voiceData: "${voiceData1}"` : ""}
             ${
               voiceData1fileName !== ""
                 ? `voiceDataFileName: "${voiceData1fileName}"`
                 : ""
             }
           answer: ${answer === "choice1" ? true : false}  
          },
          {
             title:"${choiceB}"
            ${voiceData2 !== "" ? `voiceData: "${voiceData2}"` : ""}
             ${
               voiceData2fileName !== ""
                 ? `voiceDataFileName: "${voiceData2fileName}"`
                 : ""
             }
           answer: ${answer === "choice2" ? true : false}  
          }
          ,
          {
          
             title:"${choiceC}"
            ${voiceData3 !== "" ? `voiceData: "${voiceData3}"` : ""}
             ${
               voiceData3fileName !== ""
                 ? `voiceDataFileName: "${voiceData3fileName}"`
                 : ""
             }
           answer: ${answer === "choice3" ? true : false} 
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p4NewspaperCreate = async (
  title: string,
  format: string,
  stage: string,
  status: string,
  newsPaperTitle: string,
  newsPaperTextArea: string,
  publicationSource: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  image: string,
  imageFileName: string,
  voiceData1: string,
  voiceData1fileName: string,
  voiceData2: string,
  voiceData2fileName: string,
  voiceData3: string,
  voiceData3fileName: string,
  answer: string
) => {
  const response = await axiosCall(
    p4NewspaperCreateConfig(
      title,
      format,
      stage,
      status,
      newsPaperTitle,
      newsPaperTextArea,
      publicationSource,
      questionText,
      choiceA,
      choiceB,
      choiceC,
      image,
      imageFileName,
      voiceData1,
      voiceData1fileName,
      voiceData2,
      voiceData2fileName,
      voiceData3,
      voiceData3fileName,
      answer
    )
  );
  return response?.data?.data?.p4Newspaper;
};
export const p4NewspaperUpdateConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  newsPaperTitle: string,
  newsPaperTextArea: string,
  publicationSource: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  image: string,
  imageFileName: string,
  voiceData1: string,
  voiceData1fileName: string,
  voiceData2: string,
  voiceData2fileName: string,
  voiceData3: string,
  voiceData3fileName: string,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
        questionSortKey: "${SK}" 
        title:"${title}",
        questionText: "${questionText}",
        imageData: "${image}" 
        imageDataFileName: "${imageFileName}" 
        newsPaperTitle:"${newsPaperTitle}" 
        newsPaperText:"${newsPaperTextArea}" 
       ${
         publicationSource !== ""
           ? `publicationSource:"${publicationSource}" `
           : ""
       } 
        options: [
          {
            title:"${choiceA}"
            ${voiceData1 !== "" ? `voiceData: "${voiceData1}"` : ""}
             ${
               voiceData1fileName !== ""
                 ? `voiceDataFileName: "${voiceData1fileName}"`
                 : ""
             }
           answer: ${answer === "choice1" ? true : false}  
          },
          {
             title:"${choiceB}"
            ${voiceData2 !== "" ? `voiceData: "${voiceData2}"` : ""}
             ${
               voiceData2fileName !== ""
                 ? `voiceDataFileName: "${voiceData2fileName}"`
                 : ""
             }
           answer: ${answer === "choice2" ? true : false}  
          }
          ,
          {
          
             title:"${choiceC}"
            ${voiceData3 !== "" ? `voiceData: "${voiceData3}"` : ""}
             ${
               voiceData3fileName !== ""
                 ? `voiceDataFileName: "${voiceData3fileName}"`
                 : ""
             }
           answer: ${answer === "choice3" ? true : false} 
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p4NewspaperUpdate = async (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: string,
  newsPaperTitle: string,
  newsPaperTextArea: string,
  publicationSource: string,
  questionText: string,
  choiceA: string,
  choiceB: string,
  choiceC: string,
  image: string,
  imageFileName: string,
  voiceData1: string,
  voiceData1fileName: string,
  voiceData2: string,
  voiceData2fileName: string,
  voiceData3: string,
  voiceData3fileName: string,
  answer: string
) => {
  const response = await axiosCall(
    p4NewspaperUpdateConfig(
      SK,
      title,
      format,
      stage,
      status,
      newsPaperTitle,
      newsPaperTextArea,
      publicationSource,
      questionText,
      choiceA,
      choiceB,
      choiceC,
      image,
      imageFileName,
      voiceData1,
      voiceData1fileName,
      voiceData2,
      voiceData2fileName,
      voiceData3,
      voiceData3fileName,
      answer
    )
  );
  return response?.data?.data?.p4Newspaper;
};
export const p5ConversationCreateConfig = (
  title: string,
  firstRow: any,
  secondRow: any,
  thirdRow: any,
  fourthRow: any,
  fifthRow: any,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  choiceText4: string,
  voiceDataUrl1: string,
  voiceDataUrl2: string,
  voiceDataUrl3: string,
  voiceDataUrl4: string,
  voiceDataFileName1: string,
  voiceDataFileName2: string,
  voiceDataFileName3: string,
  voiceDataFileName4: string,
  status: string,
  format: string,
  stage: string,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
      ${format}: createEnglishQuestion(input:{
         title:"${title}"
        conversation:[
            {
                talker: "${firstRow.talker}"
                talk:[
                    {
                        talkText: "${firstRow.talk_1}"
                    }
                     ${
                       firstRow.talk_2 !== ""
                         ? `{
                        talkText: "${firstRow.talk_2}"
                    }`
                         : ""
                     } 
                    ${
                      firstRow.talk_3 !== ""
                        ? `{
                        talkText: "${firstRow.talk_3}"
                    }`
                        : ""
                    } 
                     ${
                       firstRow.talk_4 !== ""
                         ? `{
                        talkText: "${firstRow.talk_4}"
                    }`
                         : ""
                     } 
                ]
            }
            {
                talker: "${secondRow.talker}"
                talk:[
                    {
                        talkText: "${secondRow.talk_1}"
                    }
                    ${
                      secondRow.talk_2 !== ""
                        ? `{
                        talkText: "${secondRow.talk_2}"
                    }`
                        : ""
                    } 
                   ${
                     secondRow.talk_3 !== ""
                       ? `{
                        talkText: "${secondRow.talk_3}"
                    }`
                       : ""
                   } 
                    ${
                      secondRow.talk_4 !== ""
                        ? `{
                        talkText: "${secondRow.talk_4}"
                    }`
                        : ""
                    } 
                ]
            }
            ${
              thirdRow.talker !== ""
                ? `{
                talker: "${thirdRow.talker}"
                talk:[
                    ${
                      thirdRow.talk_1 !== ""
                        ? `{
                        talkText: "${thirdRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       thirdRow.talk_2 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       thirdRow.talk_3 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       thirdRow.talk_4 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                : ""
            }
              ${
                fourthRow.talker !== ""
                  ? `{
                talker: "${fourthRow.talker}"
                talk:[
                    ${
                      fourthRow.talk_1 !== ""
                        ? `{
                        talkText: "${fourthRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       fourthRow.talk_2 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       fourthRow.talk_3 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       fourthRow.talk_4 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                  : ""
              }
                  ${
                    fifthRow.talker !== ""
                      ? `{
                talker: "${fifthRow.talker}"
                talk:[
                    ${
                      fifthRow.talk_1 !== ""
                        ? `{
                        talkText: "${fifthRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       fifthRow.talk_2 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       fifthRow.talk_3 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       fifthRow.talk_4 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                      : ""
                  }
            
        ]
        options: [
          {
              title:"${choiceText1}"
              ${voiceDataUrl1 !== "" ? `voiceData : "${voiceDataUrl1}"` : ""}
              ${
                voiceDataFileName1 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName1}"`
                  : ""
              }
              answer: ${answer === "radio1" ? true : false}
          },
          {
              title:"${choiceText2}"
            ${voiceDataUrl2 !== "" ? `voiceData : "${voiceDataUrl2}"` : ""}
              ${
                voiceDataFileName2 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName2}"`
                  : ""
              }
              answer: ${answer === "radio2" ? true : false}
          },
          {
              title:"${choiceText3}"
              ${voiceDataUrl3 !== "" ? `voiceData : "${voiceDataUrl3}"` : ""}
              ${
                voiceDataFileName3 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName3}"`
                  : ""
              }
              answer: ${answer === "radio3" ? true : false}
          },
          {
              title:"${choiceText4}"
              ${voiceDataUrl4 !== "" ? `voiceData : "${voiceDataUrl4}"` : ""}
              ${
                voiceDataFileName4 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName4}"`
                  : ""
              }
              answer: ${answer === "radio4" ? true : false}
          }
        ],
        questionStatus: ${status}
        questionFormat:  ${format}
        stageSortKey:"${stage}"
      }){
          message
      }
  
  }`,
    variables: {}
  });
  return request_parameters;
};
export const p5ConversationCreate = async (
  title: string,
  firstRow: any,
  secondRow: any,
  thirdRow: any,
  fourthRow: any,
  fifthRow: any,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  choiceText4: string,
  voiceDataUrl1: string,
  voiceDataUrl2: string,
  voiceDataUrl3: string,
  voiceDataUrl4: string,
  voiceDataFileName1: string,
  voiceDataFileName2: string,
  voiceDataFileName3: string,
  voiceDataFileName4: string,
  status: string,
  format: string,
  stage: string,
  answer: string
) => {
  const response = await axiosCall(
    p5ConversationCreateConfig(
      title,
      firstRow,
      secondRow,
      thirdRow,
      fourthRow,
      fifthRow,
      choiceText1,
      choiceText2,
      choiceText3,
      choiceText4,
      voiceDataUrl1,
      voiceDataUrl2,
      voiceDataUrl3,
      voiceDataUrl4,
      voiceDataFileName1,
      voiceDataFileName2,
      voiceDataFileName3,
      voiceDataFileName4,
      status,
      format,
      stage,
      answer
    )
  );
  return response?.data?.data?.p5Conversation;
};
export const p5ConversationUpdateConfig = (
  SK: string,
  title: string,
  firstRow: any,
  secondRow: any,
  thirdRow: any,
  fourthRow: any,
  fifthRow: any,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  choiceText4: string,
  voiceDataUrl1: string,
  voiceDataUrl2: string,
  voiceDataUrl3: string,
  voiceDataUrl4: string,
  voiceDataFileName1: string,
  voiceDataFileName2: string,
  voiceDataFileName3: string,
  voiceDataFileName4: string,
  status: string,
  format: string,
  stage: string,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation Update_ENGLISH_QUETION{
      ${format}: updateEnglishQuestion(input:{
        questionSortKey: "${SK}"
         title:"${title}"
        conversation:[
            {
                talker: "${firstRow.talker}"
                talk:[
                    {
                        talkText: "${firstRow.talk_1}"
                    }
                     ${
                       firstRow.talk_2 !== ""
                         ? `{
                        talkText: "${firstRow.talk_2}"
                    }`
                         : ""
                     } 
                    ${
                      firstRow.talk_3 !== ""
                        ? `{
                        talkText: "${firstRow.talk_3}"
                    }`
                        : ""
                    } 
                     ${
                       firstRow.talk_4 !== ""
                         ? `{
                        talkText: "${firstRow.talk_4}"
                    }`
                         : ""
                     } 
                ]
            }
            {
                talker: "${secondRow.talker}"
                talk:[
                    {
                        talkText: "${secondRow.talk_1}"
                    }
                    ${
                      secondRow.talk_2 !== ""
                        ? `{
                        talkText: "${secondRow.talk_2}"
                    }`
                        : ""
                    } 
                   ${
                     secondRow.talk_3 !== ""
                       ? `{
                        talkText: "${secondRow.talk_3}"
                    }`
                       : ""
                   } 
                    ${
                      secondRow.talk_4 !== ""
                        ? `{
                        talkText: "${secondRow.talk_4}"
                    }`
                        : ""
                    } 
                ]
            }
            ${
              thirdRow.talker !== ""
                ? `{
                talker: "${thirdRow.talker}"
                talk:[
                    ${
                      thirdRow.talk_1 !== ""
                        ? `{
                        talkText: "${thirdRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       thirdRow.talk_2 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       thirdRow.talk_3 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       thirdRow.talk_4 !== ""
                         ? `{
                        talkText: "${thirdRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                : ""
            }
              ${
                fourthRow.talker !== ""
                  ? `{
                talker: "${fourthRow.talker}"
                talk:[
                    ${
                      fourthRow.talk_1 !== ""
                        ? `{
                        talkText: "${fourthRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       fourthRow.talk_2 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       fourthRow.talk_3 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       fourthRow.talk_4 !== ""
                         ? `{
                        talkText: "${fourthRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                  : ""
              }
                  ${
                    fifthRow.talker !== ""
                      ? `{
                talker: "${fifthRow.talker}"
                talk:[
                    ${
                      fifthRow.talk_1 !== ""
                        ? `{
                        talkText: "${fifthRow.talk_1}"
                    }`
                        : ""
                    }
                     ${
                       fifthRow.talk_2 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_2}"
                    }`
                         : ""
                     }
                     ${
                       fifthRow.talk_3 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_3}"
                    }`
                         : ""
                     }
                     ${
                       fifthRow.talk_4 !== ""
                         ? `{
                        talkText: "${fifthRow.talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                      : ""
                  }
            
        ]
        options: [
          {
              title:"${choiceText1}"
              ${voiceDataUrl1 !== "" ? `voiceData : "${voiceDataUrl1}"` : ""}
              ${
                voiceDataFileName1 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName1}"`
                  : ""
              }
              answer: ${answer === "radio1" ? true : false}
          },
          {
              title:"${choiceText2}"
            ${voiceDataUrl2 !== "" ? `voiceData : "${voiceDataUrl2}"` : ""}
              ${
                voiceDataFileName2 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName2}"`
                  : ""
              }
              answer: ${answer === "radio2" ? true : false}
          },
          {
              title:"${choiceText3}"
              ${voiceDataUrl3 !== "" ? `voiceData : "${voiceDataUrl3}"` : ""}
              ${
                voiceDataFileName3 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName3}"`
                  : ""
              }
              answer: ${answer === "radio3" ? true : false}
          },
          {
              title:"${choiceText4}"
              ${voiceDataUrl4 !== "" ? `voiceData : "${voiceDataUrl4}"` : ""}
              ${
                voiceDataFileName4 !== ""
                  ? `voiceDataFileName : "${voiceDataFileName4}"`
                  : ""
              }
              answer: ${answer === "radio4" ? true : false}
          }
        ],
        questionStatus: ${status}
        questionFormat:  ${format}
        stageSortKey:"${stage}"
      }){
          message
      }
  
  }`,
    variables: {}
  });
  return request_parameters;
};
export const p5ConversationUpdate = async (
  SK: string,
  title: string,
  firstRow: any,
  secondRow: any,
  thirdRow: any,
  fourthRow: any,
  fifthRow: any,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  choiceText4: string,
  voiceDataUrl1: string,
  voiceDataUrl2: string,
  voiceDataUrl3: string,
  voiceDataUrl4: string,
  voiceDataFileName1: string,
  voiceDataFileName2: string,
  voiceDataFileName3: string,
  voiceDataFileName4: string,
  status: string,
  format: string,
  stage: string,
  answer: string
) => {
  const response = await axiosCall(
    p5ConversationUpdateConfig(
      SK,
      title,
      firstRow,
      secondRow,
      thirdRow,
      fourthRow,
      fifthRow,
      choiceText1,
      choiceText2,
      choiceText3,
      choiceText4,
      voiceDataUrl1,
      voiceDataUrl2,
      voiceDataUrl3,
      voiceDataUrl4,
      voiceDataFileName1,
      voiceDataFileName2,
      voiceDataFileName3,
      voiceDataFileName4,
      status,
      format,
      stage,
      answer
    )
  );
  return response?.data?.data?.p5Conversation;
};
export const p6TextCreationCreateConfig = (
  title: string,
  format: string,
  stage: string,
  questionText: string,
  voiceUrl: any,
  voiceDataFileName: string | any,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string | undefined,
  wordSix: string | undefined,
  wordSeven: string | undefined,
  wordEight: string | undefined,
  status: any
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    p6TextCreation: createEnglishQuestion(input:{
        title:"${title}",
        questionText: "${questionText}",
        voiceData: "${voiceUrl}",
        voiceDataFileName: "${voiceDataFileName}",
        options: [
          {
            title: "${wordOne}",
          },
          {
            title: "${wordTwo}",
          }
          ,
          {
            title: "${wordThree}",
          },
           {
            title: "${wordFour}",
          },
         ${
           wordFive
             ? ` {
            title: "${wordFive}",
          }`
             : ""
         }
          ,
         ${
           wordSix
             ? ` {
            title: "${wordSix}",
          }`
             : ""
         },
           ${
             wordSeven
               ? ` {
            title: "${wordSeven}",
          }`
               : ""
           },
          ${
            wordEight
              ? ` {
            title: "${wordEight}",
          }`
              : ""
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p6TextCreationCreate = async (
  title: string,
  format: string,
  stage: string,
  questionText: string,
  voiceUrl: any,
  voiceDataFileName: string | any,
  wordOne: string,
  wordTwo: string,
  wordThree: string,
  wordFour: string,
  wordFive: string | undefined,
  wordSix: string | undefined,
  wordSeven: string | undefined,
  wordEight: string | undefined,
  status: any
) => {
  const response = await axiosCall(
    p6TextCreationCreateConfig(
      title,
      format,
      stage,
      questionText,
      voiceUrl,
      voiceDataFileName,
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      wordFive,
      wordSix,
      wordSeven,
      wordEight,
      status
    )
  );
  return response?.data?.data?.p6TextCreation;
};
export const p6TextCreationUpdateConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  p6VoiceData?: string,
  p6VoiceDataFileName?: string,
  wordOne?: string,
  wordTwo?: string,
  wordThree?: string,
  wordFour?: string,
  wordFive?: string,
  wordSix?: string,
  wordSeven?: string,
  wordEight?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
       questionSortKey: "${SK}"
        title:"${title}",
        questionText: "${questionText}",
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
      voiceData: "${p6VoiceData}",
        voiceDataFileName: "${p6VoiceDataFileName}",
        options: [
          {
            title: "${wordOne}",       
          },
          {
            title: "${wordTwo}",    
          }
          ,
          {
            title: "${wordThree}",
          },
          {
            title: "${wordFour}",       
          },
                ${
                  wordFive
                    ? ` {
            title: "${wordFive}",
          }`
                    : ""
                }
          ,
         ${
           wordSix
             ? ` {
            title: "${wordSix}",
          }`
             : ""
         },
           ${
             wordSeven
               ? ` {
            title: "${wordSeven}",
          }`
               : ""
           },
          ${
            wordEight
              ? ` {
            title: "${wordEight}",
          }`
              : ""
          }
        ]
            
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p6TextCreationUpdate = async (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  p6VoiceData?: string,
  p6VoiceDataFileName?: string,
  wordOne?: string,
  wordTwo?: string,
  wordThree?: string,
  wordFour?: string,
  wordFive?: string,
  wordSix?: string,
  wordSeven?: string,
  wordEight?: string
) => {
  const response = await axiosCall(
    p6TextCreationUpdateConfig(
      SK,
      title,
      format,
      stage,
      status,
      questionText,
      p6VoiceData,
      p6VoiceDataFileName,
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      wordFive,
      wordSix,
      wordSeven,
      wordEight
    )
  );
  return response?.data?.data?.p6TextCreation;
};
export const p7WordListeningConfig = (
  title: string,
  format: string,
  stage: string,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  voiceUrl: any,
  voiceDataFileName: string | any,
  status: any,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
      p7WordListening: createEnglishQuestion(input:{
        title:"${title}",
        voiceData: "${voiceUrl}",
        voiceDataFileName: "${voiceDataFileName}",
        options: [
          {
            title: "${choiceText1}"
            answer: ${answer === "choiceText1" ? true : false} 
          },
          {
            title: "${choiceText2}"
            answer: ${answer === "choiceText2" ? true : false} 
          },
          {
            title: "${choiceText3}"
            answer: ${answer === "choiceText3" ? true : false} 

          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"

        
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p7WordListiningCreate = async (
  title: string,
  format: string,
  stage: string,
  choice1: string,
  choice2: string,
  choice3: string,
  audio: string,
  audioFileName: string,
  status: any,
  answer: string
) => {
  const response = await axiosCall(
    p7WordListeningConfig(
      title,
      format,
      stage,
      choice1,
      choice2,
      choice3,
      audio,
      audioFileName,
      status,
      answer
    )
  );
  return response?.data?.data?.p7WordListening;
};
export const p7WordListiningUpdateConfig = (
  SK: string,
  voiceUrl: any,
  voiceDataFileName: string | any,
  title: string,
  choiceText1: string,
  choiceText2: string,
  choiceText3: string,
  status: any,
  format: string,
  stage: string,
  answer: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
      questionSortKey: "${SK}",
      voiceData: "${voiceUrl}",
      voiceDataFileName: "${voiceDataFileName}",
      title:"${title}",     
      options: [
        {
          title: "${choiceText1}"
          answer: ${answer === "choiceText1" ? true : false} 
        },
        {
          title: "${choiceText2}"
          answer: ${answer === "choiceText2" ? true : false} 
        },
        {
          title: "${choiceText3}"
          answer: ${answer === "choiceText3" ? true : false} 
        }
      ],
      questionStatus: ${status}
      questionFormat: ${format}
      stageSortKey:"${stage}"
          
    }){
        message
    }
}
`,
    variables: {}
  });

  return request_parameters;
};
export const p7WordListiningUpdate = async (
  SK: string,
  title: string,
  format: string,
  stage: string,
  choice1: string,
  choice2: string,
  choice3: string,
  audio: string,
  audioFileName: string,
  status: any,
  answer: string
) => {
  const response = await axiosCall(
    p7WordListiningUpdateConfig(
      SK,
      title,
      format,
      stage,
      choice1,
      choice2,
      choice3,
      audio,
      audioFileName,
      status,
      answer
    )
  );
  return response?.data?.data?.p7WordListening;
};
export const p8ImageListeningCreateConfig = (
  title: string,
  voiceUrl: any,
  voiceDataFileName: any,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  imageUrls0?: string,
  imageUrls1?: string,
  imageUrls2?: string,
  answer?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
    ${format}: createEnglishQuestion(input:{
        title:"${title}",
        voiceData: "${voiceUrl}",
         voiceDataFileName: "${voiceDataFileName}",
        options: [
          {
            imageData: "${imageUrls0}",
            imageDataFileName: "${imageFileName1}",
            answer: ${answer === "radio1" ? true : false}  
          },
          {
            imageData: "${imageUrls1}",
            imageDataFileName: "${imageFileName2}",
            answer: ${answer === "radio2" ? true : false}  
          }
          ,
          {
            imageData: "${imageUrls2}",
            imageDataFileName: "${imageFileName3}",
            answer: ${answer === "radio3" ? true : false}  
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p8ImageListeningCreate = async (
  title: string,
  voiceUrl: string,
  voiceDataFileName: string,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  imageUrls0?: string,
  imageUrls1?: string,
  imageUrls2?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p8ImageListeningCreateConfig(
      title,
      voiceUrl,
      voiceDataFileName,
      format,
      status,
      stage,
      imageFileName1,
      imageFileName2,
      imageFileName3,
      imageUrls0,
      imageUrls1,
      imageUrls2,
      answer
    )
  );
  return response?.data?.data?.p8ImageListening;
};
export const p8ImageListeningUpdateConfig = (
  SK: string,
  title: string,
  voiceUrl: string,
  voiceDataFileName: string,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  imageUrls0?: string,
  imageUrls1?: string,
  imageUrls2?: string,
  answer?: string
) => {
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
      questionSortKey:"${SK}"
        title:"${title}",
        voiceData: "${voiceUrl}",
         voiceDataFileName: "${voiceDataFileName}",
        options: [
          {
            imageData: "${imageUrls0}",
            imageDataFileName: "${imageFileName1}",
            answer: ${answer === "radio1" ? true : false}  
          },
          {
            imageData: "${imageUrls1}",
            imageDataFileName: "${imageFileName2}",
            answer: ${answer === "radio2" ? true : false}  
          }
          ,
          {
            imageData: "${imageUrls2}",
            imageDataFileName: "${imageFileName3}",
            answer: ${answer === "radio3" ? true : false}  
          }
        ],
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
    }){
        message
    }
}

`,
    variables: {}
  });

  return request_parameters;
};
export const p8ImageListeningUpdate = async (
  SK: string,
  title: string,
  voiceUrl: string,
  voiceDataFileName: string,
  format: string,
  status: any,
  stage: string,
  imageFileName1?: string,
  imageFileName2?: string,
  imageFileName3?: string,
  imageUrls0?: string,
  imageUrls1?: string,
  imageUrls2?: string,
  answer?: string
) => {
  const response = await axiosCall(
    p8ImageListeningUpdateConfig(
      SK,
      title,
      voiceUrl,
      voiceDataFileName,
      format,
      status,
      stage,
      imageFileName1,
      imageFileName2,
      imageFileName3,
      imageUrls0,
      imageUrls1,
      imageUrls2,
      answer
    )
  );
  return response?.data?.data?.p8ImageListening;
};
export const getEnglishQuestionListConfig = (
  currentPageNumber: number,
  status: any,
  filterText: string,
  questionFormat?: string,
  stageSortKey?: string
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_ENGLISH_QUESTION_List{
    getEnglishQuestionList(
       perPage: 16,
       pageNumber: ${currentPageNumber},
      ${status ? `questionStatus: ${status}` : ""}
      ${questionFormat ? `questionFormat: ${questionFormat}` : ""}
      ${stageSortKey ? `stageSortKey: "${stageSortKey}"` : ""}
      searchKeyWords: "${filterText}"
    ){
        perPage
        totalPage
        totalItem
        currentPageNumber
        from
        to
        items{
            SK
            questionStatus
            stageTitle
            questionFormat
            title
            updatedAt
            createdAt
            createdBy
            updatedBy
        }
        
    }

}`,
    variables: {}
  });

  return request_parameters;
};
export const getEnglishQuestionList = async (
  currentPageNumber: number,
  status: any,
  filterText: string,
  questionFormat?: string,
  stageSortKey?: string
) => {
  const result: any = await axiosCall(
    getEnglishQuestionListConfig(
      currentPageNumber,
      status,
      filterText,
      questionFormat,
      stageSortKey
    )
  );
  return result?.data?.data?.getEnglishQuestionList;
};
export const getSingleEnglishQuestionInfoConfig = (
  SK: string,
  questionFormat?: string
) => {
  let request_parameters = JSON.stringify({
    query: `query GET_ENGLISH_QUESTION_INFO{
    englishQuestion : getEnglishQuestion(        
      questionSortKey:"${SK}" ){
        SK
        type
        title
        questionStatus
        questionFormat
        stageTitle
        ${
          questionFormat === "p1WordSelection"
            ? ` questionText      
        imageData
        imageDataFileName
        options{
            title
            voiceData
            voiceDataFileName
            answer
        }`
            : questionFormat === "p2ImageSelection"
            ? ` questionText
                options{
                    imageData
                    imageDataFileName
                    answer
                }`
            : questionFormat === "p3WordSorting"
            ? ` imageData
                imageDataFileName
                wordQuestionText{
                    questionText
                }
                wordQuestionAnswer{
                    questionText
                }
                options{
                    title
                    voiceData
                    voiceDataFileName
                }`
            : questionFormat === "p4Newspaper"
            ? `imageData
               imageDataFileName
               newsPaperTitle
               newsPaperText
               publicationSource
               questionText
               options{
                 title
                 voiceData
                 voiceDataFileName
                 answer
              }`
            : questionFormat === "p5Conversation"
            ? `title
               conversation{
                   talker
                   talk{
                       talkText
                   }
               }
               options{
                   title
                   voiceData
                   voiceDataFileName
                   answer
               }`
            : questionFormat === "p6TextCreation"
            ? `  questionText
                voiceData
                voiceDataFileName
                options{
                    title
                }`
            : questionFormat === "p7WordListening"
            ? `voiceData
               voiceDataFileName
                  options{
                    title
                    answer
                  }`
            : questionFormat === "p8ImageListening"
            ? `voiceData
               voiceDataFileName
               options{
                 imageData
                 imageDataFileName
                 answer
             }`
            : ``
        }
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const getSingleEnglishQuestionInfo = async (
  SK: string,
  questionFormat?: string
) => {
  const response = await axiosCall(
    getSingleEnglishQuestionInfoConfig(SK, questionFormat)
  );
  return response?.data?.data?.englishQuestion;
};
export const getP2ImageSelectionInfo = (SK: string) => {
  let request_parameters = JSON.stringify({
    query: `query GET_ENGLISH_QUESTION_INFO{
    p2ImageSelection:getEnglishQuestion(questionSortKey:"${SK}" ){
        SK
        type
        title
        questionText
        questionStatus
        questionFormat
        stageTitle
        options{
            imageData
            imageDataFileName
            answer
        }
    }
  
     
  }`,
    variables: {}
  });

  return request_parameters;
};
export const getStageMapListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_SATGE_SELECT_OPTION{
        getStagesAsSelectOption{
           SK
        title
        imageData
        }
     }`,
    variables: {}
  });

  return request_parameters;
};
export const getStageMapList = async () => {
  const response: any = await axiosCall(getStageMapListConfig());
  return response?.data?.data?.getStagesAsSelectOption;
};
export const getStageDetailsConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_SATGE_SELECT_OPTION{
        getStagesAsSelectOption{
           SK
        title
        imageData
        imageDataFileName
        stageStatus
        }
     }`,
    variables: {}
  });

  return request_parameters;
};
export const getFormateMapListConfig = () => {
  let request_parameters = JSON.stringify({
    query: `query GET_ENGLISH_QUESTION_FORMAT_SELECT_OPTION{
        getEnglishQuestionFormatOptions{
            title
            uiComponentName
        }
    }`,
    variables: {}
  });

  return request_parameters;
};
export const getFormateMapList = async () => {
  const response: any = await axiosCall(getFormateMapListConfig());
  return response?.data?.data?.getEnglishQuestionFormatOptions;
};
export const deleteEnglishQuestionConfig = (questionSortKey: any) => {
  let allquery = "";
  for (let i = 1; i <= questionSortKey.length; i++) {
    allquery += `type${i}:updateEnglishQuestion(input:{
        questionSortKey: "${questionSortKey[i - 1].SK}"   
        questionStatus: Deleted
    }){
        message
    },`;
  }
  let request_parameters = JSON.stringify({
    query: `mutation updateEnglishQuestion{
           ${allquery}
        }`,
    variables: {}
  });
  return request_parameters;
};
export const deleteEnglishQuestion = async (questionSortKey: any) => {
  const response = await axiosCall(
    deleteEnglishQuestionConfig(questionSortKey)
  );
  return response;
};
