import React, { useState, useEffect } from "react";
import Layout from "../../../Layout/Index";
import { createMonthlyTimerTrialQuestion } from "../service/timeTrial";
import { useNavigate, useParams } from "react-router-dom";
import { getMonthlyTimerTrialQuestionTheme } from "../service/timeTrial";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import { imageUploadQuestion } from "../service/imageUploadQuestion";
import ModalBox from "../../../Components/modal/ModalBox";
import Loader from "../../../Components/loader/Loader";
import PreviewModalBox from "../component/PreviewModalBox";
import DialogBox from "../../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import {
  completeContents,
  publicContents
} from "../../../Components/modal/modalContents";
import {
  acceptedImageFileType,
  allImageSize
} from "../../../assets/static/static";

function NewQuestion() {
  const navigate = useNavigate();
  let { id }: any = useParams();
  const [questionImage, setQuestionImage] = useState<any>();
  const [questionImageFileName, setQuestionImageFileName] = useState("");
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [preview, setPreview] = useState(false);
  const [server_error, setServer_error] = useState(false);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => {
    setPreview(true);
  };
  const handleClosePublicModal = () => {
    setShowPublicModal(false);
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
  const initialValues = {
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
    if (file && file?.size > limitSize) {
      return false;
    } else if (!file || file?.size > limitSize) {
      return false;
    }
    return true;
  };

  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (
      file &&
      acceptedType.includes(
        file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
      )
    )
      return true;
  };
  const handleSubmit = async (status: string) => {
    setDataLoaded(false);
    try {
      setShowDialog(false);
      if (
        !checkTextValidation(title,40) &&
        !checkTextValidation(questionText,20) &&
        !checkTextValidation(choiceA,20) &&
        !checkTextValidation(choiceB,20) &&
        !checkTextValidation(choiceC,20) &&
        answer !== '' &&
        questionImage !== undefined &&
        checkFileTypeValidation(questionImage, acceptedImageFileType) &&
        checkFileValidation(questionImage, allImageSize)
      ) {
        var imageUrl = await imageUploadQuestion(
          questionImage,
          questionImage.type
        );
        const response = await createMonthlyTimerTrialQuestion(
          decodeURIComponent(id),
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
        setServer_error(true);
      }
      handleClosePublicModal();
    } catch (error) {
      console.log(error);
    }
    setDataLoaded(true);
  };

  const handleChangeRadionButton = (e: any) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setShowDialog(true);
  };
  const fetchMonthlyTimerTrialQuestionTheme = async (concatData: string) => {
    setDataLoaded(false);
    const response = await getMonthlyTimerTrialQuestionTheme(concatData);
    setBackgroundImage(response?.backgroundImage);
   // console.log(response);

    setDataLoaded(true);
  };
  useEffect(() => {
    let concatData = decodeURIComponent(id);
    fetchMonthlyTimerTrialQuestionTheme(concatData);
  }, [id]);

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
                <label className="  ">
                  <span className="fs-12 color-dark">Question text</span>
                  <span className="asterisk">&#42;</span>
                  <span
                    className={`fs-10  ms-4 ml-10 ${
                      questionText?.length > 20
                        ? `color-red`
                        : `color-light-dark`
                    }`}
                  >
                    ※Up to 20 characters
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
                error={server_error}
              />

              {/* <div
              className={`color-red fs-10 mb-1 ${
                error && sendData !== "Deleted" ? "opacity-1" : "opacity-0"
              }`}
            >
              Please note that some fields have not been filled in.
            </div> */}

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
                    choiceA.length > 20 ||
                    choiceB.length > 20 ||
                    choiceC.length > 20
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
                    value="choiceA"
                    name="choice"
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
                    name="choice"
                    value="choiceB"
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
                    className="radioBtn me-2"
                    name="choice"
                    value="choiceC"
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
                    server_error && choiceC.length === 0 && "border-red"
                  }`}
                />
              </div>
            </div>
            <div className="content-right bg-transparent p-0 border-none">
              <div className="bg-white p-20 border-solid-layout-border-gray">
                <div className="status-display d-flex justify-between align-middle flex-row">
                  <div className="color-dark fs-12">Status</div>
                  <div className="status-value">New</div>
                </div>
                <div className="mb-20 d-flex justify-between align-middle flex-row">
                  <div
                    className="draft-button fs-12"
                    onClick={() => {
                      handleSubmit("Draft");
                    }}
                  >
                    Draft
                  </div>
                  <div
                    className="publish-button fs-12"
                    onClick={() => {
                      handleShowPublicModal();
                    }}
                  >
                    Publish
                  </div>
                </div>
                <div className="d-flex justify-between align-middle flex-row">
                  <div
                    className="preview-button fs-12"
                    onClick={handlePreviewShow}
                  >
                    Preview
                  </div>
                  <div className="bg-mid-gray cursor-default delete-button fs-12">
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
              handleClosePublicModal();
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
            modalHeader="Published"
            modalText={`We have successfully completed the release of the Application. Please Check it on the Application.`}
            secondBtnText="Ok"
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
            modalQuestionImage={questionImage ? questionImage : ""}
            questionText={questionText ? questionText : ""}
            choiceA={choiceA ? choiceA : ""}
            choiceB={choiceB ? choiceB : ""}
            choiceC={choiceC ? choiceC : ""}
          />
        )}
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default NewQuestion;
