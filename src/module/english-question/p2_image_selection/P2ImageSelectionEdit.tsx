import { useState, useEffect } from "react";
import { p2ImageSelectionUpdate } from "../service/englishquestion";
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
import { errorContents } from "../../../Components/modal/modalContents";
import { getQuestionPropTypes } from "../../../Services/type/type";

function P2ImageSelectionEdit({
  stageList,
  sendData,
  closeCallApi,
  handleCloseApiCallDone,
  title,
  stage,
  format,
  fetchedData,
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
  const [sk, setSk] = useState("");
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
    let [newImagedataUrl1, newImagedataUrl2, newImagedataUrl3] =
      await Promise.all([
        typeof imageData1 !== "string" && imageData1 !== undefined
          ? await imageUploadSignedUrl(imageData1, imageData1.type)
          : imageData1,
        typeof imageData2 !== "string" && imageData2 !== undefined
          ? await imageUploadSignedUrl(imageData2, imageData2.type)
          : imageData2,
        typeof imageData3 !== "string" && imageData3 !== undefined
          ? await imageUploadSignedUrl(imageData3, imageData3.type)
          : imageData3
      ]);
    return [newImagedataUrl1, newImagedataUrl2, newImagedataUrl3];
  };

  const updateP2ImageData = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response = await p2ImageSelectionUpdate(
        sk,
        title,
        questionText,
        fetchedData?.questionFormat,
        sendData,
        getStageSK(stage),
        urls[0],
        urls[1],
        urls[2],
        imageFileName1,
        imageFileName2,
        imageFileName3,
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (err) {
      console.log(true, err);
      setServer_error(true);
    }
  };
  const checkFileType = () => {
    if (
      typeof imageData1 !== "string" &&
      !acceptedImageFileType.includes(
        imageData1?.type?.slice(
          imageData1?.type?.lastIndexOf("/") + 1,
          imageData1?.type?.length
        )
      )
    )
      return false;
    if (
      typeof imageData2 !== "string" &&
      !acceptedImageFileType.includes(
        imageData2?.type?.slice(
          imageData2?.type?.lastIndexOf("/") + 1,
          imageData2?.type?.length
        )
      )
    )
      return false;
    if (
      typeof imageData3 !== "string" &&
      !acceptedImageFileType.includes(
        imageData3?.type?.slice(
          imageData3?.type?.lastIndexOf("/") + 1,
          imageData3?.type?.length
        )
      )
    )
      return false;
    return true;
  };
  const checkFileSize = () => {
    if (typeof imageData1 !== "string" && imageData1?.size > allImageSize)
      return false;
    if (typeof imageData2 !== "string" && imageData2?.size > allImageSize)
      return false;
    if (typeof imageData3 !== "string" && imageData3?.size > allImageSize)
      return false;
    return true;
  };
  const checkValidation = () => {
    if (title.length === 0 || title.length > 40) return false;
    if (questionText.length === 0 || questionText.length > 15) return false;

    if (!checkFileType()) return false;
    if (!checkFileSize()) return false;
    if (answer.length === 0) return false;

    return true;
  };

  useEffect(() => {
    try {
      if (sendData !== "") {
        if (checkValidation()) {
          handleError(false);
          updateP2ImageData();
        } else {
          handleError(true);
        }
        closeCallApi();
      }
    } catch (error) {
      console.log("catch error: ", error);
    }
  });

  useEffect(() => {
    setSk(fetchedData?.SK);
    setQuestionText(fetchedData?.questionText);
    setImageData1(fetchedData?.options[0]?.imageData);
    setImageFileName1(fetchedData?.options[0]?.imageDataFileName);
    setImageData2(fetchedData?.options[1]?.imageData);
    setImageFileName2(fetchedData?.options[1]?.imageDataFileName);
    setImageData3(fetchedData?.options[2]?.imageData);
    setImageFileName3(fetchedData?.options[2]?.imageDataFileName);
    if (fetchedData?.options[0]?.answer === true) {
      setAnswer("radio1");
      // console.log('1');
    }
    if (fetchedData?.options[1]?.answer === true) {
      setAnswer("radio2");
      // console.log('2',answer);
    }
    if (fetchedData?.options[2]?.answer === true) {
      setAnswer("radio3");
      // console.log('3');
    }
  }, [fetchedData]);

  return (
    <div>
      <div className="mb-2">
        <div className="mb-1">
          <span className="fs-12 color-dark">Question Text</span>
          <span className="asterisk">&#42;</span>
          <span
            className={`fs-10 ml-20 ${
              questionText?.length > 15 && "color-red"
            }`}
          >
            ※Upto 15 characters
          </span>
        </div>
        <input
          type="text"
          placeholder="Enter Text"
          className={`fs-14 ${
            questionText?.length === 0 || questionText?.length > 15
              ? `border-red`
              : ""
          }`}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
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
        <span className={`fs-10 ml-5 ${!checkFileType() && "color-red"}`}>
          ※PNG,JPEG
        </span>
        <span className={`fs-10 ml-10 ${!checkFileSize() && "color-red"}`}>
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
        link={imageData1}
        fileName={imageFileName1}
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
        link={imageData2}
        fileName={imageFileName2}
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
        link={imageData3}
        fileName={imageFileName3}
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
          modalHeader={errorContents.modalHead}
          modalText={errorContents.modalText}
          secondBtnText={errorContents.firstBtnText}
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

export default P2ImageSelectionEdit;