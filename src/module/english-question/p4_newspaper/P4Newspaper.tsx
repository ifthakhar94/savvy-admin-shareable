import { useState, useLayoutEffect, useEffect } from "react";
import "../../../assets/style/english-question/newspaper.css";
import "../../../assets/style/english/english.css";
import PreviewModal from "./p4PreviewModal";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import Loader from "../../../Components/loader/Loader";
import {
  allImageSize,
  allAudioSizeText,
  allAudioSize,
  acceptedAudioFileType,
  acceptedImageFileType
} from "../../../assets/static/static";
import {
  imageUploadSignedUrl,
  audioUploadSignedUrl
} from "../service/fileUploadSignedUrl";

import DragnDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import {
  p4NewspaperCreate,
  p4NewspaperUpdate
} from "../service/englishquestion";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P4Newspaper({
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
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const [image, setImage] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  const [dataLoaded, setDataLoaded] = useState(true);
  const [newsPaperTitle, setNewsPaperTitle] = useState("");
  const [newsPaperTextArea, setNewsPaperTextArea] = useState("");
  const [publicationSource, setPublicationSource] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [voiceData1, setVoiceData1] = useState<any>({
    data: null,
    fileName: ""
  });
  const [voiceData2, setVoiceData2] = useState<any>({
    data: null,
    fileName: ""
  });
  const [voiceData3, setVoiceData3] = useState<any>({
    data: null,
    fileName: ""
  });
  const [answer, setAnswer] = useState("");

  const initialValues = {
    choice1: "",
    choice2: "",
    choice3: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const { choice1, choice2, choice3 } = formValues;
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };

  const handleChangeRadionButton = (e: any) => {
    const { name, value } = e.target;
    setAnswer(value);
    //console.log(name, value);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const checkTextValidation = (text: string, characterLimit: number) => {
    return text.length === 0 || text.length > characterLimit;
  };
  const checkImageValidation = (file: any) => {
    if (edit && file && file?.size > allImageSize) {
      return false;
    } else if (!edit && (!file || file?.size > allImageSize)) {
      return false;
    }
    return true;
  };
  const checkAudioValidation = (file: any) => {
    if (file && file?.size > allAudioSize) return false;
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
      return false;
    } else {
      if (
        file &&
        acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return true;
      return false;
    }
  };
  const checkValidation = () => {
    if (checkTextValidation(title, 40)) return false;
    if (checkTextValidation(newsPaperTitle, 50)) return false;
    if (checkTextValidation(newsPaperTextArea, 200)) return false;
    if (checkTextValidation(choice1, 40)) return false;
    if (checkTextValidation(choice2, 40)) return false;
    if (checkTextValidation(choice3, 40)) return false;
    // console.log(checkFileTypeValidation(image.data, acceptedImageFileType));
    // console.log(checkImageValidation(image.data));
    if (
      !checkImageValidation(image.data) ||
      !checkFileTypeValidation(image.data, acceptedImageFileType)
    )
      return false;

    if (checkTextValidation(questionText, 40)) return false;
    if (!edit && answer.length === 0) return false;
    if (
      voiceData1.data &&
      (!checkAudioValidation(voiceData1.data) ||
        !checkAudioFileTypeValidation(voiceData1.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData2.data &&
      (!checkAudioValidation(voiceData2.data) ||
        !checkAudioFileTypeValidation(voiceData2.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData3.data &&
      (!checkAudioValidation(voiceData3.data) ||
        !checkAudioFileTypeValidation(voiceData3.data, acceptedAudioFileType))
    )
      return false;
    if (publicationSource && publicationSource.length > 40) return false;
    return true;
  };
  const handleUploadFile = async () => {
    let [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
      imageUploadSignedUrl(image.data, image.data.type),
      voiceData1?.data &&
        audioUploadSignedUrl(voiceData1?.data, voiceData1?.data.type),
      voiceData2?.data &&
        audioUploadSignedUrl(voiceData2?.data, voiceData2?.data.type),
      voiceData3?.data &&
        audioUploadSignedUrl(voiceData3?.data, voiceData3?.data.type)
    ]);
    return [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3];
  };
  const createNewEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response = await p4NewspaperCreate(
        title,
        format,
        getStageSK(stage),
        sendData,
        newsPaperTitle,
        newsPaperTextArea,
        publicationSource,
        questionText,
        formValues.choice1,
        formValues.choice2,
        formValues.choice3,
        urls[0],
        image.fileName,
        urls[1],
        voiceData1.fileName,
        urls[2],
        voiceData2.fileName,
        urls[3],
        voiceData3.fileName,
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
      ? "choice1"
      : fetchedData?.options[1]?.answer
      ? "choice2"
      : "choice3";
  };
  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
        image.data
          ? imageUploadSignedUrl(image.data, image.data.type)
          : fetchedData?.imageData,
        voiceData1?.data
          ? audioUploadSignedUrl(voiceData1?.data, voiceData1?.data.type)
          : fetchedData?.options[0]?.voiceData,
        voiceData2?.data
          ? audioUploadSignedUrl(voiceData2?.data, voiceData2?.data.type)
          : fetchedData?.options[1]?.voiceData,
        voiceData3?.data
          ? audioUploadSignedUrl(voiceData3?.data, voiceData3?.data.type)
          : fetchedData?.options[2]?.voiceData
      ]);
      const response = await p4NewspaperUpdate(
        fetchedData?.SK,
        title,
        fetchedData?.questionFormat,
        getStageSK(stage),
        sendData,
        newsPaperTitle,
        newsPaperTextArea,
        publicationSource,
        questionText,
        choice1 || fetchedData?.options[0]?.title,
        choice2 || fetchedData?.options[1]?.title,
        choice3 || fetchedData?.options[2]?.title,
        imageUrl,
        image.fileName || fetchedData?.imageDataFileName,
        voiceUrl1,
        voiceData1?.fileName || fetchedData?.options[0]?.voiceDataFileName,
        voiceUrl2,
        voiceData2?.fileName || fetchedData?.options[1]?.voiceDataFileName,
        voiceUrl3,
        voiceData3?.fileName || fetchedData?.options[2]?.voiceDataFileName,
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
    //sendData && console.log(sendData);
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          // console.log("update");
          updateEnglishQuestion();
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
      setNewsPaperTextArea(fetchedData?.newsPaperText);
      setNewsPaperTitle(fetchedData?.newsPaperTitle);
      setPublicationSource(fetchedData?.publicationSource || "");
      setFormValues({
        choice1: fetchedData?.options[0]?.title,
        choice2: fetchedData?.options[1]?.title,
        choice3: fetchedData?.options[2]?.title
      });
      setQuestionText(fetchedData?.questionText);
      setAnswer(getAnswer());
    }
  }, [fetchedData]);
  const checkAnswer = (id: number) => {
    if (answer) {
      return answer === `choice${id}`;
    }
    return fetchedData?.options[id - 1]?.answer;
  };
  return (
    <div className="">
      <NewDragDrop
        title="Image data"
        setImageFile={(file: any) => {
          setImage({ ...image, data: file, fileName: file.name });
          setShowDialog(true);
        }}
        link={fetchedData?.imageData}
        fileName={image.fileName || fetchedData?.imageDataFileName}
        error={error}
      />

      <label>
        <span className="fs-12 color-dark">Newspaper title</span>{" "}
        <span className="asterisk">&#42;</span>
        <span
          className={`fs-10 ml-20 ${
            newsPaperTitle?.length > 50 ? "color-red" : "color-light-dark"
          }`}
        >
          ※Up to 50 characters
        </span>
      </label>
      <input
        className={`${error && newsPaperTitle?.length === 0 && `border-red`}`}
        type="text"
        placeholder="Enter title"
        value={newsPaperTitle}
        onChange={(e) => {
          setNewsPaperTitle(e.target.value);
          setShowDialog(true);
        }}
      />

      {/* newspaper text area */}
      <div className="newspaper__textarea">
        <div className="newspaper__textarea--label">
          <span className="fs-12 color-dark">Newspaper text</span>{" "}
          <span className="asterisk">&#42;</span>
          <span
            className={`fs-10 ml-20 color-red ${
              newsPaperTextArea?.length > 200 ? "color-red" : "color-light-dark"
            }`}
          >
            ※Up to 200 characters
          </span>
        </div>
        <textarea
          className={`newspaper__textarea--input p-10 ${
            error && newsPaperTextArea?.length === 0 && `border-red`
          }`}
          placeholder="Enter text"
          value={newsPaperTextArea}
          onChange={(e) => {
            setNewsPaperTextArea(e.target.value);
            setShowDialog(true);
          }}
        ></textarea>
      </div>

      {/* newspaper publication source */}

      <div className="newspaper_publication_source">
        <div className="newspaper_publication_source--label">
          <span className="fs-12 color-dark">Publication source</span>{" "}
          <span
            className={`fs-10 ml-20 ${
              publicationSource.length > 40 ? "color-red" : "color-light-dark"
            }`}
          >
            ※Up to 40 characters
          </span>
        </div>
        <input
          type="text"
          placeholder="Enter text"
          value={publicationSource}
          onChange={(e) => {
            setPublicationSource(e.target.value);
            setShowDialog(true);
          }}
        />
      </div>

      {/* question text */}

      <div className="question_text">
        <div className="question_text--label">
          <span className="fs-12 color-dark">Question text</span>{" "}
          <span className="asterisk">&#42;</span>
          <span
            className={`fs-10 ml-20 ${
              questionText?.length > 40 ? "color-red" : "color-light-dark"
            }`}
          >
            ※Up to 40 characters
          </span>
        </div>
        <input
          className={`${error && questionText?.length === 0 && `border-red`}`}
          type="text"
          placeholder="Enter text"
          value={questionText}
          onChange={(e) => {
            setQuestionText(e.target.value);
            setShowDialog(true);
          }}
        />
        <div
          className={`color-red fs-10 mb-1 ${
            error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
          }`}
        >
          Please note that some fields have not been filled in.
        </div>
      </div>

      {/* choice section start */}
      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <label className="mb-2">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ms-3 ${
                error && !answer ? "color-red" : "color-light-dark"
              }`}
            >
              ※Please check the correct answer
            </span>
            <span
              className={`fs-10 ${
                choice1?.length > 40 ||
                choice2?.length > 40 ||
                choice3?.length > 40
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              ※Up to 40 characters
            </span>
          </label>
          <div className="d-flex align-items-center">
            <label className="radioBtn me-2 drag-drop-radio-btn-container ">
              <input
                type="radio"
                className="radioBtn me-2"
                onChange={handleChangeRadionButton}
                name="choice"
                value={"choice1"}
                checked={checkAnswer(1)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              value={choice1}
              name="choice1"
              onChange={handleChange}
              className={`color-dark fs-14 ${
                error && choice1.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
          <div className='mb-10'>

            <span className="fs-12 color-dark">Voice data</span>

            <span
              className={`fs-10 ml-10 ${
                checkAudioFileTypeValidation(
                  voiceData1.data,
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
                (voiceData1?.data !== null && voiceData1?.data?.size) >
                allAudioSize
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              {allAudioSizeText} or less
            </span>
</div>
            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData1({ data: file, fileName: file.name });
                setShowDialog(true);
              }}
              fileName={
                voiceData1?.fileName ||
                fetchedData?.options[0]?.voiceDataFileName
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
                value={"choice2"}
                checked={checkAnswer(2)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              value={choice2}
              name="choice2"
              onChange={handleChange}
              className={`color-dark fs-14 ${
                error && choice2.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
            <div className='mb-10'>
              <span className="fs-12 color-dark">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData2.data,
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
                  (voiceData2?.data !== null && voiceData2?.data?.size) >
                  allAudioSize
                    ? `color-red`
                    : `color-light-dark`
                }`}
              >
                {allAudioSizeText} or less
              </span>
              </div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData2({ data: file, fileName: file.name });
                setShowDialog(true);
              }}
              fileName={
                voiceData2?.fileName ||
                fetchedData?.options[1]?.voiceDataFileName
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
                value={"choice3"}
                checked={checkAnswer(3)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              value={choice3}
              name="choice3"
              onChange={handleChange}
              className={`color-dark fs-14 ${
                error && choice3.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
            <div className='mb-10'>
              <span className="fs-12 color-dark">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData3.data,
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
                  (voiceData3.data !== null && voiceData3.data?.size) >
                  allAudioSize
                    ? `color-red`
                    : `color-light-dark`
                }`}
              >
                {allAudioSizeText} or less
              </span>
              </div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData3({ data: file, fileName: file.name });
                setShowDialog(true);
              }}
              fileName={
                voiceData3?.fileName ||
                fetchedData?.options[2]?.voiceDataFileName
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
            fetchedData?.imageData ? fetchedData.imageData : image?.data
          }
          newspaperTitle={newsPaperTitle ? newsPaperTitle : ""}
          newspaperDesc={newsPaperTextArea ? newsPaperTextArea : ""}
          questionText={questionText ? questionText : ""}
          newsSource={publicationSource ? publicationSource : ""}
          choiceA={choice1 ? choice1 : ""}
          choiceB={choice2 ? choice2 : ""}
          choiceC={choice3 ? choice3 : ""}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P4Newspaper;
