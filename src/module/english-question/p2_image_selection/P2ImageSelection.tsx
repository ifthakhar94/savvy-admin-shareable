import { useState, useEffect } from "react";
import { p2ImageSelectionCreate } from "../service/englishquestion";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDropRadio";
import ModalBox from "../../../Components/modal/ModalBox";
import Loader from "../../../Components/loader/Loader";
import P2PreviewModal from "./P2PreviewModal";
import { imageUploadSignedUrl } from "../service/fileUploadSignedUrl";
import {
  allImageSize,
  allImageSizeText,
  acceptedImageFileType
} from "../../../assets/static/static";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P2ImageSelection({
  stageList,
  sendData,
  closeCallApi,
  handleCloseApiCallDone,
  title,
  stage,
  format,
  preview,
  handlePreviewClose,
  error,
  handleError,
  setShowDialog
}: getQuestionPropTypes) {
  const [imageData1, setImageData1] = useState<any>();
  const [imageFileName1, setImageFileName1] = useState("");
  const [imageData2, setImageData2] = useState<any>();
  const [imageFileName2, setImageFileName2] = useState("");
  const [imageData3, setImageData3] = useState<any>();
  const [imageFileName3, setImageFileName3] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);
  const [answer, setAnswer] = useState("");
  const [server_error, setServer_error] = useState(false);
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const handleChangeRadionButton = (e: any) => {
    setAnswer(e.target.value);
  };
  const handleCloseServerErrorModal = () => {
    setServer_error(false);
  };
  const handleUploadFile = async () => {
    let urls = await Promise.all([
      imageUploadSignedUrl(imageData1, imageData1.type),
      imageUploadSignedUrl(imageData2, imageData2.type),
      imageUploadSignedUrl(imageData3, imageData3.type)
    ]);
    return urls;
  };

  const createNewEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);

      const urls: any = await handleUploadFile();
      const response = await p2ImageSelectionCreate(
        title,
        questionText,
        format,
        sendData,
        getStageSK(stage),
        imageFileName1,
        imageFileName2,
        imageFileName3,
        urls[0],
        urls[1],
        urls[2],
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (err) {
      console.log(err);
      setServer_error(true);
    }
  };
  const checkImageFileType = (file: any) => {
    if (
      acceptedImageFileType.includes(
        file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
      )
    )
      return true;
    return false;
  };
  const checkAllImageFileType = () => {
    if (imageData1 && !checkImageFileType(imageData1)) return false;
    if (imageData2 && !checkImageFileType(imageData2)) return false;
    if (imageData3 && !checkImageFileType(imageData3)) return false;
    return true;
  };
  const checkAllImageSize = () => {
    if (
      imageData1?.size > allImageSize ||
      imageData2?.size > allImageSize ||
      imageData3?.size > allImageSize
    )
      return false;
    return true;
  };
  const checkValidation = () => {
    if (title.length === 0 || title.length > 40) return false;
    if (
      !imageData1 ||
      (imageData1 && imageData1.size > allImageSize) ||
      !acceptedImageFileType.includes(
        imageData1?.type.slice(
          imageData1?.type.lastIndexOf("/") + 1,
          imageData1?.type.length
        )
      )
    )
      return false;
    if (
      !imageData2 ||
      (imageData2 && imageData2.size > allImageSize) ||
      !acceptedImageFileType.includes(
        imageData2?.type.slice(
          imageData2?.type.lastIndexOf("/") + 1,
          imageData2?.type.length
        )
      )
    )
      return false;
    if (
      !imageData3 ||
      (imageData3 && imageData3.size > allImageSize) ||
      !acceptedImageFileType.includes(
        imageData3?.type.slice(
          imageData3?.type.lastIndexOf("/") + 1,
          imageData3?.type.length
        )
      )
    )
      return false;
    if (questionText.length === 0 || questionText.length > 20) return false;
    if (answer.length === 0) return false;

    return true;
  };

  useEffect(() => {
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        createNewEnglishQuestion();
      } else {
        handleError(true);
      }
      closeCallApi();
    }
  });
  return (
    <div>
      <div className="mb-2">
        <div className="mb-1">
          <span className="fs-12 color-dark">Question Text</span>
          <span className="asterisk">&#42;</span>
          <span
            className={`fs-10 ml-20 ${
              questionText?.length > 15 ? "color-red" : "color-light-dark"
            }`}
          >
            ※Upto 15 characters
          </span>
        </div>
        <input
          type="text"
          placeholder="Enter Text"
          className={`fs-14 ${
            (error && questionText?.length === 0) ||
            (error && questionText?.length > 15)
              ? `border-red`
              : ""
          }`}
          value={questionText}
          onChange={(e) => {
            setQuestionText(e.target.value);
            setShowDialog(true);
          }}
          max={20}
        />
      </div>
      <div
        className={`color-red fs-10 mb-1 ${
          error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
        }`}
      >
        Please note that some fields have not been filled in.
      </div>
      <div className="mb-1">
        <span className="fs-12 color-dark">Choices</span>
        <span className="asterisk">&#42;</span>
        <span
          className={`fs-10 ml-10 ${
            error && answer.length === 0 && "color-red"
          }`}
        >
          ※Please check the correct answer
        </span>
        <span
          className={`fs-10 ml-5 ${!checkAllImageFileType() && "color-red"}`}
        >
          ※PNG,JPEG
        </span>
        <span className={`fs-10 ml-10 ${!checkAllImageSize() && "color-red"}`}>
          {allImageSizeText} or less
        </span>
      </div>
      <NewDragDrop
        radioBtn={true}
        setImageFile={(file: any) => {
          setImageData1(file);
          setImageFileName1(file.name);
          setShowDialog(true);
        }}
        handleChangeRadionButton={handleChangeRadionButton}
        radioValue="radio1"
        answer={answer}
        error={error}
      />
      <NewDragDrop
        radioBtn={true}
        setImageFile={(file: any) => {
          setImageData2(file);
          setImageFileName2(file.name);
          setShowDialog(true);
        }}
        handleChangeRadionButton={handleChangeRadionButton}
        radioValue="radio2"
        answer={answer}
        error={error}
      />
      <NewDragDrop
        radioBtn={true}
        setImageFile={(file: any) => {
          setImageData3(file);
          setImageFileName3(file.name);
          setShowDialog(true);
        }}
        handleChangeRadionButton={handleChangeRadionButton}
        radioValue="radio3"
        answer={answer}
        error={error}
      />

      {server_error && (
        <ModalBox
          show={server_error}
          handleClose={() => {
            handleCloseServerErrorModal();
          }}
          modalHeader="Error"
          modalText={`Opps, something went worng error. Please try again later.`}
          secondBtnText="Ok"
        />
      )}
      {!dataLoaded && <Loader />}
      {preview && (
        <P2PreviewModal
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          questionText={questionText}
          choiceA={imageData1}
          choiceB={imageData2}
          choiceC={imageData3}
          stageBackground={getStageBackgroundImage(stage)}
        />
      )}
    </div>
  );
}

export default P2ImageSelection;
