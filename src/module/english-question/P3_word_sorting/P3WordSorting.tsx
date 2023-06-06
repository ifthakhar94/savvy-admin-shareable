import { useState, useEffect, useLayoutEffect } from "react";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import P3PreviewModal from "./P3PreviewModal";
import {
  imageUploadSignedUrl,
  audioUploadSignedUrl
} from "../service/fileUploadSignedUrl";
import {
  allAudioSizeText,
  allAudioSize,
  allImageSize,
  acceptedImageFileType,
  acceptedAudioFileType
} from "../../../assets/static/static";
import {
  p3WordSortingCreate,
  p3WordSortingUpdate
} from "../service/englishquestion";
import Loader from "../../../Components/loader/Loader";
import { getQuestionPropTypes } from "../../../Services/type/type";
import DragnDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";

function P3WordSorting({
  fetchedData,
  edit,
  preview,
  handlePreviewClose,
  stageList,
  sendData,
  closeCallApi,
  title,
  stage,
  format,
  handleCloseApiCallDone,
  error,
  handleError,
  setShowDialog
}: getQuestionPropTypes) {
  //  console.log(fetchedData);
  const [image, setImage] = useState<any>();
  const [imageFileName, setImageFileName] = useState("");
  const [questionTextWord, setQuestionTextWord] = useState({
    wordOne: "",
    wordTwo: "",
    wordThree: "",
    wordFour: "",
    wordFive: "",
    wordSix: "",
    wordSeven: "",
    wordEight: ""
  });

  const [word, setWord] = useState({ choice1: "", choice2: "", choice3: "" });
  const [voiceData1, setvoiceData1] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  const [voiceData2, setvoiceData2] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  const [voiceData3, setvoiceData3] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  const [dataLoaded, setDataLoaded] = useState(true);
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const handleUploadFile = async () => {
    let [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
      imageUploadSignedUrl(image, image.type),
      voiceData1?.data &&
        audioUploadSignedUrl(voiceData1?.data, voiceData1?.data.type),
      voiceData2?.data &&
        audioUploadSignedUrl(voiceData2?.data, voiceData2?.data.type),
      voiceData3?.data &&
        audioUploadSignedUrl(voiceData3?.data, voiceData3?.data.type)
    ]);
    return [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3];
  };

  // const checkAudioFileValidation = (file: any) => {
  //   if (file && file?.size > allAudioSize) return false;
  //   return true;
  // };

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
          file?.type?.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )
      ) {
        return true;
      } else return false;
    }
    return true;
  };

  const checkFileValidation = (file: any, limitSize: number) => {
    if (edit && file && file?.size > limitSize) {
      return false;
    } else if (!edit && (!file || file?.size > limitSize)) {
      return false;
    }
    return true;
  };

  const checkMandatoryTextValidation = (
    text: string,
    characterLimit: number
  ) => {
    return text?.length === 0 || text?.length > characterLimit;
  };
  const checkOptionalTextValidation = (
    text: string,
    characterLimit: number
  ) => {
    return text?.length > characterLimit;
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
  const checkP3Validation = (number: string) => {
    let counter = 0;
    if (questionTextWord.wordOne === number) counter++;
    if (questionTextWord.wordTwo === number) counter++;
    if (questionTextWord.wordThree === number) counter++;
    if (questionTextWord.wordFour === number) counter++;
    if (questionTextWord.wordFive === number) counter++;
    if (questionTextWord.wordSix === number) counter++;
    if (questionTextWord.wordSeven === number) counter++;
    if (questionTextWord.wordEight === number) counter++;
    if (number !== '3' && counter === 1)   {  
      return true;
  }
   // console.log(number, counter)
    if(number === '3') {
      if (!word.choice3 && counter === 0 ) return true;
      else if ( word.choice3 && counter === 1) return true;
      return false;
    }
    
   return false;
  }
  const checkWordChoiceNumber = () => {
    let one = parseInt(questionTextWord.wordOne)
    let two = parseInt(questionTextWord.wordTwo)
    let three = parseInt(questionTextWord.wordThree)
    let four = parseInt(questionTextWord.wordFour)
    let five = parseInt(questionTextWord.wordFive)
    let six = parseInt(questionTextWord.wordSix)
    let seven = parseInt(questionTextWord.wordSeven)
    let eight = parseInt(questionTextWord.wordEight)

    if (one !== 1 && one !== 2 && one !== 3) return false;
    if (two !== 1 && two !== 2 && two !== 3) return false;
    if (three && three !== 1 && three !== 2 && three !== 3) return false;
    if (four && four !== 1 && four !== 2 && four !== 3) return false;
    if (five && five !== 1 && five !== 2 && five !== 3) return false;
    if (six && six !== 1 && six !== 2 && six !== 3) return false;
    if (seven && seven !== 1 && seven !== 2 && seven !== 3) return false;
    if (eight && eight !== 1 && eight !== 2 && eight !== 3) return false;

    return true;
  }
  const isP3Validated = () => {
    if (!checkP3Validation('1') || !checkP3Validation('2')) return false;
   // console.log(word.choice3)
    if (!checkP3Validation('3')) {
      //console.log(word.choice3, checkP3Validation('3'))
      return false;
    }
    if (!checkWordChoiceNumber()) {
      console.log('condition failed');
      return false;
    }
    return true;
  }
  const checkValidation = () => {
    if (checkMandatoryTextValidation(title, 40)) return false;
    if (checkMandatoryTextValidation(word.choice1, 20)) return false;
    if (checkMandatoryTextValidation(word.choice2, 20)) return false;
    if (checkOptionalTextValidation(word.choice3, 20)) return false;
    if (checkMandatoryTextValidation(questionTextWord.wordOne, 20))
      return false;
    if (checkMandatoryTextValidation(questionTextWord.wordTwo, 20))
      return false;
    if (checkOptionalTextValidation(questionTextWord.wordThree, 20))
      return false;
    if (checkOptionalTextValidation(questionTextWord.wordFour, 20))
      return false;
    if (checkOptionalTextValidation(questionTextWord.wordFive, 20))
      return false;
    if (checkOptionalTextValidation(questionTextWord.wordSix, 20)) return false;
    if (checkOptionalTextValidation(questionTextWord.wordSeven, 20))
      return false;
    if (checkOptionalTextValidation(questionTextWord.wordEight, 20))
      return false;
    if (!checkFileValidation(image, allImageSize)) return false;
    if (!checkFileTypeValidation(image, acceptedImageFileType)) return false;
    if (
      voiceData1?.data &&
      (!checkAudioFileValidation(voiceData1?.data, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData1?.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData2?.data &&
      (!checkAudioFileValidation(voiceData2?.data, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData2?.data, acceptedAudioFileType))
    )
      return false;

    if (
      voiceData3?.data &&
      (!checkAudioFileValidation(voiceData3?.data, allAudioSize) ||
        !checkAudioFileTypeValidation(voiceData3?.data, acceptedAudioFileType))
    ) {
      return false;
    }
    // console.log(!isP3Validated())
    if (!isP3Validated()) return false;
   
    return true;
  };

  useEffect(() => {
    // sendData ? console.log(sendData) : console.log("not clicked");
    if (edit) {
      setQuestionTextWord({
        wordOne: fetchedData?.wordQuestionText[0]?.questionText,
        wordTwo: fetchedData?.wordQuestionText[1]?.questionText || "",
        wordThree: fetchedData?.wordQuestionText[2]?.questionText || "",
        wordFour: fetchedData?.wordQuestionText[3]?.questionText || "",
        wordFive: fetchedData?.wordQuestionText[4]?.questionText || "",
        wordSix: fetchedData?.wordQuestionText[5]?.questionText || "",
        wordSeven: fetchedData?.wordQuestionText[6]?.questionText || "",
        wordEight: fetchedData?.wordQuestionText[7]?.questionText || ""
      });
      setWord({
        choice1: fetchedData?.options[0]?.title,
        choice2: fetchedData?.options[1]?.title,
        choice3: fetchedData?.options[2]?.title
      });
    }
  }, [fetchedData]);
  const createNewEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      const urls: any = await handleUploadFile();
      const response: any = await p3WordSortingCreate(
        title,
        format,
        getStageSK(stage),
        sendData,
        urls[0],
        imageFileName,
        questionTextWord.wordOne?.trim(),
        questionTextWord.wordTwo?.trim(),
        questionTextWord.wordThree?.trim(),
        questionTextWord.wordFour?.trim(),
        questionTextWord.wordFive?.trim(),
        questionTextWord.wordSix?.trim(),
        questionTextWord.wordSeven?.trim(),
        questionTextWord.wordEight?.trim(),
        word.choice1?.trim(),
        word.choice2?.trim(),
        word.choice3?.trim(),
        urls[1] || "",
        urls[2] || "",
        urls[3] || "",
        voiceData1?.fileName,
        voiceData2?.fileName,
        voiceData3?.fileName
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var [imageUrl, voiceUrl1, voiceUrl2, voiceUrl3] = await Promise.all([
        image
          ? imageUploadSignedUrl(image, image.type)
          : fetchedData?.imageData,
        voiceData1.data
          ? audioUploadSignedUrl(voiceData1.data, voiceData1.data.type)
          : fetchedData?.options[0]?.voiceData,
        voiceData2.data
          ? audioUploadSignedUrl(voiceData2.data, voiceData2.data.type)
          : fetchedData?.options[1]?.voiceData,
        voiceData3.data
          ? audioUploadSignedUrl(voiceData3.data, voiceData3.data.type)
          : fetchedData?.options[2]?.voiceData
      ]);
      const response = await p3WordSortingUpdate(
        fetchedData?.SK,
        title,
        fetchedData?.questionFormat,
        getStageSK(stage),
        sendData,
        imageUrl,
        imageFileName || fetchedData?.imageDataFileName,
        questionTextWord.wordOne?.trim(),
        questionTextWord.wordTwo?.trim(),
        questionTextWord.wordThree?.trim(),
        questionTextWord.wordFour?.trim(),
        questionTextWord.wordFive?.trim(),
        questionTextWord.wordSix?.trim(),
        questionTextWord.wordSeven?.trim(),
        questionTextWord.wordEight?.trim(),
        word.choice1?.trim(),
        word.choice2?.trim(),
        word.choice3?.trim() || '',
        voiceUrl1,
        voiceUrl2,
        voiceUrl3,
        voiceData1?.fileName || fetchedData?.options[0]?.voiceDataFileName,
        voiceData2?.fileName || fetchedData?.options[1]?.voiceDataFileName,
        voiceData3?.fileName || fetchedData?.options[2]?.voiceDataFileName
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
    // console.log("done");
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

  const handleWordChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name,value)
    setWord({ ...word, [name]: value });
    setShowDialog(true);
  };
  const handleQuestionTextWordChange = (e: any) => {
    const { name, value } = e.target;
    setQuestionTextWord({
      ...questionTextWord,
      [name]: value
    });
    setShowDialog(true);
  };
  const checkQuestionTextWordCharacterLength = () => {
    if (
      questionTextWord.wordOne?.length > 20 ||
      questionTextWord.wordTwo?.length > 20 ||
      questionTextWord.wordThree?.length > 20 ||
      questionTextWord.wordFour?.length > 20 ||
      questionTextWord.wordFive?.length > 20 ||
      questionTextWord.wordSix?.length > 20 ||
      questionTextWord.wordSeven?.length > 20 ||
      questionTextWord.wordEight?.length > 20
    )
      return false;

    return true;
  };
  const checkWordCharacterLength = () => {
    if (
      word.choice1?.length > 20 ||
      word.choice2?.length > 20 ||
      word.choice3?.length > 20
    )
      return false;
    return true;
  };
  return (
    <div className="">
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
      <div className="mb-1">
        <span className="fs-12 color-dark">Question text</span>
        <span className="asterisk">&#42;</span>
      <span className={`fs-10 ml-5 ${!isP3Validated() && error && 'color-red'}`}>
          ※Please enter 1,2 or 3 for the part that corresponds to your
          choice.Enter 1,2,3 alone.
        </span> 
        <span
          className={`fs-10 ml-10 ${
            !checkQuestionTextWordCharacterLength() ? "color-red" : ""
          }`}
        >
          ※Up to 20 characters.
        </span>
      </div>
      <div className="d-flex">
        <input
          type="text"
          placeholder="Enter Text"
          className={`fs-14 mr-25 ${
            error && questionTextWord.wordOne?.length === 0 && `border-red`
          }`}
          max={20}
          name="wordOne"
          value={questionTextWord.wordOne}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className={`fs-14 mr-25 ${
            error && questionTextWord.wordTwo?.length === 0 && `border-red`
          }`}
          max={20}
          name="wordTwo"
          value={questionTextWord.wordTwo}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordThree"
          value={questionTextWord.wordThree}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordFour"
          value={questionTextWord.wordFour}
          onChange={handleQuestionTextWordChange}
        />
      </div>
      <div className="d-flex mt-4">
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordFive"
          value={questionTextWord.wordFive}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordSix"
          value={questionTextWord.wordSix}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordSeven"
          value={questionTextWord.wordSeven}
          onChange={handleQuestionTextWordChange}
        />
        <input
          type="text"
          placeholder="Enter Text"
          className="fs-14 mr-25"
          max={20}
          name="wordEight"
          value={questionTextWord.wordEight}
          onChange={handleQuestionTextWordChange}
        />
      </div>
      <div
        className={`color-red fs-10 mb-1 ${
          error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
        }`}
      >
        Please note that some fields have not been filled in.
      </div>
      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <label className="mb-2">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ml-10 ${
                !checkWordCharacterLength() ? "color-red" : ""
              }`}
            >
              ※Up to 20 characters
            </span>
          </label>
          <div className="d-flex align-items-center">
            <h6 className="mr-20 fs-14">1</h6>
            <input
              type="text"
              placeholder="Enter choises"
              name="choice1"
              className={`color-dark fs-14 ${
                error && word.choice1.length === 0 && `border-red`
              }`}
              value={word.choice1}
              onChange={handleWordChange}
            />
          </div>
        </div>
        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <span className="fs-12 color-dark">Voice data</span>

            <span
              className={`fs-10 ml-10 ${
                checkAudioFileTypeValidation(
                  voiceData1?.data,
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
                  ? `color-red`
                  : `color-light-dark`
              }`}
            >
              {allAudioSizeText} or less
            </span>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData1({
                  ...voiceData1,
                  data: file,
                  fileName: file.name
                });
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
            <h6 className="mr-20 fs-14">2</h6>
            <input
              type="text"
              placeholder="Enter choises"
              name="choice2"
              className={`color-dark fs-14 ${
                error && word.choice2.length === 0 && `border-red`
              }`}
              value={word.choice2}
              onChange={handleWordChange}
            />
          </div>
        </div>
        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              <span className="fs-12 color-dark">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData1?.data,
                    acceptedAudioFileType
                  )
                    ? "color-light-dark"
                    : "color-red"
                }`}
              >
                MP3,M4A
              </span>
            </div>
            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData2({
                  ...voiceData2,
                  data: file,
                  fileName: file.name
                });
                setShowDialog(true);
              }}
              fileName={
                voiceData2.fileName ||
                fetchedData?.options[1]?.voiceDataFileName
              }
              link={fetchedData?.options[1]?.voiceData}
            />
          </div>
        </div>
      </div>
      <div className="mcq_file_part--choice">
        <div className="mcq_file_part--choice-input">
          <div className="d-flex align-items-center ">
            <h6 className="mr-20 fs-14">3</h6>
            <input
              type="text"
              placeholder="Enter choises"
              name="choice3"
              className={`color-dark fs-14`}
              value={word.choice3}
              onChange={handleWordChange}
            />
          </div>
        </div>
        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              {" "}
              <span className="fs-12 color-dark">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  checkAudioFileTypeValidation(
                    voiceData1?.data,
                    acceptedAudioFileType
                  )
                    ? "color-light-dark"
                    : "color-red"
                }`}
              >
                MP3,M4A
              </span>
            </div>
            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setvoiceData3({
                  ...voiceData3,
                  data: file,
                  fileName: file.name
                });
                setShowDialog(true);
              }}
              fileName={
                voiceData3.fileName ||
                fetchedData?.options[2]?.voiceDataFileName
              }
              link={fetchedData?.options[2]?.voiceData}
            />
          </div>
        </div>
      </div>
      {preview && (
        <P3PreviewModal
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          backgroundImage={getStageBackgroundImage(stage)}
          image={fetchedData?.imageData ? fetchedData?.imageData : image}
          wordA={questionTextWord.wordOne ? questionTextWord.wordOne : ""}
          wordB={questionTextWord.wordTwo ? questionTextWord.wordTwo : ""}
          wordC={questionTextWord.wordThree ? questionTextWord.wordThree : ""}
          wordD={questionTextWord.wordFour ? questionTextWord.wordFour : ""}
          wordE={questionTextWord.wordFive ? questionTextWord.wordFive : ""}
          wordF={questionTextWord.wordSix ? questionTextWord.wordSix : ""}
          wordG={questionTextWord.wordSeven ? questionTextWord.wordSeven : ""}
          wordH={questionTextWord.wordEight ? questionTextWord.wordEight : ""}
          choiceWordOne={word.choice1 ? word.choice1 : ""}
          choiceWordTwo={word.choice2 ? word.choice2 : ""}
          choiceWordThree={word.choice3 ? word.choice3 : ""}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P3WordSorting;
