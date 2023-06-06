import React, { useState, useEffect } from "react";
import Layout from "../../../../Layout/Index";
import {
  blue,
  lightDark,
  red,
  white,
  yellow
} from "../../../../assets/style/color";
import { createStage } from "../service/stageService";
import NewDragDrop from "../../../../Components/dragndropimage/NewDragDrop";
import ModalBox from "../../../../Components/modal/ModalBox";
import { useNavigate } from "react-router-dom";
import { stageImageUpload } from "../service/stageImageUpload";
import Loader from "../../../../Components/loader/Loader";
import DialogBox from "../../../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import {
  publishedContents,
  completeContents,
  publicContents
} from "../../../../Components/modal/modalContents";
import {
  acceptedImageFileType,
  allImageSize
} from "../../../../assets/static/static";

function NewStageCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [imageData, setImageData] = useState<any>();
  const [imageDataFileName, setImageDataFileName] = useState("");
  const [stageStatus, setStageStatus] = useState<any>("Draft");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [server_error, setServer_error] = useState(false);
  const [lastStageSortKey, setLastStageSortKey] = useState<any>();
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  // data send to server
  const handleSubmit = async () => {
    try {
      handleClosePublicModal();
      setShowDialog(false);

      setDataLoaded(false);
      var imageUrl = await stageImageUpload(imageData, imageData.type);

      const response = await createStage(
        imageUrl,
        imageDataFileName,
        stageStatus
      );
      // handleShow();
      if (stageStatus === "Published") handleShow();
      if (stageStatus === "Draft") handleShowCompleteModal();
    } catch (error) {
      setServer_error(true);
      setShow(false);
    }
    setDataLoaded(true);
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

  const handleCloseServerErrorModal = () => {
    setServer_error(false);
  };

  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const checkImageValidation = (file: any) => {
    if (file && file?.size > allImageSize) {
      return false;
    }
    return true;
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
  // checking validation errors
  const checkErrors = () => {
    // if(!checkFileTypeValidation(imageData, acceptedImageFileType))
    // return false;

    if (
      !checkImageValidation(imageData) ||
      !checkFileTypeValidation(imageData, acceptedImageFileType)
    )
      return false;

    if (!imageData || imageData === undefined) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  //  modal events call
  const handlePublishSubmit = () => {
    if (checkErrors()) {
      setStageStatus("Published");
      handleShowPublicModal();
    }
  };

  // onchange modal events
  const handleDraftSubmit = () => {
    if (checkErrors()) {
      setStageStatus("Draft");
      handleSubmit();
    }
  };

  useEffect(() => {
    setLastStageSortKey(localStorage.getItem("lastStageSortKey"));
  }, []);

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
            <span className="back-btn" onClick={() => navigate("/stage")}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <div className="fs-12 mb-3">Stage</div>
              <div className="fs-14 mb-3">{lastStageSortKey}</div>

              <NewDragDrop
                title="Img data"
                setImageFile={(file: any) => {
                  setImageData(file);
                  setImageDataFileName(file.name);
                  setShowDialog(true);
                }}
                error={error}
              />
              {/* {!imageData && (
                <span
                  className="ms-1 fs-10"
                  style={{
                    color: error ? `${red}` : `${lightDark}`
                  }}
                >
                  {error ? "Img data required" : ""}
                </span>
              )} */}
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="color-dark fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-row justify-between">
                <button
                  className="fs-12"
                  type="submit"
                  style={{
                    backgroundColor: `${yellow}`,
                    color: `${"#000"}`,
                    padding: "10px 20px",
                    borderRadius: "3px",
                    minWidth: "80px"
                  }}
                  onClick={() => handleDraftSubmit()}
                >
                  Draft
                </button>
                <button
                  className="fs-12"
                  type="submit"
                  style={{
                    backgroundColor: `${blue}`,
                    color: `${white}`,
                    padding: "10px 20px",
                    borderRadius: "3px",
                    minWidth: "80px"
                  }}
                  onClick={() => handlePublishSubmit()}
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
              navigate(-1);
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}

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
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default NewStageCreate;
