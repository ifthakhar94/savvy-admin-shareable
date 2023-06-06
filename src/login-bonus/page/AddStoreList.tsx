import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import { useNavigate } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import Loader from "../../Components/loader/Loader";
import ModalBox from "../../Components/modal/ModalBox";
import {
  pdfUploadContents,
  unsuccessfullUploadContents
} from "../../Components/modal/modalContents";
import { loginBonusList } from "../../assets/static/routes";
import DialogBox from "../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { pdfFileUploadSignedUrl } from "../service/pdfFileUploadSignedUrl";
import { acceptedPdfFileType, allImageSize } from "../../assets/static/static";
import DragnDropPdfUpload from "../../Components/dragndroppdfUpload/DragnDropPdfUpload";

export default function AddStoreList() {
  const navigate = useNavigate();
  const [pdf, setPdf] = useState<any>({
    data: null,
    fileName: ""
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showUnsuccessfulUploadModal, setUnsuccessfulUploadModal] =
    useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const handleShowUnsuccessfulUploadModal = () => {
    setUnsuccessfulUploadModal(true);
  };
  const handleShowPreview = () => {
    setShowPreview(true);
  };
  const handleClosePreview = () => {
    setShowPreview(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useLayoutEffect(() => {}, []);

  const checkPdfValidation = (file: any) => {
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

  const isValidated = () => {
    if (
      !checkPdfValidation(pdf?.data) ||
      !checkFileTypeValidation(pdf?.data, acceptedPdfFileType)
    )
      return false;

    return true;
  };

  const handleUploadFile = async () => {
    return await pdfFileUploadSignedUrl(pdf?.data);
  };
  const handleSubmit = async (e: any) => {
    setShowDialog(false);
    setDataLoaded(false);
    try {
      if (isValidated()) {
        setError(false);
        let { pdfUrl, error }: any = await handleUploadFile();
        if (!error) handleShow();
        else handleShowUnsuccessfulUploadModal();
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  return (
    <>
      <Layout>
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
              <h5>Upload Store List PDF</h5>
              {/* <div
                className={`color-red fs-10 mb-1 ${
                  error ? "opacity-1" : "opacity-0"
                }`}
              >
                Please note that some fields have not been filled in.
              </div> */}
              <DragnDropPdfUpload
                title="Pdf"
                setImageFile={(file: any) => {
                  setPdf({ data: file, fileName: file.name });
                  setShowDialog(true);
                }}
                error={error}
              />
            </div>

            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between">
                  <a
                    href={`https://savvy-backend-resource-bucket.s3.amazonaws.com/shop/list/pdfshop_list.pdf`}
                    target="_blank"
                  >
                    <div
                      className="fs-12 preview-button"
                      // onClick={handleShowPreview}
                    >
                      Preview
                    </div>
                  </a>

                  <div className="fs-12 publish-button" onClick={handleSubmit}>
                    Upload
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {showPreview && (
          <PreviewModalBox
            show={showPreview}
            modalHeader="Preview"
            handleClose={handleClosePreview}
            pdf={pdf}
          />
        )} */}
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(`${loginBonusList}`);
              handleClose();
            }}
            modalHeader={pdfUploadContents.modalHead}
            modalText={pdfUploadContents.modalText}
            secondBtnText={pdfUploadContents.secondBtnText}
          />
        )}
        {showUnsuccessfulUploadModal && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(`${loginBonusList}`);
              handleClose();
            }}
            modalHeader={unsuccessfullUploadContents.modalHead}
            modalText={unsuccessfullUploadContents.modalText}
            secondBtnText={unsuccessfullUploadContents.secondBtnText}
          />
        )}
        {!dataLoaded && <Loader />}
      </Layout>
    </>
  );
}
