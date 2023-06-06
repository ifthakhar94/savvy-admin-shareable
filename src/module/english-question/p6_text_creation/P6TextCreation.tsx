import { useState, useEffect } from "react";
import { red } from "../../../assets/style/color";
import { lightDark } from "../../../assets/style/color";
import DragnDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import Loader from "../../../Components/loader/Loader";
import {
  p6TextCreationCreate,
  p6TextCreationUpdate
} from "../service/englishquestion";
import PreviewModal from "./P6PreviewModal";
import { audioUploadSignedUrl } from "../service/fileUploadSignedUrl";
import {
  acceptedAudioFileType,
  acceptedImageFileType,
  allAudioSize,
  allAudioSizeText,
  allImageSize
} from "../../../assets/static/static";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P6TextCreation({
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
  const [dataLoaded, setDataLoaded] = useState(true);
  const [voiceData, setVoiceData] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  // const [voiceData, setVoiceData] = useState<any>();
  // const [voiceDataFileName, setVoiceDataFileName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [words, setWords] = useState({
    wordOne: "",
    wordTwo: "",
    wordThree: "",
    wordFour: "",
    wordFive: "",
    wordSix: "",
    wordSeven: "",
    wordEight: ""
  });
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const handleChangeQuestionText = (e: any) => {
    setShowDialog(true);
    setQuestionText(e.target.value);
  };
  // const checkImageValidation = (file: any) => {
  //   if (edit && file && file?.size > 10000000) return false;
  //   return !edit && (!file || (file && file?.size > 10000000));
  // };


  const checkFileValidation = (file: any, limitSize: number) => {
    if (edit && file && file?.size > limitSize) {
      return false;
    } else if (!edit && (!file || file?.size > limitSize)) {
      return false;
    }
    return true;
  };
  const checkAudioFileTypeValidation = (file: any, acceptedFiles: any) => {
    if (file) {
      if (
        acceptedFiles.includes(
          file?.type?.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      ) {
        return true;
      } else return false;
    }
    return true;
  };
  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (edit) {
      if (
        (file &&
          acceptedType.includes(
            file?.type?.slice(
              file?.type.lastIndexOf("/") + 1,
              file?.type.length
            )
          )) ||
        !file
      )
        return true;
      return false;
    } else {
      if (
        file &&
        acceptedType.includes(
          file?.type?.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return true;
    }
  };
  const checkValidation = () => {
    if (title?.length === 0 || title?.length > 40) return false;
    if (questionText?.length === 0 || questionText?.length > 40) return false;
    if (words?.wordOne.length === 0 || words?.wordOne.length > 20) return false;
    if (words?.wordTwo.length === 0 || words?.wordTwo.length > 20) return false;
    if (words?.wordThree.length === 0 || words?.wordThree.length > 20)
      return false;
    if (words?.wordFour.length === 0 || words?.wordFour.length > 20)
      return false;
    if (words?.wordFive.length > 20) return false;
    if (words?.wordSix.length > 20) return false;
    if (words?.wordSeven.length > 20) return false;
    if (words?.wordEight.length > 20) return false;
    if (!checkFileValidation(voiceData?.data, allAudioSize)) return false;
    if (!checkFileTypeValidation(voiceData?.data, acceptedAudioFileType))
      return false;

    return true;
  };
  const handleUploadFile = async () => {
    let voiceUrl = await Promise.all([
      audioUploadSignedUrl(voiceData?.data, voiceData?.data.type)
    ]);
    return voiceUrl;
  };
  const createNewEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const url: any = await handleUploadFile();
      const response = await p6TextCreationCreate(
        title,
        format,
        getStageSK(stage),
        questionText,
        url,
        voiceData.fileName,
        words.wordOne,
        words.wordTwo,
        words.wordThree,
        words.wordFour,
        words.wordFive === "" ? undefined : words.wordFive,
        words.wordSix === "" ? undefined : words.wordSix,
        words.wordSeven === "" ? undefined : words.wordSeven,
        words.wordEight === "" ? undefined : words.wordEight,
        sendData
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var p6VoiceData;
     
      if (voiceData) {
        p6VoiceData = await audioUploadSignedUrl(voiceData?.data, voiceData?.data?.type);
      } else {
        p6VoiceData = fetchedData?.voiceData;
      }
      const response = await p6TextCreationUpdate(
        fetchedData?.SK,
        title,
        fetchedData?.questionFormat,
        getStageSK(stage),
        sendData,
        questionText.trim(),
        p6VoiceData,
        voiceData.fileName,
        words.wordOne.trim(),
        words.wordTwo.trim(),
        words.wordThree.trim(),
        words.wordFour.trim(),
        words.wordFive.trim(),
        words.wordSix.trim(),
        words.wordSeven.trim(),
        words.wordEight.trim()
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          updateEnglishQuestion();
          //console.log("Update");
        } else {
          //console.log("create");
          createNewEnglishQuestion();
        }
      } else {
        handleError(true);
      }

      closeCallApi();
    }
  }, [sendData]);
  useEffect(() => {
    // sendData ? console.log(sendData) : console.log("not clicked");
    if (edit) {
      try {
        setQuestionText(fetchedData?.questionText || "");
        setWords({
          wordOne: fetchedData?.options[0]?.title,
          wordTwo: fetchedData?.options[1]?.title,
          wordThree: fetchedData?.options[2]?.title,
          wordFour: fetchedData?.options[3]?.title,
          wordFive: fetchedData?.options[4]?.title || "",
          wordSix: fetchedData?.options[5]?.title || "",
          wordSeven: fetchedData?.options[6]?.title || "",
          wordEight: fetchedData?.options[7]?.title || ""
        });

        setVoiceData(fetchedData?.voiceData.fileName || "");
      } catch (error) {
        console.log(error);
      }
    }
  }, [fetchedData]);
  const checkLengthValidationOfWords = () => {
    if (words.wordOne?.length > 20) return false;
    if (words.wordTwo?.length > 20) return false;
    if (words.wordThree?.length > 20) return false;
    if (words.wordFour?.length > 20) return false;
    if (words.wordFive?.length > 20) return false;
    if (words.wordSix?.length > 20) return false;
    if (words.wordSeven?.length > 20) return false;
    if (words.wordEight?.length > 20) return false;
    return true;
  };
  return (
    <div>
      <div className="mb-3 mt-3">
        <label className="  ">
          <span className="fs-12 color-dark">Question text</span>
          <span className="asterisk">&#42;</span>{" "}
          <span
            className="fs-10  ms-4 ml-10"
            style={{
              color: questionText?.length > 40 ? `${red}` : `${lightDark}`
            }}
          >
            ※Up to 40 characters in each form.
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter question test"
          value={questionText}
          name="questionText"
          onChange={handleChangeQuestionText}
          className="title-input"
          style={{
            border:
              error && sendData !== "Deleted" && questionText.length === 0
                ? `1px solid red`
                : ""
          }}
        />
      </div>
      <div
        className="color-red fs-10 mb-1"
        style={{
          opacity: error && sendData !== "Deleted" ? 1 : 0
        }}
      >
        Please note that some fields have not been filled in.
      </div>
      <div className="drag_file_part">
        {" "}
        <span className="fs-12 color-dark">Voice data</span>
        <span className="asterisk">&#42;</span>
        <span
          className={`fs-10 ml-10 ${
            checkAudioFileTypeValidation(voiceData?.data, acceptedAudioFileType)
              ? "color-light-dark"
              : "color-red"
          }`}
        >
          MP3,M4A
        </span>
        <span
          className={`fs-10 ml-10 ${
            (voiceData?.data !== null && voiceData?.data?.size) > allAudioSize
              ? `color-red`
              : `color-light-dark`
          }`}
        >
          {allAudioSizeText} or less
        </span>
        <DragnDropVoice
          setVoiceFile={(file: any) => {
            setVoiceData({
              ...voiceData,
              data: file,
              fileName: file.name
            });
            setShowDialog(true);
          }}
          fileName={voiceData?.fileName || fetchedData?.voiceDataFileName}
          error={error}
          link={fetchedData?.voiceData}
        />
      </div>
      <div className="text-creation-multiple-input-wrapper">
        <label className="  ">
          <span className="fs-12 color-dark">Correct sentence</span>
          <span
            className="fs-10  ms-4 ml-10"
            style={{
              color: checkLengthValidationOfWords() ? `${lightDark}` : `${red}`
            }}
          >
            ※Up to 20 characters in each form.
          </span>
        </label>
        <div className="text-creation-multiple-input">
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">1</div>
              </span>
              <span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordOne}
              name="Word One"
              onChange={(e: any) => {
                setWords({ ...words, wordOne: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
              style={{
                border:
                  error && sendData !== "Deleted" && words.wordOne.length === 0
                    ? `1px solid red`
                    : ""
              }}
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">2</div>
              </span>
              <span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordTwo}
              name="Word Two"
              onChange={(e: any) => {
                setWords({ ...words, wordTwo: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
              style={{
                border:
                  error && sendData !== "Deleted" && words.wordTwo.length === 0
                    ? `1px solid red`
                    : ""
              }}
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">3</div>
              </span>
              <span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordThree}
              name="Word Three"
              onChange={(e: any) => {
                setWords({ ...words, wordThree: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
              style={{
                border:
                  error &&
                  sendData !== "Deleted" &&
                  words.wordThree.length === 0
                    ? `1px solid red`
                    : ""
              }}
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">4</div>
              </span>
              <span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordFour}
              name="Word Four"
              onChange={(e: any) => {
                setWords({ ...words, wordFour: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
              style={{
                border:
                  error && sendData !== "Deleted" && words.wordFour.length === 0
                    ? `1px solid red`
                    : ""
              }}
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">5</div>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordFive}
              name="Word Five"
              onChange={(e: any) => {
                setWords({ ...words, wordFive: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">6</div>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordSix}
              name="Word Six"
              onChange={(e: any) => {
                setWords({ ...words, wordSix: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">7</div>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordSeven}
              name="Word Seven"
              onChange={(e: any) => {
                setWords({ ...words, wordSeven: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
            />
          </div>
          <div className="mb-1 mt-1">
            <label className=" d-flex flex-row">
              <span className="fs-12 color-dark d-flex flex-row">
                Word<div className="round-numbered-text">8</div>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter text"
              value={words.wordEight}
              name="Word Eight"
              onChange={(e: any) => {
                setWords({ ...words, wordEight: e.target.value });
                setShowDialog(true);
              }}
              className="title-input"
            />
          </div>
        </div>
      </div>
      {preview && (
        <PreviewModal
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          modalBackgroundImage={getStageBackgroundImage(stage)}
          questionText={questionText ? questionText : ""}
          choiceA={words.wordOne ? words.wordOne : ""}
          choiceB={words.wordTwo ? words.wordTwo : ""}
          choiceC={words.wordThree ? words.wordThree : ""}
          choiceD={words.wordFour ? words.wordFour : ""}
          choiceE={words.wordFive ? words.wordFive : ""}
          choiceF={words.wordSix ? words.wordSix : ""}
          choiceG={words.wordSeven ? words.wordSeven : ""}
          choiceH={words.wordEight ? words.wordEight : ""}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P6TextCreation;
