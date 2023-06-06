import { useState, useEffect, useLayoutEffect } from "react";
import DragnDropVoice from "../../../Components/dragndropVoice/DragnDropVoice";
import { audioUploadSignedUrl } from "../service/fileUploadSignedUrl";
import Loader from "../../../Components/loader/Loader";
import P5ConversationModal from "./P5ConversationModal";
import P5ConversationTalk from "../component/P5ConversationTalk";
import {
  p5ConversationCreate,
  p5ConversationUpdate
} from "../service/englishquestion";
import {
  allAudioSize,
  allAudioSizeText,
  acceptedAudioFileType
} from "../../../assets/static/static";
import { getQuestionPropTypes } from "../../../Services/type/type";
function P5Conversation({
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
  // const [image, setImage] = useState<any>();
  const [choiceText, setChoiceText] = useState({
    choiceText1: "",
    choiceText2: "",
    choiceText3: "",
    choiceText4: ""
  });
  const { choiceText1, choiceText2, choiceText3, choiceText4 } = choiceText;
  const [firstRow, setFirstRow] = useState({
    talker: "",
    talk_1: "",
    talk_2: "",
    talk_3: "",
    talk_4: ""
  });
  const [secondRow, setSecondRow] = useState({
    talker: "",
    talk_1: "",
    talk_2: "",
    talk_3: "",
    talk_4: ""
  });
  const [thirdRow, setThirdRow] = useState({
    talker: "",
    talk_1: "",
    talk_2: "",
    talk_3: "",
    talk_4: ""
  });
  const [fourthRow, setFourthRow] = useState({
    talker: "",
    talk_1: "",
    talk_2: "",
    talk_3: "",
    talk_4: ""
  });
  const [fifthRow, setFifthRow] = useState({
    talker: "",
    talk_1: "",
    talk_2: "",
    talk_3: "",
    talk_4: ""
  });

  const [answer, setAnswer] = useState("");
  const [voiceData1, setVoiceData1] = useState<any>({ data: null, name: "" });
  const [voiceData2, setVoiceData2] = useState<any>({ data: null, name: "" });
  const [voiceData3, setVoiceData3] = useState<any>({ data: null, name: "" });
  const [voiceData4, setVoiceData4] = useState<any>({ data: null, name: "" });

  const [dataLoaded, setDataLoaded] = useState(true);
  const getStageBackgroundImage = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.imageData;
  };
  const handleChangeRadioButton = (e: any) => {
    const { value } = e.target;
    console.log(value);
    setAnswer(value);
  };
  const handleChangeChoiceText = (e: any) => {
    const { name, value } = e.target;
    setChoiceText({ ...choiceText, [name]: value });
    setShowDialog(true);
  };
  const getStageSK = (stageTitle: string) => {
    return stageList[parseInt(stageTitle) - 1]?.SK;
  };
  const handleUploadFile = async () => {
    let [voiceUrl1, voiceUrl2, voiceUrl3, voiceUrl4] = await Promise.all([
      voiceData1?.data &&
        audioUploadSignedUrl(voiceData1?.data, voiceData1?.data?.type),
      voiceData2?.data &&
        audioUploadSignedUrl(voiceData2?.data, voiceData2?.data?.type),
      voiceData3?.data &&
        audioUploadSignedUrl(voiceData3?.data, voiceData3?.data?.type),
      voiceData4?.data &&
        audioUploadSignedUrl(voiceData4?.data, voiceData4?.data?.type)
    ]);
    return [voiceUrl1, voiceUrl2, voiceUrl3, voiceUrl4];
  };
  const checkFileValidation = (file: any) => {
    if (file && file?.size > allAudioSize) return false;
    return true;
  };
  const checkTextValidation = (text: string, characterLimit: number) => {
    return text?.length > characterLimit;
  };
  // const checkTextValidation = (text: string, characterLimit: number) => {
  //   return text.length === 0 || text.length > characterLimit;
  // };
  const checkRowCharacterValidation = (row: any) => {
    if (
      checkTextValidation(row.talker, 40) ||
      checkTextValidation(row.talk_1, 40) ||
      checkTextValidation(row.talk_2, 40) ||
      checkTextValidation(row.talk_3, 40) ||
      checkTextValidation(row.talk_4, 40)
    ) {
      return false;
    }
    return true;
  };
  const countQuestionMark = (row: any) => {
    let count =
      (row?.talk_1?.trim() === "?" ? 1 : 0) +
      (row?.talk_2?.trim() === "?" ? 1 : 0) +
      (row?.talk_3?.trim() === "?" ? 1 : 0) +
      (row?.talk_4?.trim() === "?" ? 1 : 0);
    return count;
  };
  const checkSingleQuestionMark = () => {
    let sum =
      countQuestionMark(firstRow) +
      countQuestionMark(secondRow) +
      countQuestionMark(thirdRow) +
      countQuestionMark(fourthRow) +
      countQuestionMark(fifthRow);
    if (sum === 1) {
      //  setQuestionMarkError(false);

      return true;
    }
    //  setQuestionMarkError(true);
    return false;
  };
  const checkAllRowValidation = () => {
    if (!checkRowCharacterValidation(firstRow)) return false;
    if (!checkRowCharacterValidation(secondRow)) return false;
    if (!checkRowCharacterValidation(thirdRow)) return false;
    if (!checkRowCharacterValidation(fourthRow)) return false;
    if (!checkRowCharacterValidation(fifthRow)) return false;

    return true;
  };
  const checkFirstSentence = (row: any) => {
    if (row?.talker !== "" && row?.talk_1 === "") return false;
    return true;
  };
  const checkAllFirstSentence = () => {
    if (!checkFirstSentence(firstRow)) return false;
    if (!checkFirstSentence(secondRow)) return false;
    if (!checkFirstSentence(thirdRow)) return false;
    if (!checkFirstSentence(fourthRow)) return false;
    if (!checkFirstSentence(fifthRow)) return false;

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
  const checkValidation = () => {
    if (title.length === 0 || title.length > 40) return false;
    if (!checkSingleQuestionMark()) return false;
    if (!checkAllRowValidation()) return false;
    if (!checkAllFirstSentence()) return false;
    if (!edit && answer.length === 0) return false;
    if (
      voiceData1.data &&
      (!checkFileValidation(voiceData1.data) ||
        !checkAudioFileTypeValidation(voiceData1.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData2.data &&
      (!checkFileValidation(voiceData2.data) ||
        !checkAudioFileTypeValidation(voiceData2.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData3.data &&
      (!checkFileValidation(voiceData3.data) ||
        !checkAudioFileTypeValidation(voiceData3.data, acceptedAudioFileType))
    )
      return false;
    if (
      voiceData4.data &&
      (!checkFileValidation(voiceData4.data) ||
        !checkAudioFileTypeValidation(voiceData4.data, acceptedAudioFileType))
    )
      return false;
    if (checkTextValidation(choiceText1, 20)) return false;
    if (checkTextValidation(choiceText2, 20)) return false;
    if (checkTextValidation(choiceText3, 20)) return false;
    if (checkTextValidation(choiceText4, 20)) return false;

    return true;
  };
  useEffect(() => {
    if (edit) {
      setAnswer(
        fetchedData?.options[0]?.answer === true
          ? "radio1"
          : fetchedData?.options[1]?.answer === true
          ? "radio2"
          : fetchedData?.options[2]?.answer === true
          ? "radio3"
          : "radio4"
      );
      setFirstRow({
        talker: fetchedData?.conversation[0]?.talker,
        talk_1: fetchedData?.conversation[0]?.talk[0]?.talkText,
        talk_2: fetchedData?.conversation[0]?.talk[1]?.talkText || "",
        talk_3: fetchedData?.conversation[0]?.talk[2]?.talkText || "",
        talk_4: fetchedData?.conversation[0]?.talk[3]?.talkText || ""
      });
      setSecondRow({
        talker: fetchedData?.conversation[1]?.talker,
        talk_1: fetchedData?.conversation[1]?.talk[0]?.talkText,
        talk_2: fetchedData?.conversation[1]?.talk[1]?.talkText || "",
        talk_3: fetchedData?.conversation[1]?.talk[2]?.talkText || "",
        talk_4: fetchedData?.conversation[1]?.talk[3]?.talkText || ""
      });
      setThirdRow({
        talker: fetchedData?.conversation[2]?.talker || "",
        talk_1: fetchedData?.conversation[2]?.talk[0]?.talkText,
        talk_2: fetchedData?.conversation[2]?.talk[1]?.talkText || "",
        talk_3: fetchedData?.conversation[2]?.talk[2]?.talkText || "",
        talk_4: fetchedData?.conversation[2]?.talk[3]?.talkText || ""
      });
      setFourthRow({
        talker: fetchedData?.conversation[3]?.talker || "",
        talk_1: fetchedData?.conversation[3]?.talk[0]?.talkText,
        talk_2: fetchedData?.conversation[3]?.talk[1]?.talkText || "",
        talk_3: fetchedData?.conversation[3]?.talk[2]?.talkText || "",
        talk_4: fetchedData?.conversation[3]?.talk[3]?.talkText || ""
      });
      setFifthRow({
        talker: fetchedData?.conversation[4]?.talker || "",
        talk_1: fetchedData?.conversation[4]?.talk[0]?.talkText,
        talk_2: fetchedData?.conversation[4]?.talk[1]?.talkText || "",
        talk_3: fetchedData?.conversation[4]?.talk[2]?.talkText || "",
        talk_4: fetchedData?.conversation[4]?.talk[3]?.talkText || ""
      });
      setChoiceText({
        choiceText1: fetchedData?.options[0]?.title,
        choiceText2: fetchedData?.options[1]?.title,
        choiceText3: fetchedData?.options[2]?.title,
        choiceText4: fetchedData?.options[3]?.title
      });
    }
  }, [fetchedData]);
  const createP5Conversation = async () => {
    setShowDialog(false);
    const urls: any = await handleUploadFile();

    try {
      setDataLoaded(false);
      const response = await p5ConversationCreate(
        title,
        firstRow,
        secondRow,
        thirdRow,
        fourthRow,
        fifthRow,
        choiceText1?.trim(),
        choiceText2?.trim(),
        choiceText3?.trim(),
        choiceText4?.trim(),
        urls[0] || "",
        urls[1] || "",
        urls[2] || "",
        urls[3] || "",
        voiceData1?.name || "",
        voiceData2?.name || "",
        voiceData3?.name || "",
        voiceData4?.name || "",
        sendData,
        format,
        getStageSK(stage),
        answer
      );
      if (response) {
        setDataLoaded(true);
        handleCloseApiCallDone();
      }
    } catch (error) {}
  };
  const updateEnglishQuestion = async () => {
    setShowDialog(false);
    try {
      setDataLoaded(false);
      var urls = await Promise.all([
        voiceData1.data
          ? audioUploadSignedUrl(voiceData1.data, voiceData1.data.type)
          : fetchedData?.options[0]?.voiceData,
        voiceData2.data
          ? audioUploadSignedUrl(voiceData2.data, voiceData2.data.type)
          : fetchedData?.options[1]?.voiceData,
        voiceData3.data
          ? audioUploadSignedUrl(voiceData3.data, voiceData3.data.type)
          : fetchedData?.options[2]?.voiceData,
        voiceData4.data
          ? audioUploadSignedUrl(voiceData4.data, voiceData4.data.type)
          : fetchedData?.options[3]?.voiceData
      ]);
      const response = await p5ConversationUpdate(
        fetchedData?.SK,
        title,
        firstRow,
        secondRow,
        thirdRow,
        fourthRow,
        fifthRow,
        choiceText1?.trim(),
        choiceText2?.trim(),
        choiceText3?.trim(),
        choiceText4?.trim(),
        urls[0] || "",
        urls[1] || "",
        urls[2] || "",
        urls[3] || "",
        voiceData1?.name || "",
        voiceData2?.name || "",
        voiceData3?.name || "",
        voiceData4?.name || "",
        sendData,
        fetchedData?.questionFormat,
        getStageSK(stage),
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
  useLayoutEffect(() => {
    // sendData && console.log(sendData);
    if (sendData !== "") {
      if (checkValidation()) {
        handleError(false);
        if (edit) {
          // console.log(answer);
          updateEnglishQuestion();
        } else {
          //console.log("create");
          createP5Conversation();
        }
      } else {
        handleError(true);
      }

      closeCallApi();
    }
  }, [sendData]);
  const checkAnswer = (id: number) => {
    if (answer) {
      return answer === `radio${id}`;
    }
    return fetchedData?.options[id - 1]?.answer;
  };
  // console.log("preview", preview);
  const handleChangeFirstRow = (e: any) => {
    const { name, value } = e.target;
    setFirstRow({ ...firstRow, [name]: value });
    setShowDialog(true);
  };
  const handleChangeSecondRow = (e: any) => {
    const { name, value } = e.target;
    setSecondRow({ ...secondRow, [name]: value });
    setShowDialog(true);
  };
  const handleChangeThirdRow = (e: any) => {
    const { name, value } = e.target;
    setThirdRow({ ...thirdRow, [name]: value });
    setShowDialog(true);
  };
  const handleChangeFourthRow = (e: any) => {
    const { name, value } = e.target;
    setFourthRow({ ...fourthRow, [name]: value });
    setShowDialog(true);
  };
  const handleChangeFifthRow = (e: any) => {
    const { name, value } = e.target;
    setFifthRow({ ...fifthRow, [name]: value });
    setShowDialog(true);
  };
  return (
    <div>
      {/* COnversations  */}

      <div className="p5conversations">
        <div className="con-title">
          <h6 className="whitespace-nowrap"> Talk text</h6>
          <p>
            <span
              className={`${
                !checkSingleQuestionMark() && error ? "color-red" : ""
              }`}
            >
              ※Please put a [?] in the section that will be the quesiton.Always
              set only one.If you enter [?] please use that word alone.
            </span>
            &nbsp;
            <span className={`${!checkAllRowValidation() ? "color-red" : ""}`}>
              Up to 40 characters in each form.
            </span>
          </p>
        </div>

        <div className="con-input-fields">
          <div className="con-single-row">
            <div className="con-single-input-field con-small-field">
              <P5ConversationTalk text={"Talker"} number={1} asterisk={true} />

              <input
                type="text"
                placeholder="Enter name"
                name="talker"
                value={firstRow.talker}
                className={`${
                  error && firstRow.talker.length === 0 && `border-red`
                }`}
                onChange={handleChangeFirstRow}
              />
            </div>

            <div className="con-single-input-field con-common-field">
              <P5ConversationTalk text={"Talk"} number={1} asterisk={true} />
              <input
                type="text"
                placeholder="Enter text"
                name="talk_1"
                value={firstRow.talk_1}
                onChange={handleChangeFirstRow}
                className={`${
                  error && firstRow.talk_1.length === 0 && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_2"
                value={firstRow.talk_2}
                onChange={handleChangeFirstRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_3"
                value={firstRow.talk_3}
                onChange={handleChangeFirstRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_4"
                value={firstRow.talk_4}
                onChange={handleChangeFirstRow}
              />
            </div>
          </div>

          <div className="con-single-row">
            <div className="con-single-input-field con-small-field">
              <P5ConversationTalk text={"Talker"} number={2} asterisk={true} />

              <input
                type="text"
                placeholder="Enter name"
                name="talker"
                value={secondRow.talker}
                onChange={handleChangeSecondRow}
                className={`${
                  error && secondRow.talker.length === 0 && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field con-common-field">
              <P5ConversationTalk text={"Talk"} number={2} asterisk={true} />
              <input
                type="text"
                placeholder="Enter text"
                name="talk_1"
                value={secondRow.talk_1}
                onChange={handleChangeSecondRow}
                className={`${
                  error && secondRow.talk_1.length === 0 && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_2"
                value={secondRow.talk_2}
                onChange={handleChangeSecondRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_3"
                value={secondRow.talk_3}
                onChange={handleChangeSecondRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_4"
                value={secondRow.talk_4}
                onChange={handleChangeSecondRow}
              />
            </div>
          </div>

          <div className="con-single-row">
            <div className="con-single-input-field con-small-field">
              <P5ConversationTalk text={"Talker"} number={3} />

              <input
                type="text"
                name="talker"
                placeholder="Enter name"
                value={thirdRow.talker}
                onChange={handleChangeThirdRow}
              />
            </div>

            <div className="con-single-input-field con-common-field">
              <P5ConversationTalk text={"Talk"} number={3} />
              <input
                type="text"
                name="talk_1"
                placeholder="Enter text"
                value={thirdRow.talk_1}
                onChange={handleChangeThirdRow}
                className={`${
                  error && !checkFirstSentence(thirdRow) && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_2"
                value={thirdRow.talk_2}
                onChange={handleChangeThirdRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_3"
                value={thirdRow.talk_3}
                onChange={handleChangeThirdRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_4"
                value={thirdRow.talk_4}
                onChange={handleChangeThirdRow}
              />
            </div>
          </div>

          <div className="con-single-row">
            <div className="con-single-input-field con-small-field">
              <P5ConversationTalk text={"Talker"} number={4} />

              <input
                type="text"
                name="talker"
                placeholder="Enter name"
                value={fourthRow.talker}
                onChange={handleChangeFourthRow}
              />
            </div>

            <div className="con-single-input-field con-common-field">
              <P5ConversationTalk text={"Talk"} number={4} />
              <input
                type="text"
                name="talk_1"
                placeholder="Enter text"
                value={fourthRow.talk_1}
                onChange={handleChangeFourthRow}
                className={`${
                  error && !checkFirstSentence(fourthRow) && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_2"
                value={fourthRow.talk_2}
                onChange={handleChangeFourthRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_3"
                value={fourthRow.talk_3}
                onChange={handleChangeFourthRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_4"
                value={fourthRow.talk_4}
                onChange={handleChangeFourthRow}
              />
            </div>
          </div>

          <div className="con-single-row">
            <div className="con-single-input-field con-small-field">
              <P5ConversationTalk text={"Talker"} number={5} />

              <input
                type="text"
                name="talker"
                placeholder="Enter name"
                value={fifthRow.talker}
                onChange={handleChangeFifthRow}
              />
            </div>

            <div className="con-single-input-field con-common-field">
              <P5ConversationTalk text={"Talk"} number={5} />
              <input
                type="text"
                name="talk_1"
                placeholder="Enter text"
                value={fifthRow.talk_1}
                onChange={handleChangeFifthRow}
                className={`${
                  error && !checkFirstSentence(fifthRow) && `border-red`
                }`}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_2"
                value={fifthRow.talk_2}
                onChange={handleChangeFifthRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_3"
                value={fifthRow.talk_3}
                onChange={handleChangeFifthRow}
              />
            </div>

            <div className="con-single-input-field">
              <input
                type="text"
                name="talk_4"
                value={fifthRow.talk_4}
                onChange={handleChangeFifthRow}
              />
            </div>
          </div>
        </div>
      </div>

      {/* choice start */}

      <div className="mcq_file_part--choice mb-10">
        <div className="mcq_file_part--choice-input">
          <label className="mb-2">
            <span className="fs-12 color-dark">Choices</span>
            <span className="asterisk">&#42;</span>
            <span
              className={`fs-10 ms-3 ${
                error && answer === "" ? "color-red" : "color-light-dark"
              }`}
            >
              ※Please check the correct answer
            </span>
            <span
              className={`fs-10 ${
                choiceText1?.length > 20 ||
                choiceText2?.length > 20 ||
                choiceText3?.length > 20 ||
                choiceText4?.length > 20
                  ? "color-red"
                  : "color-light-dark"
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
                onChange={handleChangeRadioButton}
                checked={checkAnswer(1)}
                name="choice"
                value={"radio1"}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceText1"
              value={choiceText1}
              onChange={handleChangeChoiceText}
              className={`color-dark fs-14 ${
                error && choiceText1.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
           <div className="mb-10">
           <span className="fs-12 color-dark mb-10">Voice data</span>
            <span
              className={`fs-10 ml-10 ${
                !checkAudioFileTypeValidation(
                  voiceData1.data,
                  acceptedAudioFileType
                )
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              MP3,M4A
            </span>
            <span
              className={`fs-10 ml-10 ${
                voiceData1?.data?.size > allAudioSize
                  ? "color-red"
                  : "color-light-dark"
              }`}
            >
              {allAudioSizeText} or less
            </span>
           </div>
            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData1({ data: file, name: file.name });
              }}
              fileName={
                voiceData1.name || fetchedData?.options[0]?.voiceDataFileName
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
                onChange={handleChangeRadioButton}
                name="choice"
                value={"radio2"}
                checked={checkAnswer(2)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceText2"
              value={choiceText2}
              onChange={handleChangeChoiceText}
              className={`color-dark fs-14 ${
                error && choiceText2.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          {" "}
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              {" "}
             <div className="mb-10">
             <span className="fs-12 color-dark mb-10">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  !checkAudioFileTypeValidation(
                    voiceData2.data,
                    acceptedAudioFileType
                  )
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                MP3,M4A
              </span>
              <span
                className={`fs-10 ml-10 ${
                  voiceData2?.data?.size > allAudioSize
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                {" "}
                {allAudioSizeText} or less{" "}
              </span>
             </div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData2({ data: file, name: file.name });
              }}
              fileName={
                voiceData2.name || fetchedData?.options[1]?.voiceDataFileName
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
                onChange={handleChangeRadioButton}
                name="choice"
                value={"radio3"}
                checked={checkAnswer(3)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceText3"
              value={choiceText3}
              onChange={handleChangeChoiceText}
              className={`color-dark fs-14 ${
                error && choiceText3.length === 0 && `border-red`
              }`}
            />
          </div>
        </div>

        <div className="drag_file_part">
          <div className="customized-margin-controlled">
            <div className="customized-view-controlled">
              <div className="mb-10">
              <span className="fs-12 color-dark mb-10">Voice data</span>
              <span
                className={`fs-10 ml-10 ${
                  !checkAudioFileTypeValidation(
                    voiceData3.data,
                    acceptedAudioFileType
                  )
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                MP3,M4A
              </span>
              <span
                className={`fs-10 ml-10 ${
                  voiceData3?.data?.size > allAudioSize
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                {" "}
                {allAudioSizeText} or less{" "}
              </span>
              </div>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData3({ data: file, name: file.name });
              }}
              fileName={
                voiceData3.name || fetchedData?.options[2]?.voiceDataFileName
              }
              link={fetchedData?.options[2]?.voiceData}
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
                onChange={handleChangeRadioButton}
                name="choice"
                value={"radio4"}
                checked={checkAnswer(4)}
              />
              <span className="checkmark custom_label"></span>
            </label>
            <input
              type="text"
              placeholder="Enter choises"
              name="choiceText4"
              value={choiceText4}
              onChange={handleChangeChoiceText}
              className={`color-dark fs-14 ${
                error && choiceText4.length === 0 && `border-red`
              }`}
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
                  !checkAudioFileTypeValidation(
                    voiceData4.data,
                    acceptedAudioFileType
                  )
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                MP3,M4A
              </span>
              <span
                className={`fs-10 ml-10 ${
                  voiceData4.data?.size > allAudioSize
                    ? "color-red"
                    : "color-light-dark"
                }`}
              >
                {allAudioSizeText} or less
              </span>
            </div>

            <DragnDropVoice
              setVoiceFile={(file: any) => {
                setVoiceData4({ data: file, name: file.name });
              }}
              fileName={
                voiceData4?.name || fetchedData?.options[3]?.voiceDataFileName
              }
              link={fetchedData?.options[3]?.voiceData}
            />
          </div>
        </div>
      </div>
      {preview && (
        <P5ConversationModal
          firstRow={firstRow}
          secondRow={secondRow}
          thirdRow={thirdRow}
          fourthRow={fourthRow}
          fifthRow={fifthRow}
          show={preview}
          handleClose={handlePreviewClose}
          modalHeader="Preview"
          modalBackgroundImage={getStageBackgroundImage(stage)}
          // questionText={questionText ? questionText : ""}
          choiceA={choiceText1 ? choiceText1 : ""}
          choiceB={choiceText2 ? choiceText2 : ""}
          choiceC={choiceText3 ? choiceText3 : ""}
          choiceD={choiceText4 ? choiceText4 : ""}
        />
      )}
      {!dataLoaded && <Loader />}
    </div>
  );
}

export default P5Conversation;
