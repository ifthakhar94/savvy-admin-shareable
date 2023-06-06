import React, { useState, useEffect } from "react";
import DragDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDropRadio";
import P8PreviewModal from "./P8PreviewModal";
import Loader from "../../../Components/loader/Loader";
import {
  audioUploadSignedUrl,
  imageUploadSignedUrl
} from "../service/fileUploadSignedUrl";
import {
  p8ImageListeningCreate,
  p8ImageListeningUpdate
} from "../service/englishquestion";
import {
  allImageSize,
  allImageSizeText,
  allAudioSizeText,
  allAudioSize,
  acceptedAudioFileType,
  acceptedImageFileType
} from "../../../assets/static/static";

function P8ImageListening({
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
}: any) {
  // console.log(fetchedData);

  const [voiceData, setVoiceData] = useState<any>();
  const [voiceDataFileName, setVoiceDataFileName] = useState("");
  const [imageData1, setImageData1] = useState<any>();
  const [imageFileName1, setImageFileName1] = useState("");
  const [imageData2, setImageData2] = useState<any>();
  const [imageFileName2, setImageFileName2] = useState("");
  const [imageData3, setImageData3] = useState<any>();
  const [imageFileName3, setImageFileName3] = useState("");
  const [answer, setAnswer] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);
  const getStageSK = (stageTitle: number) => {
    return stageList[stageTitle - 1]?.SK;
  };
  // const handlePreviewClose = () => setPreview(false);
  //const handlePreviewShow = () => setPreview(true);
  const getStageBackgroundImage = (stageTitle: number) => {
    return stageList[stageTitle - 1]?.imageData;
  };

  const handleUploadFile = async () => {
    let [voiceDataUrl, imageDataUrl1, imageDataUrl2, imageDataUrl3]: any =
      await Promise.all([
        audioUploadSignedUrl(voiceData, voiceData.type),
        imageUploadSignedUrl(imageData1, imageData1.type),
        imageUploadSignedUrl(imageData2, imageData2.type),
        imageUploadSignedUrl(imageData3, imageData3.type),

        voiceData && audioUploadSignedUrl(voiceData, voiceData.type),
        imageUploadSignedUrl(imageData1, imageData1.type),
        imageUploadSignedUrl(imageData2, imageData2.type),
        imageUploadSignedUrl(imageData3, imageData3.type)
      ]);
    return [voiceDataUrl, imageDataUrl1, imageDataUrl2, imageDataUrl3];
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

  const checkImageSizeValidation = (file: any, limitSize: number) => {
    if (edit && file && file?.size > limitSize) {
      return false;
    } else if (!edit && (!file || file?.size > limitSize)) {
      return false;
    }
    return true;
  };
  const checkAllImageSizeValidation = () => {
    if (imageData1 && !checkImageSizeValidation(imageData1, allImageSize))
      return false;
    if (imageData2 && !checkImageSizeValidation(imageData2, allImageSize))
      return false;
    if (imageData3 && !checkImageSizeValidation(imageData3, allImageSize))
      return false;
    return true;
  };
  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (edit) {
      if (
        file &&
        acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return true;
      if (!file) return true;
      return false;
    } else {
      if (
        file &&
        acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return true;
      if (
        file &&
        !acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      )
        return false;
      return true;
    }
  };
  const checkAllImageTypeValidation = () => {
    // console.log(!checkFileTypeValidation(imageData1, acceptedImageFileType));
    if (
      imageData1 &&
      !checkFileTypeValidation(imageData1, acceptedImageFileType)
    )
      return false;
    if (
      imageData2 &&
      !checkFileTypeValidation(imageData2, acceptedImageFileType)
    )
      return false;
    if (
      imageData3 &&
      !checkFileTypeValidation(imageData3, acceptedImageFileType)
    )
      return false;
    return true;
  };

  const checkTextValidation = (text: string, characterLimit: number) => {
    return text.length === 0 || text.length > characterLimit;
  };
  const checkValidation = () => {
    if (checkTextValidation(title, 40)) return false;
    if (
      !checkAudioFileValidation(voiceData, allAudioSize) ||
      !checkAudioFileTypeValidation(voiceData, acceptedAudioFileType)
    )
      return false;
    if (!checkAllImageSizeValidation()) return false; // image size validation function
    if (!checkAllImageTypeValidation()) return false; // image type validation function
    if (!edit && answer.length === 0) return false;
    return true;
  };
  const createP8ImageListening = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response = await p8ImageListeningCreate(
        title,
        urls[0],
        voiceDataFileName,
        format,
        sendData,
        getStageSK(stage),
        imageFileName1,
        imageFileName2,
        imageFileName3,
        urls[1],
        urls[2],
        urls[3],
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeRadionButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };
  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var [voiceUrl, imageUrl1, imageUrl2, imageUrl3] = await Promise.all([
        voiceData
          ? audioUploadSignedUrl(voiceData, voiceData.type)
          : fetchedData?.voiceData,
        imageData1
          ? imageUploadSignedUrl(imageData1, imageData1.type)
          : fetchedData?.options[0]?.imageData,
        imageData2
          ? imageUploadSignedUrl(imageData2, imageData2.type)
          : fetchedData?.options[1]?.imageData,
        imageData3
          ? imageUploadSignedUrl(imageData3, imageData3.type)
          : fetchedData?.options[2]?.imageData
      ]);
      const response = await p8ImageListeningUpdate(
        fetchedData?.SK,
        title,
        voiceUrl,
        voiceDataFileName,
        fetchedData?.questionFormat,
        sendData,
        getStageSK(stage),
        imageFileName1 || fetchedData?.options[0]?.imageDataFileName,
        imageFileName2 || fetchedData?.options[1]?.imageDataFileName,
        imageFileName3 || fetchedData?.options[2]?.imageDataFileName,
        imageUrl1,
        imageUrl2,
        imageUrl3,
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
  useEffect(() => {
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          // console.log("Update");
          updateEnglishQuestion();
        } else {
          //console.log("Create");
          createP8ImageListening();
        }
      } else {
        handleError(true);
      }

      closeCallApi();
    }
  }, [sendData]);
  useEffect(() => {
    if (fetchedData?.options[0]?.answer === true) {
      setAnswer("radio1");
    }
    if (fetchedData?.options[1]?.answer === true) {
      setAnswer("radio2");
    }
    if (fetchedData?.options[2]?.answer === true) {
      setAnswer("radio3");
    }
  }, [fetchedData]);
  return (
    <div>
      <div className="mb-2">
        <label className="mb-2">
          <span className="fs-12 color-dark">Voice data</span>
          <span
            className={`fs-10 ml-10 ${
              checkAudioFileTypeValidation(voiceData, acceptedAudioFileType)
                ? "color-light-dark"
                : "color-red"
            }`}
          >
            MP3,M4A
          </span>
          <span
            className={`fs-10 ml-10 ${
              (voiceData !== null && voiceData?.size) > allAudioSize
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
              setVoiceData(file);
              setVoiceDataFileName(file.name);
              setShowDialog(true);
            }}
            fileName={voiceDataFileName || fetchedData?.voiceDataFileName}
            error={error}
            link={fetchedData?.voiceData}
          />
        </div>
        <div
          className={`color-red fs-10 mb-1 ${
            error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
          }`}
        >
          Please note that some fields have not been filled in.
        </div>
      </div>
      <div className="mcq_file_part--choice">
        <div className="width-100-pt">
          <label className="mb-2">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ms-3 ${
                error && !answer ? "color-red" : "color-light-dark"
              }`}
            >
              ※Please check the correct answer.
            </span>

            <span
              className={`fs-10 ml-10 ${
                !checkAllImageTypeValidation()
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              ※PNG,JPEG
            </span>

            <span
              className={`fs-10 ml-10 ${
                !checkAllImageSizeValidation()
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              {allImageSizeText} or less
            </span>
          </label>
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
            link={fetchedData?.options[0]?.imageData}
            fileName={
              imageFileName1 || fetchedData?.options[0]?.imageDataFileName
            }
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
            link={fetchedData?.options[1]?.imageData}
            fileName={
              imageFileName2 || fetchedData?.options[1]?.imageDataFileName
            }
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
            link={fetchedData?.options[2]?.imageData}
            fileName={
              imageFileName3 || fetchedData?.options[2]?.imageDataFileName
            }
          />
        </div>
      </div>
      {preview && (
        <P8PreviewModal
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          choiceA={imageData1 || fetchedData?.options[0]?.imageData}
          choiceB={imageData2 || fetchedData?.options[1]?.imageData}
          choiceC={imageData3 || fetchedData?.options[2]?.imageData}
          stageBackground={getStageBackgroundImage(stage)}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P8ImageListening;
