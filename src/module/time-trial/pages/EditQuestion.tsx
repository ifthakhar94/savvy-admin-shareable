import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layout/Index";
import {
  getMonthlyTimerTrialQuestionTheme,
  getTimeTrialMonthlyEditdata,
  updateMonthlyTimerTrialQuestion,
  deleteTimetrialMonthlyQuestion
} from "../service/timeTrial";
import { validateNewQuestion } from "../../../Services/utils/validateNewQuestion";
import ModalBox from "../../../Components/modal/ModalBox";
import Loader from "../../../Components/loader/Loader";
import { imageUploadQuestion } from "../service/imageUploadQuestion";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import PreviewModalBox from "../component/PreviewModalBox";
import DialogBox from "../../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import {
  completeContents,
  deleteContents,
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import {
  acceptedImageFileType,
  allImageSize
} from "../../../assets/static/static";

function EditQuestion() {
  const navigate = useNavigate();
  let { id }: any = useParams();
  const [show, setShow] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [preview, setPreview] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [questionImage, setQuestionImage] = useState<any>("");
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [questionImageFileName, setQuestionImageFileName] = useState("");
  const [answer, setAnswer] = useState<any>();
  const [questionStatus, setQuestionStatus] = useState<any>("");
  const [server_error, setServer_error] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [questionSK, setQuestionSK] = useState("");
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const handleClosePublicModal = () => {
    setShowPublicModal(false);
  };
  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => {
    setPreview(true);
  };
  const handleShowPublicModal = () => {
    setShowPublicModal(true);
  };
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleCloseServerErrorModal = () => {
    setServer_error(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const [formErrors, setFormErrors] = useState({
    title: "",
    questionText: "",
    choiceA: "",
    choiceB: "",
    choiceC: ""
  });
  const initialValues = {
    SK: "",
    title: "",
    questionText: "",
    choiceA: "",
    choiceB: "",
    choiceC: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { title, questionText, choiceA, choiceB, choiceC } = formValues;

  const checkTextValidation = (text: string, characterLimit: number) => {
    return text.length === 0 || text.length > characterLimit;
  };
  const checkFileValidation = (file: any, limitSize: number) => {
    if (typeof file === "string") return true;
    if (file && file?.size > limitSize) {
      return false;
    }
    return true;
  };

  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (typeof file === "string") return true;
    if (
      file &&
      acceptedType.includes(
        file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
      )
    )
      return true;

    return false;
  };

 

  // send data to server
  const handleSubmit = async (status: string) => {
    handleClosePublicModal();
    try {
      setDataLoaded(false);
      //setFormErrors(validateNewQuestion(formValues));
      setShowDialog(false);
      if (
        !checkTextValidation(title,40) &&
        !checkTextValidation(questionText,20) &&
        !checkTextValidation(choiceA,20) &&
        !checkTextValidation(choiceB,20) &&
        !checkTextValidation(choiceC,20) &&
        answer !== '' &&
        checkFileTypeValidation(questionImage, acceptedImageFileType) &&
        checkFileValidation(questionImage, allImageSize)
      ) {
        setServer_error(false);

        var imageUrl: any;
        if (typeof questionImage !== "string") {
          imageUrl = await imageUploadQuestion(
            questionImage,
            questionImage.type
          );
        } else {
          imageUrl = questionImage;
        }

        const response = await updateMonthlyTimerTrialQuestion(
          questionSK,
          title,
          imageUrl,
          questionImageFileName,
          questionText,
          choiceA,
          choiceB,
          choiceC,
          answer,
          status
        );
        if (response) {
          if (status === "Draft") handleShowCompleteModal();
          if (status === "Published") handleShow();
        }
      } else {
        console.log("server error");
        setServer_error(true);
      }
      setDataLoaded(true);
    } catch (error) {}
  };

  //  deleteTimetrialMonthlyQuestion
  const handleDeleteTimetrialMonthlyQuestion = async () => {
    setDataLoaded(false);
    try {
      const config: any = await deleteTimetrialMonthlyQuestion(
        questionSK,
        questionStatus
      );
      setDataLoaded(true);
      handleShowCompleteModal();
    } catch (error) {
      setServer_error(true);
    }
  };

  const handleChangeRadionButton = (e: any) => {
    const { name } = e.target;
    setAnswer(name);
    setShowDialog(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (answer === choiceA && name === "choiceA") {
      setAnswer(value);
    }
    if (answer === choiceB && name === "choiceB") {
      setAnswer(value);
    }
    if (answer === choiceC && name === "choiceC") {
      setAnswer(value);
    }
    setFormValues({ ...formValues, [name]: value });
    setFormErrors(validateNewQuestion(formValues));
    setShowDialog(true);
  };

  // validation check

  useEffect(() => {
    let concatData = decodeURIComponent(id);
    const sk = `theme#${concatData.slice(
      concatData.lastIndexOf("timetrial"),
      concatData.length
    )}`;
    setQuestionSK(concatData.slice(0, concatData.length - 8));

    fetchMonthlyTimerTrialQuestionTheme(sk);
    fetchTimeTrialMonthlyEditdata(concatData.slice(0, concatData.length - 8));
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors)?.length === 0) {
    }
  }, [formErrors]);

  const fetchTimeTrialMonthlyEditdata = async (concatData: string) => {
    setDataLoaded(false);
    const response = await getTimeTrialMonthlyEditdata(concatData);

    setQuestionImage(response?.imageData);
    setQuestionImageFileName(response?.imageDataFileName);
    setFormValues({ ...response });
    setAnswer(response?.answer);
    setQuestionStatus(response?.questionStatus);
    // var resubmit = await handleApiError(response?.data);
    // if (resubmit) fetchTimeTrialMonthlyEditdata(concatData);
    setDataLoaded(true);
  };
  const fetchMonthlyTimerTrialQuestionTheme = async (concatData: string) => {
    setDataLoaded(false);
    const response = await getMonthlyTimerTrialQuestionTheme(concatData);
    setBackgroundImage(response?.backgroundImage);
    setDataLoaded(true);
  };
  return (
    <Layout>
      <React.Fragment>
        <DialogBox
          // @ts-ignore
          showDialog={showPrompt}
          confirmNavigation={confirmNavigation}
          cancelNavigation={cancelNavigation}
        />
        <div className="content-wrapper">
          <div className="back-btn">
            <span onClick={() => navigate(-1)}>&lt; Back</span>
          </div>

          <div className="content-inner-wrapper">
            <div className="content-left">
              <div className="mb-4">
                <label className="mb-1">
                  <span className="fs-12 color-dark">Title</span>{" "}
                  <span className="asterisk">&#42;</span>
                  <span className="fs-10 color-light-dark ms-4">
                    ※This is not displayed in the app{" "}
                  </span>
                  <span
                    className={`fs-10  ms-4 ml-10 ${
                      title?.length > 40 ? `color-red` : `color-light-dark`
                    }`}
                  >
                    　※Up to 40 characters
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  name="title"
                  onChange={handleChange}
                  className={`title-input ${
                    server_error && title.length === 0 && "border-red"
                  }`}
                />
              </div>
              <hr />
              <div className="mb-3 mt-3">
                <label className=" ">
                  <span className="fs-12 color-dark">Question text</span>
                  <span className="asterisk">&#42;</span>
                  <span className="color-light-dark">
                    <span
                      className={`fs-10  ms-4 ml-10 ${
                        questionText?.length > 20
                          ? `color-red`
                          : `color-light-dark`
                      }`}
                    >
                      ※Up to 20 characters
                    </span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter question test"
                  value={questionText}
                  name="questionText"
                  onChange={handleChange}
                  className={`title-input ${
                    server_error && questionText.length === 0 && "border-red"
                  }`}
                />
              </div>
              <NewDragDrop
                title="Image data"
                setImageFile={(file: any) => {
                  setQuestionImage(file);
                  setQuestionImageFileName(file.name);
                  setShowDialog(true);
                }}
                link={questionImage}
                fileName={questionImageFileName}
                error={server_error}
              />
              <label className="mb-2">
                <span className="fs-12 color-dark">Choices</span>
                <span className="asterisk">&#42;</span>
                <span
                  className={`fs-10 ms-3 ${
                    server_error && answer.length === 0
                      ? "color-red"
                      : "color-light-dark"
                  }`}
                >
                  ※Please check the correct answer
                </span>
                <span
                  className={`fs-10 ${
                    choiceA?.length > 20 ||
                    choiceB?.length > 20 ||
                    choiceC?.length > 20
                      ? `color-red`
                      : `color-light-dark`
                  }`}
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
                    checked={answer === "choiceA"}
                    value={choiceA}
                    name="choiceA"
                  />
                  <span className="checkmark custom_label"></span>
                </label>

                <input
                  type="text"
                  placeholder="Enter choises"
                  value={choiceA}
                  name="choiceA"
                  onChange={handleChange}
                  className={`color-dark fs-14 ${
                    server_error && choiceA.length === 0 && "border-red"
                  }`}
                />
              </div>
              <div className="d-flex align-items-center mb-3">
                <label className="radioBtn me-2 drag-drop-radio-btn-container ">
                  <input
                    type="radio"
                    className="radioBtn me-2"
                    checked={answer === "choiceB"}
                    name="choiceB"
                    value={choiceB}
                    onChange={handleChangeRadionButton}
                  />
                  <span className="checkmark custom_label"></span>
                </label>
                <input
                  type="text"
                  placeholder="Enter choises"
                  value={choiceB}
                  name="choiceB"
                  onChange={handleChange}
                  className={`color-dark fs-14 ${
                    server_error && choiceB.length === 0 && "border-red"
                  }`}
                />
              </div>
              <div className="d-flex align-items-center">
                <label className="radioBtn me-2 drag-drop-radio-btn-container ">
                  <input
                    type="radio"
                    checked={answer === "choiceC"}
                    value={choiceC}
                    className="radioBtn me-2"
                    name="choiceC"
                    onChange={handleChangeRadionButton}
                  />
                  <span className="checkmark custom_label"></span>
                </label>
                <input
                  type="text"
                  placeholder="Enter choises"
                  value={choiceC}
                  name="choiceC"
                  onChange={handleChange}
                  className={`color-dark fs-14 ${
                    server_error && choiceA.length === 0 && "border-red"
                  }`}
                />
              </div>
            </div>
            <div className="content-right bg-transparent p-0">
              <div className="p-20 bg-white">
                <div className="status-display d-flex justify-between align-middle flex-row">
                  <div className="color-dark fs-12">Status</div>
                  <div
                    className={`status-value ${
                      questionStatus === "Published"
                        ? `bg-blue color-white border-solid-blue`
                        : questionStatus === "Draft"
                        ? `bg-yellow color-black border-solid-yellow`
                        : `bg-white border-solid-dark-gray`
                    }`}
                  >
                    {questionStatus}
                  </div>
                </div>
                <div className="status-display d-flex justify-between align-middle flex-row">
                  <div
                    className="fs-12 draft-button"
                    onClick={() => {
                      setQuestionStatus("Draft");
                      handleSubmit("Draft");
                    }}
                  >
                    Draft
                  </div>
                  <div
                    className="fs-12 publish-button"
                    onClick={() => {
                      setQuestionStatus("Published");
                      handleShowPublicModal();
                    }}
                  >
                    Publish
                  </div>
                </div>
                <div className="d-flex justify-between align-middle flex-row">
                  <div
                    className="fs-12 preview-button"
                    onClick={handlePreviewShow}
                  >
                    Preview
                  </div>
                  <div
                    className="fs-12 delete-button cursor-pointer bg-red"
                    onClick={() => {
                      setQuestionStatus("Deleted");
                      handleShowDeleteModal();
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPublicModal && (
          <ModalBox
            show={showPublicModal}
            handleActionNClose={() => {
              handleSubmit("Published");
            }}
            handleClose={() => {
              handleClosePublicModal();
            }}
            modalHeader={publicContents.modalHead}
            modalText={publicContents.modalText}
            firstBtnText={publicContents.firstBtnText}
            secondBtnText={publicContents.secondBtnText}
          />
        )}
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(-1);
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}
        {showCompleteModal && (
          <ModalBox
            show={showCompleteModal}
            handleClose={() => {
              navigate(-1);
              handleCloseCompleteModal();
            }}
            modalHeader={completeContents.modalHead}
            modalText={completeContents.modalText}
            secondBtnText={completeContents.secondBtnText}
          />
        )}

        {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              handleDeleteTimetrialMonthlyQuestion();
              handleCloseDeleteModal();
            }}
            handleClose={handleCloseDeleteModal}
            modalHeader={deleteContents.modalHead}
            modalText={deleteContents.modalText}
            firstBtnText={deleteContents.firstBtnText}
            secondBtnText={deleteContents.secondBtnText}
          />
        )}

        {/* {server_error && (
          <ModalBox
            show={server_error}
            handleClose={() => {
              handleCloseServerErrorModal();
            }}
            modalHeader={errorContents.modalHead}
            modalText={errorContents.modalText}
            secondBtnText={errorContents.secondBtnText}
          />
        )} */}
        {preview && (
          <PreviewModalBox
            show={preview}
            handleClose={handlePreviewClose}
            modalHeader="Preview"
            modalBackgroundImage={backgroundImage}
            modalQuestionImage={questionImage}
            questionText={questionText}
            choiceA={choiceA}
            choiceB={choiceB}
            choiceC={choiceC}
          />
        )}
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default EditQuestion;
