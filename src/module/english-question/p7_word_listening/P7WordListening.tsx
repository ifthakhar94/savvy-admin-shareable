import React, { useState, useEffect, useLayoutEffect } from "react";
import { red, dark } from "../../../assets/style/color";
// import DragDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import P7PreviewModal from "./P7PreviewModal";
import {
  p7WordListiningCreate,
  p7WordListiningUpdate
} from "../../english-question/service/englishquestion";
import Loader from "../../../Components/loader/Loader";
import { audioUploadSignedUrl } from "../service/fileUploadSignedUrl";
import DragDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
// import P7PreviewModal from "./P7PreviewModal";
import {
  acceptedAudioFileType,
  allAudioSize,
  allAudioSizeText
} from "../../../assets/static/static";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P7WordListening({
  stageList,
  sendData,
  closeCallApi,
  handleCloseApiCallDone,
  edit,
  title,
  stage,
  format,
  fetchedData,
  error,
  handleError,
  preview,
  handlePreviewClose,
  setShowDialog
}: getQuestionPropTypes) {
  const [audio, setAudio] = useState<any>("");
  const [audioFileName, setAudioFileName] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [answer, setAnswer] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };

  // const handleUploadFile = async () => {
  //   let url = await audioUploadSignedUrl(audio, audio.type);
  //   console.log(url);
  //   return url;
  // };

  const handleUploadFile = async () => {
    let voiceUrl = await Promise.all([
      audio && audioUploadSignedUrl(audio, audio.type)
    ]);
    return voiceUrl;
  };

  const checkAudioFileValidation = (file: any, limitSize: number) => {
    if (file && file?.size > limitSize) {
      return false;
    }
    return true;
  };
  const checkAudioFileTypeValidation = (file: any, acceptedFiles: any) => {
    if (file) {
      if (
        acceptedFiles.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      ) {
        return true;
      } else return false;
    }
    return true;
  };
  const checkTextValidation = (text: string, characterLimit: number) => {
    return text.length === 0 || text.length > characterLimit;
  };

  const checkValidation = () => {
    if (checkTextValidation(title, 40)) return false;
    if (checkTextValidation(choice1, 20)) return false;
    if (checkTextValidation(choice2, 20)) return false;
    if (checkTextValidation(choice3, 20)) return false;
    if (
      audio &&
      (!checkAudioFileValidation(audio, allAudioSize) ||
        !checkAudioFileTypeValidation(audio, acceptedAudioFileType))
    )
      return false;

    if (!edit && answer.length === 0) return false;
    return true;
  };

  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const createP7WordListening = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response: any = await p7WordListiningCreate(
        title,
        format,
        getStageSK(stage),
        choice1,
        choice2,
        choice3,
        urls,
        audioFileName,
        sendData,
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAnswer = () => {
    return fetchedData?.options[0]?.answer
      ? "choiceText1"
      : fetchedData?.options[1]?.answer
      ? "choiceText2"
      : "choiceText3";
  };

  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var voiceUrl: any = await Promise.all([
        audio
          ? audioUploadSignedUrl(audio, audio.type)
          : fetchedData?.options[0]?.voiceData
      ]);
      const response = await p7WordListiningUpdate(
        fetchedData?.SK,
        voiceUrl,
        audioFileName || fetchedData?.imageDataFileName,
        title,
        choice1 || fetchedData?.options[0]?.title,
        choice2 || fetchedData?.options[1]?.title,
        choice3 || fetchedData?.options[2]?.title,
        sendData,
        fetchedData?.questionFormat,
        getStageSK(stage),
        answer || getAnswer()
      );
      console.log(
        fetchedData?.SK,
        voiceUrl,
        audioFileName || fetchedData?.imageDataFileName,
        title,
        choice1 || fetchedData?.options[0]?.title,
        choice2 || fetchedData?.options[1]?.title,
        choice3 || fetchedData?.options[2]?.title,
        sendData,
        fetchedData?.questionFormat,
        getStageSK(stage),
        answer || getAnswer()
      );

      // console.log(response);
      setDataLoaded(true);
      handleCloseApiCallDone();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeRadionButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };

  useLayoutEffect(() => {
    sendData && console.log(sendData);
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          updateEnglishQuestion();
        } else {
          createP7WordListening();
        }
      } else {
        handleError(true);
      }

      closeCallApi();
    }
  }, [sendData]);

  // console.log(choice1)

  useEffect(() => {
    // sendData ? console.log(sendData) : console.log("not clicked");
    if (edit) {
      setChoice1(fetchedData?.options[0]?.title);
      setChoice2(fetchedData?.options[1]?.title);
      setChoice3(fetchedData?.options[2]?.title);

      setAudioFileName(fetchedData?.voiceDataFileName);
    }
  }, [fetchedData]);

  const checkAnswer = (id: number) => {
    if (answer) {
      return answer === `choiceText${id}`;
    }
    return fetchedData?.options[id - 1]?.answer;
  };

  return (
    <div>
      <div className="mb-2">
        <label className="mb-2">
          <span className="fs-12 color-dark">Voice data</span>
          <span
            className={`fs-10 ml-10 ${
              checkAudioFileTypeValidation(audio, acceptedAudioFileType)
                ? "color-light-dark"
                : "color-red"
            }`}
          >
            MP3,M4A
          </span>
          <span
            className={`fs-10 ml-10 ${
              (audio !== null && audio?.size) > allAudioSize
                ? `color-red`
                : `color-light-dark`
            }`}
          >
            {allAudioSizeText} or less
          </span>
        </label>

        <div className="d-flex">
          <DragDropVoice
            setVoiceFile={(file: any) => {
              setAudio(file);
              setAudioFileName(file.name);
              setShowDialog(true);
            }}
            fileName={audioFileName}
            link={fetchedData?.voiceData}
            error={error}
          />
        </div>
      </div>
      <div
        className={`color-red fs-10 mb-1 ${
          error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
        }`}
      >
        Please note that some fields have not been filled in.
      </div>
      <div className="mcq_file_part--choice">
        <div className="width-100-pt">
          <label className="mb-2">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ms-3 ${
                error && answer.length === 0 ? "color-red" : "color-dark"
              }`}
            >
              ※Please check the correct answer.
            </span>
            <span
              className="fs-10  ml-5"
              style={{
                color:
                  choice1?.length > 20 ||
                  choice2?.length > 20 ||
                  choice3?.length > 20
                    ? `${red}`
                    : `${dark}`
              }}
            >
              ※Up to 20 characters
            </span>
          </label>
          <div className="d-flex align-items-center mb-3">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                checked={checkAnswer(1)}
                name="choice"
                value={"choiceText1"}
              />

              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceA"
              value={choice1}
              onChange={(e) => {
                setChoice1(e.target.value);
                setShowDialog(true);
              }}
              className={` ${
                error && choice1.length === 0 && `border-red`
              } color-dark fs-14`}
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                checked={checkAnswer(2)}
                name="choice"
                value={"choiceText2"}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceA"
              className={` ${
                error && choice2.length === 0 && `border-red`
              } color-dark fs-14`}
              value={choice2}
              onChange={(e) => {
                setChoice2(e.target.value);
                setShowDialog(true);
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                checked={checkAnswer(3)}
                name="choice"
                value={"choiceText3"}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceA"
              className={` ${
                error && choice3.length === 0 && `border-red`
              } color-dark fs-14`}
              value={choice3}
              onChange={(e) => {
                setChoice3(e.target.value);
                setShowDialog(true);
              }}
            />
          </div>
        </div>
      </div>
      {preview && (
        <P7PreviewModal
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          choiceA={choice1}
          choiceB={choice2}
          choiceC={choice3}
          stageBackground={getStageBackgroundImage(stage)}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P7WordListening;
