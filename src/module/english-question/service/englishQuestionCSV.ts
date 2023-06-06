import { handleApiError } from "../../../Services/utils/handleError";
import {
  p1WordSelectionCreateConfig,
  p2ImageSelectionCreateConfig,
  p3WordSortingCreateConfig,
  p4NewspaperCreateConfig,
  p6TextCreationCreateConfig,
  p7WordListeningConfig,
  p8ImageListeningCreateConfig
} from "../../../module/english-question/service/englishquestion";
import {
  p1WordSelection,
  p2ImageSelection,
  p3WordSorting,
  p4Newspaper,
  p5Conversation,
  p6TextCreation,
  p7WordListening,
  p8ImageListening
} from "../../../assets/static/static";
import { axiosCall } from "../../../Services/api/axiosCall";
export const getExportUrlEnglishQuestionConfig = (SK: string) => {
  let request_parameters = JSON.stringify({
    query: `query EXPORT_ENGLISH_QUESTION{
    exportEnglishQuestion(
        stageSortKey:"${SK}"
    ){
        downloadUrl
    }
}`,
    variables: {}
  });

  return request_parameters;
};
export const fetchExportEnglishQuestionUrl = async (SK: string) => {
  const fetchEnglishQuestionConfig = getExportUrlEnglishQuestionConfig(SK);
  const response = await axiosCall(fetchEnglishQuestionConfig);
  return response?.data?.data?.exportEnglishQuestion?.downloadUrl;
};
export const createP1EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText1"
      : data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText2"
      : "choiceText3";
  const config: any = p1WordSelectionCreateConfig(
    data?.title,
    data?.questionText,
    data?.questionFormat,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    "Draft",
    SK,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    answer
  );
  const response = await axiosCall(config);
  if (response?.data?.data?.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const createP2EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "radio1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "radio2"
      : "radio3";
  const config: any = p2ImageSelectionCreateConfig(
    data?.title,
    data?.questionText,
    data?.questionFormat,
    "Draft",
    SK,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    answer
  );
  console.log(
    data?.title,
    data?.questionText,
    data?.questionFormat,
    "Draft",
    SK,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    answer
  );
  const response = await axiosCall(config);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const createP3EnglishQuestionCSV = async (data: any, SK: string) => {
  const config: any = p3WordSortingCreateConfig(
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    data?.questionText_0_title,
    data?.questionText_1_title,
    data?.questionText_2_title,
    data?.questionText_3_title,
    data?.questionText_4_title,
    data?.questionText_5_title,
    data?.questionText_6_title,
    data?.questionText_7_title,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME
  );
  const response = await axiosCall(config);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const createP4EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "choice1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "choice2"
      : "choice3";
  const config: any = p4NewspaperCreateConfig(
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.newsPaperTitle,
    data?.newsPaperText,
    data?.publicationSource,
    data?.questionText,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    '',
    '',
    '',
    '',
    '',
    '',
    answer
  );
  //console.log(config)
  const response = await axiosCall(config);
  return response?.data?.data.p4Newspaper;
  //return false;
};
export const p5ConversationCreateConfigCSV = (
  title: string,
  format: string,
  stage: string,
  status: string,
  conv_0_talker: any,
  conv_0_talk_1: any,
  conv_0_talk_2: any,
  conv_0_talk_3: any,
  conv_0_talk_4: any,
  conv_1_talker: any,
  conv_1_talk_1: any,
  conv_1_talk_2: any,
  conv_1_talk_3: any,
  conv_1_talk_4: any,
  conv_2_talker: any,
  conv_2_talk_1: any,
  conv_2_talk_2: any,
  conv_2_talk_3: any,
  conv_2_talk_4: any,
  conv_3_talker: any,
  conv_3_talk_1: any,
  conv_3_talk_2: any,
  conv_3_talk_3: any,
  conv_3_talk_4: any,
  conv_4_talker: any,
  conv_4_talk_1: any,
  conv_4_talk_2: any,
  conv_4_talk_3: any,
  conv_4_talk_4: any,
  options_0_title: string,
  options_0_voiceData: any,
  options_0_voiceDataFileName: any,
  options_0_answer: string,
  options_1_title: string,
  options_1_voiceData: any,
  options_1_voiceDataFileName: any,
  options_1_answer: string,
  options_2_title: string,
  options_2_voiceData: any,
  options_2_voiceDataFileName: any,
  options_2_answer: string,
  options_3_title: string,
  options_3_voiceData: any,
  options_3_voiceDataFileName: any,
  options_3_answer: string
) => {
  console.log(conv_4_talker);

  let request_parameters = JSON.stringify({
    query: `mutation CREATE_ENGLISH_QUETION{
      ${format}: createEnglishQuestion(input:{
         title:"${title}"
        conversation:[
            {
                talker: "${conv_0_talker}"
                talk:[
                    {
                        talkText: "${conv_0_talk_1}"
                    }
                     ${
                       conv_0_talk_2 !== ""
                         ? `{
                        talkText: "${conv_0_talk_2}"
                    }`
                         : ""
                     } 
                    ${
                      conv_0_talk_3 !== ""
                        ? `{
                        talkText: "${conv_0_talk_3}"
                    }`
                        : ""
                    } 
                     ${
                       conv_0_talk_4 !== ""
                         ? `{
                        talkText: "${conv_0_talk_4}"
                    }`
                         : ""
                     } 
                ]
            }
            {
                talker: "${conv_1_talker}"
                talk:[
                    {
                        talkText: "${conv_1_talk_1}"
                    }
                    ${
                      conv_1_talk_2 !== ""
                        ? `{
                        talkText: "${conv_1_talk_2}"
                    }`
                        : ""
                    } 
                   ${
                     conv_1_talk_3 !== ""
                       ? `{
                        talkText: "${conv_1_talk_3}"
                    }`
                       : ""
                   } 
                    ${
                      conv_1_talk_4 !== ""
                        ? `{
                        talkText: "${conv_1_talk_4}"
                    }`
                        : ""
                    } 
                ]
            }
           ${
             conv_2_talker !== "" || conv_2_talker
               ? `{
                talker: "${conv_2_talker}"
                talk:[
                    ${
                      conv_2_talk_1 !== ""
                        ? `{
                        talkText: "${conv_2_talk_1}"
                    }`
                        : ""
                    }
                     ${
                       conv_2_talk_2 !== ""
                         ? `{
                        talkText: "${conv_2_talk_2}"
                    }`
                         : ""
                     }
                     ${
                       conv_2_talk_3 !== ""
                         ? `{
                        talkText: "${conv_2_talk_3}"
                    }`
                         : ""
                     }
                     ${
                       conv_2_talk_4 !== ""
                         ? `{
                        talkText: "${conv_2_talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
               : ""
           }
              ${
                conv_3_talker !== ""
                  ? `{
                talker: "${conv_3_talker}"
                talk:[
                    ${
                      conv_3_talk_1 !== ""
                        ? `{
                        talkText: "${conv_3_talk_1}"
                    }`
                        : ""
                    }
                     ${
                       conv_3_talk_2 !== ""
                         ? `{
                        talkText: "${conv_3_talk_2}"
                    }`
                         : ""
                     }
                     ${
                       conv_3_talk_3 !== ""
                         ? `{
                        talkText: "${conv_3_talk_3}"
                    }`
                         : ""
                     }
                     ${
                       conv_3_talk_4 !== ""
                         ? `{
                        talkText: "${conv_3_talk_4}"
                    }`
                         : ""
                     }
                ]
            }`
                  : ""
              }
                  ${
                    conv_4_talker !== ""
                      ? `{
                talker: "${conv_4_talker}"
                talk:[
                    ${
                      conv_4_talk_1 !== ""
                        ? `{
                        talkText: "${conv_4_talk_1}"
                    }`
                        : ""
                    }
                     ${
                       conv_4_talk_2 !== ""
                         ? `{
                        talkText: "${conv_4_talk_2}"
                    }`
                         : ""
                     }
                     ${
                       conv_4_talk_3 !== ""
                         ? `{
                        talkText: "${conv_4_talk_3}"
                    }`
                         : ""
                     }
                     ${
                       conv_4_talk_4 !== ""
                         ? `{
                        talkText: "${conv_4_talk_4}"
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
              title:"${options_0_title}"
              ${
                options_0_voiceData !== ""
                  ? `voiceData : "${options_0_voiceData}"`
                  : ""
              }
              ${
                options_0_voiceDataFileName !== ""
                  ? `voiceDataFileName : "${options_0_voiceDataFileName}"`
                  : ""
              }
              answer: ${options_0_answer.toLocaleLowerCase()}
          },
          {
             title:"${options_1_title}"
              ${
                options_1_voiceData !== ""
                  ? `voiceData : "${options_1_voiceData}"`
                  : ""
              }
              ${
                options_1_voiceDataFileName !== ""
                  ? `voiceDataFileName : "${options_1_voiceDataFileName}"`
                  : ""
              }
             answer: ${options_1_answer.toLocaleLowerCase()}
          },
          {
              title:"${options_2_title}"
              ${
                options_2_voiceData !== ""
                  ? `voiceData : "${options_2_voiceData}"`
                  : ""
              }
              ${
                options_2_voiceDataFileName !== ""
                  ? `voiceDataFileName : "${options_2_voiceDataFileName}"`
                  : ""
              }
              answer: ${options_2_answer.toLocaleLowerCase()}
          },
          {
            title:"${options_3_title}"
              ${
                options_3_voiceData !== ""
                  ? `voiceData : "${options_3_voiceData}"`
                  : ""
              }
              ${
                options_3_voiceDataFileName !== ""
                  ? `voiceDataFileName : "${options_3_voiceDataFileName}"`
                  : ""
              }
             answer: ${options_3_answer.toLocaleLowerCase()}
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
export const createP5EnglishQuestionCSV = async (data: any, SK: string) => {
  const config: any = p5ConversationCreateConfigCSV(
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.conversation_0_talker,
    data?.conversation_0_talk_1,
    data?.conversation_0_talk_2,
    data?.conversation_0_talk_3,
    data?.conversation_0_talk_4,
    data?.conversation_1_talker,
    data?.conversation_1_talk_1,
    data?.conversation_1_talk_2,
    data?.conversation_1_talk_3,
    data?.conversation_1_talk_4,
    data?.conversation_2_talker,
    data?.conversation_2_talk_1,
    data?.conversation_2_talk_2,
    data?.conversation_2_talk_3,
    data?.conversation_2_talk_4,
    data?.conversation_3_talker,
    data?.conversation_3_talk_1,
    data?.conversation_3_talk_2,
    data?.conversation_3_talk_3,
    data?.conversation_3_talk_4,
    data?.conversation_4_talker,
    data?.conversation_4_talk_1,
    data?.conversation_4_talk_2,
    data?.conversation_4_talk_3,
    data?.conversation_4_talk_4,
    data?.options_0_title,
    "",
    "",
    data?.options_0_answer,
    data?.options_1_title,
    "",
    "",
    data?.options_1_answer,
    data?.options_2_title,
    "",
    "",
    data?.options_2_answer,
    data?.options_3_title,
    "",
    "",
    data?.options_3_answer
  );
  const response = await axiosCall(config);
  return response?.data?.data.p5Conversation;
};
export const createP6EnglishQuestionCSV = async (data: any, SK: string) => {
  const config: any = p6TextCreationCreateConfig(
    data?.title,
    data?.questionFormat,
    SK,
    data?.questionText,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    data?.options_3_title,
    data?.options_4_title,
    data?.options_5_title,
    data?.options_6_title,
    data?.options_7_title,
    "Draft"
  );
  const response = await axiosCall(config);
  await handleApiError(response?.data);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const createP7EnglishQuestionCSV = async (
  data: any,
  stageSK: string
) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText1"
      : data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText2"
      : "choiceText3";
  const config: any = p7WordListeningConfig(
    data?.title,
    data?.questionFormat,
    stageSK,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    "Draft",
    answer
  );
  const response = await axiosCall(config);
  if (response?.data?.data?.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const createP8EnglishQuestionCSV = async (
  data: any,
  stageSK: string
) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "radio1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "radio2"
      : "radio3";
  const config: any = p8ImageListeningCreateConfig(
    data?.title,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    data?.questionFormat,
    "Draft",
    stageSK,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    answer
  );
  console.log(
    data?.title,
    data?.questionText,
    data?.questionFormat,
    "Draft",
    stageSK,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    answer
  );
  const response = await axiosCall(config);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP1EnglishQuestionCSVConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  imageData?: string,
  imageDataFileName?: string,
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
  console.log(answer);
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
export const updateP2EnglishQuestionCSVConfig = (
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
export const updateP3EnglishQuestionCSVConfig = (
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
                    : choiceWordThree
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
          {
            title: "${choiceWordThree}"
             ${voiceData3 !== "" ? `voiceData: "${voiceData3}"` : ""}
            ${
              voiceData3FileName !== ""
                ? `voiceDataFileName: "${voiceData3FileName}"`
                : ""
            }
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
export const updateP4EnglishQuestionCSVConfig = (
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
export const updateP6EnglishQuestionCSVConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  questionText?: string,
  voiceData?: string,
  voiceDataFileName?: string,
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
        voiceData: "${voiceData}",
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
          {
            title: "${wordFive}",    
          }
          ,
          {
            title: "${wordSix}",
          },
          {
            title: "${wordSeven}",       
          },
          {
            title: "${wordEight}",    
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
export const updateP7EnglishQuestionCSVConfig = (
  SK: string,
  title: string,
  format: string,
  stage: string,
  status: any,
  voiceData?: string,
  voiceDataFileName?: string,
  choiceText1?: string,
  choiceText2?: string,
  choiceText3?: string,
  answer?: string
) => {
  console.log(answer);
  let request_parameters = JSON.stringify({
    query: `mutation UPDATE_ENGLISH_QUETION{
    ${format}: updateEnglishQuestion(input:{
       questionSortKey: "${SK}"
        title:"${title}",
        questionStatus: ${status}
        questionFormat: ${format}
        stageSortKey:"${stage}"
       voiceData: "${voiceData}",
        voiceDataFileName: "${voiceDataFileName}",
        options: [
          {
            title: "${choiceText1}",
             answer: ${answer === "choiceText1" ? true : false}  
          },
          {
            title: "${choiceText2}",
             answer: ${answer === "choiceText2" ? true : false}  
          }
          ,
          {
            title: "${choiceText3}",
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
export const updateP8EnglishQuestionCSVConfig = (
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
export const updateP1EnglishQuestionCSV = async (data: any, SK: string) => {
  console.log("p1 sk", SK);
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "choiceText2"
      : "choiceText3";
  const config: any = updateP1EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.questionText,
    data?.imageData,
    data?.imageDataFileName,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    data?.options_0_voiceDataFileName,
    data?.options_1_voiceDataFileName,
    data?.options_2_voiceDataFileName,
    data?.options_0_voiceData,
    data?.options_1_voiceData,
    data?.options_2_voiceData,
    answer
  );
  console.log(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.questionText,
    data?.imageData,
    data?.imageDataFileName,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    data?.options_0_voiceDataFileName,
    data?.options_1_voiceDataFileName,
    data?.options_2_voiceDataFileName,
    data?.options_0_voiceData,
    data?.options_1_voiceData,
    data?.options_2_voiceData,
    answer
  );
  const response = await axiosCall(config);
  await handleApiError(response?.data);
  if (response?.data?.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP2EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "radio1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "radio2"
      : "radio3";
  const config: any = updateP2EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionText,
    data?.questionFormat,
    "Draft",
    SK,
    data?.options_0_imageData,
    data?.options_1_imageData,
    data?.options_2_imageData,
    data?.options_0_imageDataFileName || "fakeimage.png",
    data?.options_1_imageDataFileName || "fakeimage.png",
    data?.options_2_imageDataFileName || "fakeimage.png",
    answer
  );
  const response = await axiosCall(config);
  console.log(response);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP3EnglishQuestionCSV = async (data: any, SK: string) => {
  const config: any = updateP3EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    process.env.REACT_APP_SPECIAL_IMAGE_DATA,
    process.env.REACT_APP_SPECIAL_IMAGE_DATA_FILE_NAME,
    data?.questionText_0_title,
    data?.questionText_1_title,
    data?.questionText_2_title,
    data?.questionText_3_title,
    data?.questionText_4_title,
    data?.questionText_5_title,
    data?.questionText_6_title,
    data?.questionText_7_title,
    data?.options_0_title,
    data?.options_0_title,
    data?.options_0_title,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME,
    process.env.REACT_APP_SPECIAL_VOICE_DATA_FILE_NAME
  );
  const response = await axiosCall(config);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP6EnglishQuestionCSV = async (data: any, SK: string) => {
  const config: any = updateP6EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.questionText,
    data?.voiceData,
    data?.voiceDataFileName,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    data?.options_3_title,
    data?.options_4_title,
    data?.options_5_title,
    data?.options_6_title,
    data?.options_7_title
  );
  const response = await axiosCall(config);
  console.log(response);
  if (response?.data?.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP7EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "choiceText1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "choiceText2"
      : "choiceText3";
  const config: any = updateP7EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.voiceData,
    data?.voiceDataFileName,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    answer
  );
  console.log(
    data?.questionSortKey,
    data?.title,
    data?.questionFormat,
    SK,
    "Draft",
    data?.questionText,
    data?.imageData,
    data?.imageDataFileName,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title,
    data?.options_0_voiceDataFileName,
    data?.options_1_voiceDataFileName,
    data?.options_2_voiceDataFileName,
    data?.options_0_voiceData,
    data?.options_1_voiceData,
    data?.options_2_voiceData,
    answer
  );
  const response = await axiosCall(config);
  await handleApiError(response?.data);
  if (response?.data?.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
export const updateP8EnglishQuestionCSV = async (data: any, SK: string) => {
  const answer =
    data?.options_0_answer.toLowerCase() === "true"
      ? "radio1"
      : data?.options_1_answer.toLowerCase() === "true"
      ? "radio2"
      : "radio3";
  const config: any = updateP8EnglishQuestionCSVConfig(
    data?.questionSortKey,
    data?.title,
    data?.questionText,
    data?.questionFormat,
    "Draft",
    SK,
    data?.options_0_imageData,
    data?.options_1_imageData,
    data?.options_2_imageData,
    data?.options_0_imageDataFileName,
    data?.options_1_imageDataFileName,
    data?.options_2_imageDataFileName,
    answer
  );
  const response = await axiosCall(config);
  if (response?.data?.data.hasOwnProperty("errors")) {
    return false;
  }
  return true;
};
const checkNullString = (text: string) => {
  if (text === "") return true;
  return false;
};
const p1CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p1UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.imageData) ||
    checkNullString(data?.imageDataFileName) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_0_voiceDataFileName) ||
    checkNullString(data?.options_0_voiceData) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_1_voiceDataFileName) ||
    checkNullString(data?.options_1_voiceData) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_2_voiceDataFileName) ||
    checkNullString(data?.options_2_voiceData) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p2CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p2UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.options_0_imageDataFileName) ||
    checkNullString(data?.options_0_imageData) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_imageDataFileName) ||
    checkNullString(data?.options_1_imageData) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_imageDataFileName) ||
    checkNullString(data?.options_2_imageData) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p3CreateCheckValidation = (data: any) => {
  console.log(
    data?.title,
    data?.questionText_0_title,
    data?.options_0_title,
    data?.options_1_title,
    data?.options_2_title
  );
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText_0_title) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title)
  )
    return false;
  return true;
};
const p3UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText_0_title) ||
    checkNullString(data?.imageData) ||
    checkNullString(data?.imageDataFileName) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title)
  )
    return false;
  return true;
};
const p4CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.newsPaperTitle) ||
    checkNullString(data?.newsPaperText) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p4UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.newsPaperTitle) ||
    checkNullString(data?.newsPaperText) ||
    checkNullString(data?.imageData) ||
    checkNullString(data?.imageDataFileName) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p5CreateCheckValidation = (data: any) => {
  // if (
  //   checkNullString(data?.title) ||
  //   checkNullString(data?.questionText) ||
  //   checkNullString(data?.newsPaperTitle) ||
  //   checkNullString(data?.newsPaperText) ||
  //   checkNullString(data?.options_0_title) ||
  //   checkNullString(data?.options_1_title) ||
  //   checkNullString(data?.options_2_title) ||
  //   checkNullString(data?.options_0_answer) ||
  //   checkNullString(data?.options_1_answer) ||
  //   checkNullString(data?.options_2_answer)
  // )
  //   return false;
  return true;
};
const p6CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_3_title)
  )
    return false;
  return true;
};
const p6UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.questionText) ||
    checkNullString(data?.voiceData) ||
    checkNullString(data?.voiceDataFileName) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_3_title)
  )
    return false;
  return true;
};
const p7CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p7UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.voiceData) ||
    checkNullString(data?.voiceDataFileName) ||
    checkNullString(data?.options_0_title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_title) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_title) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p8CreateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
const p8UpdateCheckValidation = (data: any) => {
  if (
    checkNullString(data?.title) ||
    checkNullString(data?.voiceDataFileName) ||
    checkNullString(data?.voiceData) ||
    checkNullString(data?.options_0_imageDataFileName) ||
    checkNullString(data?.options_0_imageData) ||
    checkNullString(data?.options_0_answer) ||
    checkNullString(data?.options_1_imageDataFileName) ||
    checkNullString(data?.options_1_imageData) ||
    checkNullString(data?.options_1_answer) ||
    checkNullString(data?.options_2_imageDataFileName) ||
    checkNullString(data?.options_2_imageData) ||
    checkNullString(data?.options_2_answer)
  )
    return false;
  return true;
};
export const csvFileUploadEnglishQuestion = async (data: any, SK: string) => {
  if (data.questionFormat === "") return false;
  switch (data.questionFormat) {
    case p1WordSelection:
      if (data.questionSortKey) {
        if (!p1UpdateCheckValidation(data)) return false;
        const result = await updateP1EnglishQuestionCSV(data, SK);
        console.log("p1 Update");
        return result;
      } else {
        if (!p1CreateCheckValidation(data)) return false;
        const result = await createP1EnglishQuestionCSV(data, SK);
        console.log("p1 create");
        return result;
      }

      break;
    case p2ImageSelection:
      if (data.questionSortKey) {
        if (!p2UpdateCheckValidation(data)) return false;
        const result = await updateP2EnglishQuestionCSV(data, SK);
        console.log("p2 Update");
        return result;
      } else {
        if (!p2CreateCheckValidation(data)) return false;
        const result = await createP2EnglishQuestionCSV(data, SK);

        console.log("p2 create");
        return result;
      }
      break;
    case p3WordSorting:
      if (data.questionSortKey) {
        if (!p3UpdateCheckValidation(data)) return false;
        const result = await updateP3EnglishQuestionCSV(data, SK);
        console.log("p3 Update");
        return result;
      } else {
        if (!p3CreateCheckValidation(data)) return false;
        const result = await createP3EnglishQuestionCSV(data, SK);

        console.log("p3 create");
        return result;
      }
      break;
    case p4Newspaper:
      if (data.questionSortKey) {
        if (!p4UpdateCheckValidation(data)) return false;
        const result = await updateP2EnglishQuestionCSV(data, SK);
        //Error
        console.log("p4 Update");
        return result;
      } else {
        if (!p4CreateCheckValidation(data)) return false;
        console.log('eto dur ki ashse?')
        const result = await createP4EnglishQuestionCSV(data, SK);

        console.log("p4 create");
        return result;
      }
      break;
    case p5Conversation:
      if (data.questionSortKey) {
        //  if (!p6UpdateCheckValidation(data)) return false;
        const result = await updateP6EnglishQuestionCSV(data, SK);
        console.log("p5  Update");
        return result;
      } else {
        if (!p6CreateCheckValidation(data)) return false;
        const result = await createP5EnglishQuestionCSV(data, SK);
        console.log("p5 create", result);
        return result;
        //return true;
      }
    case p6TextCreation:
      if (data.questionSortKey) {
        if (!p6UpdateCheckValidation(data)) return false;
        const result = await updateP6EnglishQuestionCSV(data, SK);
        console.log("p6 Update");
        return result;
      } else {
        if (!p6CreateCheckValidation(data)) return false;
        const result = await createP6EnglishQuestionCSV(data, SK);

        console.log("p6 create");
        return result;
      }
      break;
    case p7WordListening:
      if (data.questionSortKey) {
        if (!p7UpdateCheckValidation(data)) return false;
        const result = await updateP7EnglishQuestionCSV(data, SK);
        console.log("p7 Update");
        return result;
      } else {
        if (!p7CreateCheckValidation(data)) return false;
        const result = await createP7EnglishQuestionCSV(data, SK);

        console.log("p7 create");
        return result;
      }
      break;
    case p8ImageListening:
      if (data.questionSortKey) {
        if (!p8UpdateCheckValidation(data)) return false;
        const result = await updateP8EnglishQuestionCSV(data, SK);
        console.log("p8 Update");
        return result;
      } else {
        if (!p8CreateCheckValidation(data)) return false;
        const result = await createP8EnglishQuestionCSV(data, SK);

        console.log("p8 create");
        return result;
      }
      break;
  }
};
