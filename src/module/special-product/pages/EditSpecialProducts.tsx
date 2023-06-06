import React, { useState, useLayoutEffect } from "react";
import Layout from "../../../Layout/Index";
import ModalBox from "../../../Components/modal/ModalBox";
import PreviewModalBox from "../component/PreviewModalBox";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import NewDragDrop from "../../../Components/dragndropimage/NewDragDrop";
import {
  getJapanMapList,
  getSpecialProduct,
  updateSpecialProduct
} from "../service/specialProduct";
import { imageUploadSpecialProduct } from "../service/imageUploadSpecialProduct";
import {
  completeContents,
  deleteContents,
  publicContents,
  publishedContents
} from "../../../Components/modal/modalContents";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import DialogBox from "../../../Components/modal/DialogBox";
import { specialProductList } from "../../../assets/static/routes";
import { acceptedImageFileType, allImageSize } from "../../../assets/static/static";

function EditSpecialProducts() {
  const navigate = useNavigate();
  let { id }: any = useParams();
  const [specialProduct, setSpecialProduct] = useState<any>();
  const [productName, setProductName] = useState("");
  const [show, setShow] = useState(false);
  const [prefecture, setPrefecture] = useState<any>("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageDataFileName, setImageDataFileName] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [preview, setPreview] = useState(false);
  const [specialProductImage, setSpecialProductImage] = useState<any>();
  const [prefectureList, setPrefectureList] = useState<any>([]);
  const [error, setError] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

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
  const handleCloseCompletedModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompletedModal = () => {
    setShowCompleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handlePreviewClose = () => setPreview(false);
  const handlePreviewShow = () => setPreview(true);
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
    if (
      specialProductImage !== null &&
      specialProductImage?.size > allImageSize
    )
      return false;
      if(!checkFileTypeValidation(specialProductImage, acceptedImageFileType))
      return false;
    return true;
  };

  const handleSubmit = async (changedStatus: string) => {
    handleClosePublicModal();
    setShowDialog(false);

    const isValidated = checkErrors();
    if (!isValidated) {
      setError(true);
      return;
    } else setError(false);
    setDataLoaded(false);
    var imageUrl;

    if (specialProductImage) {
      imageUrl = await imageUploadSpecialProduct(
        specialProductImage,
        specialProductImage.type
      );
    } else {
      imageUrl = specialProduct?.imageData;
    }

    const response = await updateSpecialProduct(
      specialProduct?.SK,
      productName,
      imageUrl,
      imageDataFileName,
      JSON.parse(prefecture).id,
      changedStatus
    );
    if (response) {
      if (changedStatus === "Published") handleShow();
      else handleShowCompletedModal();
    }
    setDataLoaded(true);
  };

  async function getPrefectureList() {
    const response = await getJapanMapList();
    setPrefectureList(response);
  }
  async function getSingleSpecialProduct(SK: string) {
    const response = await getSpecialProduct(SK);
    setProductName(response?.productName);
    setImageDataFileName(response?.imageDataFileName);
    setSpecialProduct(response);
    setPrefecture(JSON.stringify(response?.prefecture));
  }
  const fetchAllData = async () => {
    setDataLoaded(false);
    try {
      await Promise.all([
        getPrefectureList(),
        getSingleSpecialProduct(decodeURIComponent(id))
      ]);
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  useLayoutEffect(() => {
    fetchAllData();
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
            <span className="back-btn" onClick={() => navigate(-1)}>
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
                link={specialProduct?.imageData}
                fileName={imageDataFileName}
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
                name={"productName"}
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
                  className="custom-select fs-14 ps-2 color-dark h-35 width-200 bg-white"
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
                <div
                  className={`status-value ${
                    specialProduct?.questionStatus === "Published"
                      ? "bg-blue color-white border-solid-blue"
                      : specialProduct?.questionStatus === "Draft"
                      ? "bg-yellow color-black border-solid-yellow"
                      : "border-solid-mid-gray"
                  }`}
                >
                  {specialProduct?.questionStatus}
                </div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-4">
                  <div
                    className="fs-12 draft-button"
                    onClick={() => {
                      handleSubmit("Draft");
                    }}
                  >
                    Draft
                  </div>
                  <div
                    className="fs-12 publish-button"
                    onClick={() => {
                      handleShowPublicModal();
                    }}
                  >
                    Publish
                  </div>
                </div>
                <div className="d-flex flex-row justify-between">
                  {" "}
                  <div
                    className="fs-12 preview-button"
                    onClick={handlePreviewShow}
                  >
                    Preview
                  </div>
                  <div
                    className="fs-12 fs-12 delete-button bg-red cursor-pointer"
                    onClick={() => {
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
        {preview && (
          <PreviewModalBox
            show={preview}
            handleClose={handlePreviewClose}
            modalHeader="Preview"
            image={specialProductImage || specialProduct?.imageData}
            productName={`${productName}`}
            prefecture={`(${JSON.parse(prefecture).jp})`}
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
              navigate(`${specialProductList}`);
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}
        {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              handleSubmit("Deleted");
              handleCloseDeleteModal();
            }}
            handleClose={handleCloseDeleteModal}
            modalHeader={deleteContents.modalHead}
            modalText={deleteContents.modalText}
            firstBtnText={deleteContents.firstBtnText}
            secondBtnText={deleteContents.secondBtnText}
          />
        )}
        {showCompleteModal && (
          <ModalBox
            show={showCompleteModal}
            handleClose={() => {
              navigate(`${specialProductList}`);
              handleCloseCompletedModal();
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

export default EditSpecialProducts;
