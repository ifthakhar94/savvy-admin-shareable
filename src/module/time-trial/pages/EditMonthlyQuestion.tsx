import React, { useState, useLayoutEffect } from "react";
import Layout from "../../../Layout/Index";
import { updateMonthlyTimerTrialQuestionTheme } from "../service/timeTrial";
import ModalBox from "../../../Components/modal/ModalBox";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import { imageUpload } from "../../../Services/api/imageUpload";
import { imageUploadSymbol } from "../../../Services/api/imageUploadSymbol";
import {
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import DialogBox from "../../../Components/modal/DialogBox";
import { deleteMonthlyTimerTrialQuestionTheme } from "../service/deleteMonthlyTimerTrialQuestionTheme";
import { getMonthlyTimerTrialQuestionTheme } from "../service/timeTrial";
import { deleteContents } from "../../../Components/modal/modalContents";
import {
  acceptedImageFileType,
  allImageSize
} from "../../../assets/static/static";

function EditMonthlyQuestion() {
  let { id }: any = useParams();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [themeInfo, setThemeInfo] = useState({ title: "", status: "", SK: "" });
  const [dataLoaded, setDataLoaded] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [symbolImage, setSymbolImage] = useState<any>();
  const [backgroundImageFileName, setBackgroundImageFileName] = useState<any>();
  const [symbolImageFileName, setSymbolImageFileName] = useState<any>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [boardText, setBoardText] = useState("");

  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    handleClosePublicModal();
    setShowDialog(false);
    setDataLoaded(false);
    var [newBackgroundImageUrl, newSymbolImageUrl] = await Promise.all([
      typeof backgroundImage !== "string" && backgroundImage !== undefined
        ? await imageUpload(backgroundImage, backgroundImage.type)
        : backgroundImage,
      typeof symbolImage !== "string" && symbolImage !== undefined
        ? await imageUploadSymbol(symbolImage, symbolImage.type)
        : symbolImage
    ]);
    const response = await updateMonthlyTimerTrialQuestionTheme(
      themeInfo.SK,
      newBackgroundImageUrl,
      backgroundImageFileName,
      newSymbolImageUrl,
      symbolImageFileName,
      boardText
    );
    if (response) handleShow();

    setDataLoaded(true);
  };

  const checkFileTypeValidation = (file: any, acceptedType: any) => {
    if (
      acceptedType.includes(
        file?.type?.slice(file?.type.lastIndexOf("/") + 1, file?.type.length)
      )
    )
      return true;

    return false;
  };

  const checkErrors = () => {
    if (boardText.length > 40 || boardText.length === 0) {
      return false;
    }
    if (backgroundImage.size > allImageSize) {
      return false;
    }
    if (
      typeof backgroundImage !== "string" &&
      !checkFileTypeValidation(backgroundImage, acceptedImageFileType)
    )
      return false;
    if (
      typeof symbolImage !== "string" &&
      !checkFileTypeValidation(symbolImage, acceptedImageFileType)
    )
      return false;
    if (
      typeof backgroundImage !== "string" &&
      backgroundImage !== null &&
      backgroundImage !== undefined &&
      backgroundImage?.size > allImageSize
    )
      return false;

    if (
      typeof symbolImage !== "string" &&
      symbolImage !== null &&
      symbolImage !== undefined &&
      symbolImage?.size > allImageSize
    )
      return false;
    return true;
  };
  const handlePublishSubmit = () => {
    if (checkErrors()) {
      setError(false);
      handleShowPublicModal();
    } else {
      setError(true);
    }
  };
  const fetchTimeTrialDetails = async (id: string) => {
    setDataLoaded(false);
    const response = await getMonthlyTimerTrialQuestionTheme(id);
    if (response) {
      setBoardText(response.boardText);
      setThemeInfo({
        title: response?.title,
        status: response?.currentStatus,
        SK: response.SK
      });
      setBackgroundImage(response?.backgroundImage);
      setSymbolImage(response?.symbolImage);
      setBackgroundImageFileName(response?.backgroundImageFileName);
      setSymbolImageFileName(response?.symbolImageFileName);
    }
    setDataLoaded(true);
  };
  useLayoutEffect(() => {
    fetchTimeTrialDetails(decodeURIComponent(id));
  }, []);
  // Delete Button is within comment section. This function will not be called.
  /*
  const handleDeleteTheme = async () => {
    setDataLoaded(false);
    const config: any = await deleteMonthlyTimerTrialQuestionTheme(data?.SK);
    const response = await axios(config);
    console.log(response);
    var resubmit = await handleApiError(response?.data);
    if (resubmit) handleDeleteTheme();
    handleCloseDeleteModal();
    navigate(-1);
    setDataLoaded(true);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };*/
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
              <div className="fs-14 mb-3">{themeInfo.title}</div>
              <NewDragDrop
                title="background image"
                setImageFile={(file: any) => {
                  setBackgroundImage(file);
                  setBackgroundImageFileName(file.name);
                  setShowDialog(true);
                }}
                link={backgroundImage}
                fileName={backgroundImageFileName}
              />
              <NewDragDrop
                title="Symbol image"
                setImageFile={(file: any) => {
                  setSymbolImage(file);
                  setSymbolImageFileName(file.name);
                  setShowDialog(true);
                }}
                link={symbolImage}
                fileName={symbolImageFileName}
              />
              <label className="   ">
                <span className="fs-12 color-dark">Board text</span>{" "}
                <span className="asterisk">&#42;</span>
                <span
                  className={`fs-10 ml-20 ${
                    error && boardText.length > 40
                      ? `color-red`
                      : `color-light-dark`
                  }`}
                >
                  ※Up to 40 characters
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Description Text"
                value={boardText}
                onChange={(e) => {
                  setBoardText(e.target.value);
                  if (boardText.length > 40) setError(true);
                  else setError(false);
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
                <div
                  className={`status-value ${
                    themeInfo.status === "waiting"
                      ? `bg-yellow border-solid-yellow color-black`
                      : themeInfo.status === "closed"
                      ? `bg-light-gray borer-solid-mid-gray color-light-gray`
                      : `bg-blue border-solid-blue color-white`
                  }`}
                >
                  {themeInfo.status}
                </div>
              </div>
              <div className="status-control-btn d-flex flex-row justify-content-flex-end">
                <button
                  className="fs-12 publish-button"
                  type="submit"
                  onClick={handlePublishSubmit}
                >
                  Publish
                </button>
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
        {/* {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={handleDeleteTheme}
            handleClose={handleCloseDeleteModal}
            modalHeader={deleteContents.modalHead}
            modalText={deleteContents.modalText}
            firstBtnText={deleteContents.firstBtnText}
            secondBtnText={deleteContents.secondBtnText}
          />
        )} */}
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default EditMonthlyQuestion;
