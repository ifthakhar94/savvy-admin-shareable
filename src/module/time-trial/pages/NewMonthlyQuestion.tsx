import React, { useState } from "react";
import Layout from "../../../Layout/Index";
import { createMonthlyTimerTrialQuestionTheme } from "../service/timeTrial";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import ModalBox from "../../../Components/modal/ModalBox";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../Services/api/imageUpload";
import { imageUploadSymbol } from "../../../Services/api/imageUploadSymbol";
import Loader from "../../../Components/loader/Loader";
import DialogBox from "../../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import {
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import {
  acceptedImageFileType,
  allImageSize
} from "../../../assets/static/static";

function NewMonthlyQuestion() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [showPublicModal, setShowPublicModal] = useState(false);

  const categoryPrimaryKey =
    "timetrialquestion#3eac30fe-43b9-4efd-be08-3c909bc7277d"; //This PK is fixed to create any theme

  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [symbolImage, setSymbolImage] = useState<any>();
  const [backgroundImageFileName, setBackgroundImageFileName] = useState("");
  const [symbolImageFileName, setSymbolImageFileName] = useState("");
  const [boardText, setBoardText] = useState("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const handleSubmit = async () => {
    handleClosePublicModal();
    setShowDialog(false);
    setDataLoaded(false);
    var [imageUrl, secondImageUrl] = await Promise.all([
      imageUpload(backgroundImage, backgroundImage.type),
      imageUploadSymbol(symbolImage, symbolImage.type)
    ]);
    //var imageUrl = await imageUpload(backgroundImage, backgroundImage.type);
    //var secondImageUrl = await imageUploadSymbol(symbolImage, symbolImage.type);
    const response = await createMonthlyTimerTrialQuestionTheme(
      categoryPrimaryKey,
      imageUrl,
      backgroundImageFileName,
      secondImageUrl,
      symbolImageFileName,
      boardText
    );
    // var resubmit = await handleApiError(response?.data);
    // if (resubmit) handleSubmit();
    setDataLoaded(true);
    handleShow();
    // console.log(response);
    // setBoardText("New THeme");
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClosePublicModal = () => {
    setShowPublicModal(false);
  };
  const handleShowPublicModal = () => {
    setShowPublicModal(true);
  };

  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (
      (file &&
        acceptedType.includes(
          file?.type.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
        )) ||
      !file
    )
      return true;
    return false;
  };

  const checkErrors = () => {
    if (boardText.length > 40 || boardText.length === 0) {
      return false;
    }
    if (backgroundImage) {
      //console.log(typeof backgroundImage, backgroundImage)
      if (backgroundImage.size > allImageSize) {
        return false;
      }
    }
    if (symbolImage) {
      if (symbolImage.size > allImageSize) {
        return false;
      }
    }
    if (backgroundImage == null) {
      return false;
    }
    if (symbolImage == null) {
      return false;
    }
    if (!checkFileTypeValidation(backgroundImage, acceptedImageFileType))
      return false;

    if (!checkFileTypeValidation(symbolImage, acceptedImageFileType))
      return false;

    return true;
  };

  const handlePublishSubmit = () => {
    if (checkErrors()) {
      //console.log(checkErrors(), "gg");
      setError(false);
      handleShowPublicModal();
    } else {
      setError(true);
    }
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
            <span className="back-btn" onClick={() => navigate(-1)}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <div className="fs-12 mb-3">Months and years</div>
              <div className="fs-14 mb-3">
                {localStorage.getItem("nextMonthYearThemeCreation")}
              </div>

              <NewDragDrop
                title="Background image"
                setImageFile={(file: any) => {
                  setBackgroundImage(file);
                  setBackgroundImageFileName(file.name);
                  setShowDialog(true);
                }}
                error={error}
              />
              <NewDragDrop
                title="Symbol image"
                setImageFile={(file: any) => {
                  setSymbolImage(file);
                  setSymbolImageFileName(file.name);
                  setShowDialog(true);
                }}
                error={error}
              />

              <div
                className={`color-red fs-10 mb-1 ${
                  error ? "opacity-1" : "opacity-0"
                }`}
                id="error-message-text"
              >
                Please note that some fields have not been filled in.
              </div>

              <label className="   ">
                <span className="fs-12 color-dark">Board text</span>{" "}
                <span className="asterisk">&#42;</span>
                <span
                  className={`fs-10 ml-20 ${
                    boardText.length > 40 ? `color-red` : `color-light-dark`
                  }`}
                >
                  ※Up to 40 characters
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter description text"
                value={boardText}
                onChange={(e) => {
                  setBoardText(e.target.value);
                  setShowDialog(true);
                }}
                className={`fs-14 ${
                  error && boardText.length === 0 ? `border-red` : ""
                }`}
              />
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="color-dark fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-row justify-content-flex-end">
                <button
                  className="fs-12 publish-button"
                  type="submit"
                  onClick={() => handlePublishSubmit()}
                >
                  Publish
                </button>
                {/* <button
                  className="fs-12"
                  type="submit"
                  style={{
                    backgroundColor: `${midGray}`,
                    color: `${white}`,
                    padding: "10px 20px",
                    borderRadius: "3px",
                    cursor: "default"
                  }}
                >
                  Delete
                </button> */}
              </div>
            </div>
          </div>
        </div>
        {showPublicModal && (
          <ModalBox
            show={showPublicModal}
            handleActionNClose={() => {
              handleSubmit();
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
              navigate("/time-trial/monthly");
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default NewMonthlyQuestion;
