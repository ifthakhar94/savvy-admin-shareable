import React, { useState, useEffect } from "react";
import Layout from "../../../Layout/Index";
import ModalBox from "../../../Components/modal/ModalBox";
import PreviewModalBox from "../component/PreviewModalBox";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import {
  createSpecialProduct,
  getJapanMapList
} from "../service/specialProduct";
import { imageUploadSpecialProduct } from "../service/imageUploadSpecialProduct";
import {
  publishedContents,
  completeContents,
  publicContents
} from "../../../Components/modal/modalContents";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import DialogBox from "../../../Components/modal/DialogBox";
import { acceptedImageFileType, allImageSize, defaultPrefecture } from "../../../assets/static/static";
import { prefectureListType } from "../../../Services/type/type";
function NewSpecialProducts() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [productName, setProductName] = useState("");
  const [show, setShow] = useState(false);
  const [prefecture, setPrefecture] = useState<any>();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [imageDataFileName, setImageDataFileName] = useState("");
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [preview, setPreview] = useState(false);
  const [specialProductImage, setSpecialProductImage] = useState<any>();
  const [prefectureList, setPrefectureList] = useState(
    [] as prefectureListType[]
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const categoryPrimaryKey =
    "timetrialquestion#bda2e087-9b22-4ed5-be53-3a0020297b2e";
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
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => setPreview(true);

  const handleSubmit = async (changedStatus: string) => {
    handleClosePublicModal();
    setShowDialog(false);
    setDataLoaded(false);
    var imageUrl = await imageUploadSpecialProduct(
      specialProductImage,
      specialProductImage.type
    );
    const response = await createSpecialProduct(
      categoryPrimaryKey,
      productName,
      imageUrl,
      imageDataFileName,
      JSON.parse(prefecture).id,
      changedStatus
    );
    if (response) {
      if (changedStatus === "Published") handleShow();
      else handleShowCompleteModal();
    }
    setDataLoaded(true);
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
    if (productName?.length === 0 || productName?.length > 20) return false;
    if (specialProductImage == null) return false;
    if (specialProductImage !== null && specialProductImage.size > allImageSize)
      return false;
    if(!checkFileTypeValidation(specialProductImage, acceptedImageFileType))
      return false;
    
    return true;
  };
  const handleDraftSubmit = () => {
    if (checkErrors()) {
      setError(false);
      handleSubmit("Draft");
    } else {
      setError(true);
    }
  };
  const handlePublicSubmit = () => {
    if (checkErrors()) {
      setError(false);
      handleShowPublicModal();
    } else {
      setError(true);
    }
  };

  async function getPrefectureList() {
    setDataLoaded(false);
    const response = await getJapanMapList();
    if (response) {
      setPrefectureList(response);
      setPrefecture(
        JSON.stringify(
          response?.find(
            (i: prefectureListType) =>
              i.en.toLowerCase() === defaultPrefecture.toLowerCase()
          )
        )
      );
    }
    setDataLoaded(true);
  }
  useEffect(() => {
    getPrefectureList();
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
            <span
              className="back-btn"
              onClick={() => navigate("/time-trial/special-products")}
            >
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <NewDragDrop
                title="Image data"
                setImageFile={(file: any) => {
                  setSpecialProductImage(file);
                  setImageDataFileName(file.name);
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
              <div className="mb-1">
                <span className="fs-12 color-dark">Product name</span>
                <span className="asterisk">&#42;</span>
                <span
                  className={`fs-10 ml-50 ${
                    productName.length > 20 ? "color-red" : "color-light-dark"
                  }`}
                >
                  ※Upto 20 characters
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                className={`fs-14 ${
                  error && productName?.length === 0
                    ? "border-red"
                    : "border-solid-light-dark"
                }`}
                onChange={(e) => {
                  setProductName(e.target.value);
                  setShowDialog(true);
                }}
                max={20}
              />
              <div className="select-input">
                <div className="mb-1">
                  <span className="color-dark fs-12">Answer</span>
                  <span className="asterisk">&#42;</span>
                </div>
                <select
                  onChange={(e: any) => {
                    setPrefecture(e.target.value);
                    setShowDialog(true);
                  }}
                  value={prefecture}
                  className="custom-select bg-white fs-14 ps-2 color-dark width-200 h-35"
                >
                  {prefectureList?.map((item: any, index: number): any => (
                    <option key={index} value={JSON.stringify(item)}>
                      {item.jp}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-4">
                  <div
                    className="fs-12 draft-button"
                    onClick={() => handleDraftSubmit()}
                  >
                    Draft
                  </div>
                  <div
                    className="fs-12 publish-button"
                    onClick={() => handlePublicSubmit()}
                  >
                    Publish
                  </div>
                </div>
                <div className="d-flex flex-row justify-between">
                  {" "}
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
        {preview && (
          <PreviewModalBox
            show={preview}
            handleClose={handlePreviewClose}
            modalHeader="Preview"
            image={specialProductImage}
            productName={`${productName}` || ""}
            prefecture={`(${JSON.parse(prefecture).jp})` || ""}
          />
        )}
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
        {!dataLoaded && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default NewSpecialProducts;
