import React, { useState } from "react";
import Layout from "../../../../Layout/Index";
import { blue, white, yellow } from "../../../../assets/style/color";
import { updateStage } from "../service/stageService";
import NewDragDrop from "../../../../Components/dragndropimage/NewDragDrop";
import ModalBox from "../../../../Components/modal/ModalBox";
import { useNavigate, useLocation } from "react-router-dom";
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

function EditStage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data }: any = location.state;
  const [show, setShow] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [imageData, setImageData] = useState<any>(data?.imageData);
  const [imageDataFileName, setImageDataFileName] = useState(
    data?.imageDataFileName
  );
  const [stageStatus, setStageStatus] = useState<any>("Draft");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [server_error, setServer_error] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  // data send to server
  const handleSubmit = async () => {
    try {
      handleClosePublicModal();
      setShowDialog(false);

      setDataLoaded(false);
      var imageUrl;
      if (typeof imageData !== "string")
        imageUrl = await stageImageUpload(imageData, imageData.type);
      else imageUrl = imageData;
      const response = await updateStage(
        imageUrl,
        imageDataFileName,
        stageStatus,
        data?.SK
      );
      console.log(response);
      // handleShow();
      if (stageStatus === "Published") handleShow();
      if (stageStatus === "Draft") handleShowCompleteModal();
    } catch (error) {
      //console.log("new stage", error);
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
          file?.type?.slice(
            file?.type?.lastIndexOf("/") + 1,
            file?.type?.length
          )
        )) ||
      !file
    )
      return true;
    return false;
  };
  // checking validation errors
  const checkErrors = () => {
    if (
      typeof imageData !== "string" &&
      (!checkImageValidation(imageData) ||
        !checkFileTypeValidation(imageData, acceptedImageFileType))
    )
      return false;

    if (imageData !== null && imageData.size > allImageSize) {
      return false;
    }

    return true;
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
              <div className="fs-12 mb-3">Stage</div>
              <div className="fs-14 mb-3">{data?.title}</div>

              <NewDragDrop
                title="Img data"
                setImageFile={(file: any) => {
                  setImageData(file);
                  setImageDataFileName(file.name);
                  setShowDialog(true);
                }}
                link={data?.imageData}
                fileName={imageDataFileName}
              />
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="color-dark fs-12">Status</div>
                <div
                  className="status-value"
                  style={{
                    backgroundColor:
                      data?.stageStatus === "Published"
                        ? `${blue}`
                        : data?.stageStatus === "Draft"
                        ? `${yellow}`
                        : "",
                    color:
                      data?.stageStatus === "Published"
                        ? `${white}`
                        : data?.stageStatus === "Draft"
                        ? `${"#000"}`
                        : "",
                    borderColor:
                      data?.stageStatus === "Published"
                        ? `${blue}`
                        : `${yellow}`
                  }}
                >
                  {data?.stageStatus}
                </div>
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
              // navigate("/time-trial/monthly");
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

export default EditStage;
