import React, { useState, useLayoutEffect } from "react";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import DragnDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import {
  imageUploadSignedUrl,
  audioUploadSignedUrl
} from "../service/fileUploadSignedUrl";
import {
  p1WordSelectionCreate,
  p1WordSelectionUpdate
} from "../service/englishquestion";
import Loader from "../../../Components/loader/Loader";
import PreviewModal from "./P1PreviewModal";
import {
  allImageSize,
  allAudioSize,
  allAudioSizeText,
  acceptedAudioFileType,
  acceptedImageFileType
} from "../../../assets/static/static";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P1WordSelection({
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
  const [image, setImage] = useState<any>("");
  const [imageFileName, setImageFileName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [choiceText1, setChoiceText1] = useState("");
  const [choiceText2, setChoiceText2] = useState("");
  const [choiceText3, setChoiceText3] = useState("");
  const [answer, setAnswer] = useState("");
  const [voiceData1, setvoiceData1] = useState<any>("");
  const [voiceData2, setvoiceData2] = useState<any>("");
  const [voiceData3, setvoiceData3] = useState<any>("");
  const [voiceData1FileName, setvoiceData1FileName] = useState("");
  const [voiceData2FileName, setvoiceData2FileName] = useState("");
  const [voiceData3FileName, setvoiceData3FileName] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const handleChangeRadionButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
    setShowDialog(true);
  };
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const handleChangeQuestionText = (e: any) => {
    setQuestionText(e.target.value);
    setShowDialog(true);
  };
  const handleUploadFile = async () => {
    let [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
      imageUploadSignedUrl(image, image.type),
      voiceData1 && audioUploadSignedUrl(voiceData1, voiceData1.type),
      voiceData2 && audioUploadSignedUrl(voiceData2, voiceData2.type),
      voiceData3 && audioUploadSignedUrl(voiceData3, voiceData3.type)
    ]);
    return [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3];
  };
  const checkFileValidation = (file: any, limitSize: number) => {
    if (edit && file && file?.size > limitSize) {
      return false;
    } else if (!edit && (!file || file?.size > limitSize)) {
      return false;
    }
    return true;
  };
  const checkAudioFileValidation = (file: any, limitSize: number) => {
    if (file && file?.size > limitSize) {
      return false;
    }
    return true;
  };

  const checkTextValidation = (text: string, characterLimit: number) => {
    return text.length === 0 || text.length > characterLimit;
  };
  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (edit) {
      if (
        (file &&
          acceptedType.includes(
            file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
          )) ||
        !file
      )
        return true;
    } else {
      if (
        file &&
        acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return true;
    }
  };
  const checkValidation = () => {
    if (checkTextValidation(title, 40)) return false;
    if (checkTextValidation(choiceText1, 20)) return false;
    if (checkTextValidation(choiceText2, 20)) return false;
    if (checkTextValidation(choiceText3, 20)) return false;

    if (!checkFileValidation(image, allImageSize)) return false;
    if (!checkFileTypeValidation(image, acceptedImageFileType)) return false;
    if (checkTextValidation(questionText, 40)) return false;
    if (!edit && answer.length === 0) return false;
    if (
      voiceData1 &&
      (!checkAudioFileValidation(voiceData1, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData1, acceptedAudioFileType))
    )
      return false;

    if (
      voiceData2 &&
      (!checkAudioFileValidation(voiceData2, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData2, acceptedAudioFileType))
    )
      return false;

    if (
      voiceData3 &&
      (!checkAudioFileValidation(voiceData3, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData3, acceptedAudioFileType))
    ) {
      return false;
    }
    return true;
  };
  const createNewEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response: any = await p1WordSelectionCreate(
        title,
        questionText.trim(),
        format,
        urls[0],
        imageFileName,
        sendData,
        getStageSK(stage),
        choiceText1,
        choiceText2,
        choiceText3,
        voiceData1FileName,
        voiceData2FileName,
        voiceData3FileName,
        urls[1] || "",
        urls[2] || "",
        urls[3] || "",
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
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
      var [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
        image
          ? imageUploadSignedUrl(image, image.type)
          : fetchedData?.imageData,
        voiceData1
          ? audioUploadSignedUrl(voiceData1, voiceData1.type)
          : fetchedData?.options[0]?.voiceData,
        voiceData2
          ? audioUploadSignedUrl(voiceData2, voiceData2.type)
          : fetchedData?.options[1]?.voiceData,
        voiceData3
          ? audioUploadSignedUrl(voiceData3, voiceData3.type)
          : fetchedData?.options[2]?.voiceData
      ]);
      const response = await p1WordSelectionUpdate(
        fetchedData?.SK,
        title,
        fetchedData?.questionFormat,
        getStageSK(stage),
        sendData,
        questionText,
        imageUrl,
        imageFileName || fetchedData?.imageDataFileName,
        choiceText1 || fetchedData?.options[0]?.title,
        choiceText2 || fetchedData?.options[1]?.title,
        choiceText3 || fetchedData?.options[2]?.title,
        voiceData1FileName || fetchedData?.options[0]?.voiceDataFileName,
        voiceData2FileName || fetchedData?.options[1]?.voiceDataFileName,
        voiceData3FileName || fetchedData?.options[2]?.voiceDataFileName,
        voiceUrl1,
        voiceUrl2,
        voiceUrl3,
        answer || getAnswer()
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useLayoutEffect(() => {
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          updateEnglishQuestion();
        } else createNewEnglishQuestion();
      } else {
        handleError(true);
      }

      closeCallApi();
    }
  }, [sendData]);
  useLayoutEffect(() => {
    if (edit) {
      setAnswer(
        fetchedData?.options[0]?.answer === true
          ? "choiceText1"
          : fetchedData?.options[1]?.answer === true
          ? "choiceText2"
          : "choiceText3"
      );
      setQuestionText(fetchedData?.questionText);
      setChoiceText1(fetchedData?.options[0]?.title);
      setChoiceText2(fetchedData?.options[1]?.title);
      setChoiceText3(fetchedData?.options[2]?.title);
      // setImageFileName(fetchedData?.imageFileName);
      // setvoiceData1FileName(fetchedData?.options[0]?.voiceData1FileName);
      // setvoiceData2FileName(fetchedData?.options[1]?.voiceData2FileName);
      // setvoiceData3FileName(fetchedData?.options[2]?.voiceData3FileName);
    }
  }, [fetchedData]);
  const checkAnswer = (id: number) => {
    if (answer) {
      return answer === `choiceText${id}`;
    }
    return fetchedData?.options[id - 1]?.answer;
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
  return (
    <div>
      <NewDragDrop
        title="Image data"
        setImageFile={(file: any) => {
          setImage(file);
          setImageFileName(file.name);
          setShowDialog(true);
        }}
        link={fetchedData?.imageData}
        fileName={imageFileName || fetchedData?.imageDataFileName}
        error={error}
      />

      <div className="mb-2 mt-3">
        <label className="  ">
          <span className="fs-12 color-dark">Question text</span>
          <span className="asterisk">&#42;</span>
          <span
            className={`fs-10  ms-4 ml-10 ${
              questionText?.length > 40 ? `color-red` : `color-light-dark`
            }`}
          >
            ※Up to 40 characters
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter question test"
          value={questionText || ""}
          name="questionText"
          onChange={handleChangeQuestionText}
          className={`title-input ${
            error && questionText.length === 0 && `border-red`
          }`}
        />
      </div>
      <div
        className={`color-red fs-10 mb-1 ${
          error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
        }`}
      >
        Please note that some fields have not been filled in.
      </div>
      {/* choice start */}

      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <label className="mb-10">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ms-3 ${
                error && answer.length === 0 ? "color-red" : "color-dark"
              }`}
            >
              ※Please check the correct answer
            </span>
            <span
              className={`fs-10 color-dark ${
                choiceText1?.length > 20 ||
                choiceText2?.length > 20 ||
                choiceText3?.length > 20
                  ? `color-red`
                  : `color-light-dark`
              }`}
            >
              ※Up to 20 characters
            </span>
          </label>
          <div className="d-flex align-items-center">
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
              name="choice1"
              value={choiceText1}
              onChange={(e) => {
                setChoiceText1(e.target.value);
                setShowDialog(true);
              }}
              className={`color-dark fs-14 h-45 ${
                error && choiceText1.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className='mb-10'>
            <span className="fs-12 color-dark mb-10">Voice data</span>
                <span
                  className={`fs-10 ml-10 ${
                    checkAudioFileTypeValidation(voiceData1, acceptedAudioFileType)
                      ? "color-light-dark"
                      : "color-red"
                  }`}
                >
                  MP3,M4A
                </span>
                <span
                  className={`fs-10 ml-10 ${
                    (voiceData1 !== null && voiceData1?.size) > allAudioSize
                      ? `color-red`
                      : `color-light-dark`
                  }`}
                >
                  {allAudioSizeText} or less
                </span>
            </div>
          

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData1(file);
                setvoiceData1FileName(file.name);
                setShowDialog(true);
              }}
              fileName={
                voiceData1FileName || fetchedData?.options[0]?.voiceDataFileName
              }
              link={fetchedData?.options[0]?.voiceData}
            />
          </div>
        </div>
      </div>
      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <div className="d-flex align-items-center">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                name="choice"
                value={"choiceText2"}
                checked={checkAnswer(2)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choice2"
              value={choiceText2}
              onChange={(e) => {
                setChoiceText2(e.target.value);
                setShowDialog(true);
              }}
              className={`color-dark fs-14 h-45 ${
                error && choiceText2.length === 0 && "border-red"
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          {" "}
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              {" "}
         <div>
         <span className="fs-12 color-dark mb-10">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData2,
                    acceptedAudioFileType
                  )
                    ? "color-light-dark"
                    : "color-red"
                }`}
              >
                MP3,M4A
              </span>
              <span
                className={`fs-10 ml-10 ${
                  (voiceData2 !== null && voiceData2?.size) > allAudioSize
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                {allAudioSizeText} or less
              </span>
         </div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData2(file);
                setvoiceData2FileName(file.name);
                setShowDialog(true);
              }}
              fileName={
                voiceData2FileName || fetchedData?.options[1]?.voiceDataFileName
              }
              link={fetchedData?.options[1]?.voiceData}
            />
          </div>
        </div>
      </div>
      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <div className="d-flex align-items-center">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                name="choice"
                value={"choiceText3"}
                checked={checkAnswer(3)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choice3"
              value={choiceText3}
              onChange={(e) => {
                setChoiceText3(e.target.value);
                setShowDialog(true);
              }}
              className={`color-dark fs-14 ${
                error && choiceText3.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              {" "}
              <div className='mb-10'><span className="fs-12 color-dark mb-10">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData3,
                    acceptedAudioFileType
                  )
                    ? "color-light-dark"
                    : "color-red"
                }`}
              >
                MP3,M4A
              </span>
              <span
                className={`fs-10 ml-10 ${
                  (voiceData3 !== null && voiceData3?.size) > allAudioSize
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                {" "}
                {allAudioSizeText} or less{" "}
              </span></div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData3(file);
                setvoiceData3FileName(file.name);
                setShowDialog(true);
              }}
              fileName={
                voiceData3FileName || fetchedData?.options[2]?.voiceDataFileName
              }
              link={fetchedData?.options[2]?.voiceData}
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
          modalQuestionImage={
            fetchedData?.imageData ? fetchedData.imageData : image
          }
          questionText={questionText ? questionText : ""}
          choiceA={choiceText1 ? choiceText1 : ""}
          choiceB={choiceText2 ? choiceText2 : ""}
          choiceC={choiceText3 ? choiceText3 : ""}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P1WordSelection;
