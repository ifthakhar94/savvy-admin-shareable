import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import NewDragDrop from "../../Components/dragndropimage/NewDragDrop";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import {
  getItemDetails,
  getCategoryList,
  getUiPosition
} from "../services/itemshop";
import Loader from "../../Components/loader/Loader";
import { categoryType, itemPositionType } from "../../Services/type/type";
import DialogBox from "../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import {
  acceptedImageFileType,
  allImageSize
} from "../../assets/static/static";
import { imageUploadSignedUrl } from "../services/fileUploadSignedUrl";
import { updateItem } from "../services/itemshop";
import ModalBox from "../../Components/modal/ModalBox";
import {
  publishedContents,
  deleteContents,
  completeContents
} from "../../Components/modal/modalContents";
import { itemShopList } from "../../assets/static/routes";
import PreviewModalBox from "../components/PreviewModalBox";
export default function CreateItem() {
  const navigate = useNavigate();
  let { id }: any = useParams();
  const [dataLoaded, setDataLoaded] = useState(true);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({
    SK: "",
    name: "",
    coin: "",
    category: ""
  });
  const [categoryList, setCategoryList] = useState([] as categoryType[]);
  const [itemPosition, setItemPosition] = useState([] as itemPositionType[]);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [image, setImage] = useState<any>({
    link: "",
    data: null,
    fileName: ""
  });
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleShowPreview = () => {
    setShowPreview(true);
  };
  const handleClosePreview = () => {
    setShowPreview(false);
  };
  const handleCloseCompletedModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompletedModal = () => {
    setShowCompleteModal(true);
  };
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const fetchAllData = async (itemSK: string) => {
    setDataLoaded(false);
    try {
      const [categoryUiPostion, response] = await Promise.all([
        getUiPosition(),
        getCategoryList()
      ]);
      setItemPosition(categoryUiPostion);
      const itemDetailsResponse = await getItemDetails(itemSK);
      if (itemDetailsResponse) {
        setImage({
          ...image,
          link: itemDetailsResponse?.imageData,
          name: itemDetailsResponse?.imageDataFileName
        });
        setItem({
          SK: itemDetailsResponse?.SK,
          coin: JSON.stringify(itemDetailsResponse?.price),
          name: itemDetailsResponse?.title,
          category: JSON.stringify(
            response.find(
              (item: categoryType) =>
                item.categorySortKey === itemDetailsResponse?.categorySortKey
            )
          )
        });
        if (response) {
          setCategoryList(response);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  const handleChangeItem = (e: any) => {
    setShowDialog(true);
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  useLayoutEffect(() => {
    fetchAllData(decodeURIComponent(id));
  }, []);
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
    if (!checkFileTypeValidation(image?.data, acceptedImageFileType))
      return false;

    if (item.name?.length === 0 || item.name?.length > 20) return false;
    if (Number(item.coin) === 0) return false;
    if (image.data !== null && image.data?.size > allImageSize) return false;
    return true;
  };
  const handleSubmit = async (status: string) => {
    let imageUrl = "";
    if (status === "Deleted") {
      setShowDialog(false);
      setDataLoaded(false);
      const response = await updateItem(
        item.SK,
        item.name,
        JSON.parse(item.category).categorySortKey,
        Number(item.coin),
        imageUrl,
        image.name,
        status
      );
      setDataLoaded(true);
      if (response) {
        handleShowCompletedModal();
      }
    }
    if (isValidated()) {
      setError(false);
      setShowDialog(false);
      setDataLoaded(false);
      imageUrl =
        image.data !== null
          ? await imageUploadSignedUrl(image.data, image.data?.type)
          : image.link;
      const response = await updateItem(
        item.SK,
        item.name,
        JSON.parse(item.category).categorySortKey,
        Number(item.coin),
        imageUrl,
        image.name,
        status
      );
      setDataLoaded(true);
      if (response) {
        handleShow();
      }
      try {
      } catch (e) {
        console.log(e);
      }
    } else {
      setError(true);
    }
  };
  return (
    <>
      <Layout>
        <DialogBox
          // @ts-ignore
          showDialog={showPrompt}
          confirmNavigation={confirmNavigation}
          cancelNavigation={cancelNavigation}
        />{" "}
        <div className="content-wrapper">
          <div className="back-btn">
            <span className="back-btn" onClick={() => navigate(-1)}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <div className="mb-4">
                <label className="mb-1">
                  <span className="fs-12 color-dark">Item name</span>{" "}
                  <span className="asterisk">&#42;</span>
                  <span
                    className={`ms-1 fs-10 ${
                      item.name?.length > 20 ? "color-red" : "color-light-dark"
                    }`}
                  >
                    ※Up to 20 characters
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  value={item.name}
                  name="name"
                  onChange={handleChangeItem}
                  className={`title-input ${
                    error && item?.name.length === 0 && "border-red"
                  }`}
                />
              </div>
              {/* category and coin */}
              <div className="d-flex flex-wrap-wrap">
                <div className="select_input mb-4">
                  <div className="mb-1">
                    <span className="color-dark fs-12">Category</span>
                    <span className="asterisk">&#42;</span>
                  </div>
                  <select
                    className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                    value={item?.category}
                    name="category"
                    onChange={handleChangeItem}
                  >
                    {categoryList?.map((item: categoryType) => (
                      <option
                        key={item?.categorySortKey}
                        value={JSON.stringify(item)}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 input_coin">
                  <label className="mb-1">
                    <span className="fs-12 color-dark">Coin</span>{" "}
                    <span className="asterisk">&#42;</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={item.coin}
                    name="coin"
                    min="0"
                    onChange={handleChangeItem}
                    className={`coin-input ${
                      Number(item?.coin) === 0 && error && "border-red"
                    }`}
                  />
                </div>
              </div>

              {/* checkbox and image file start*/}

              <NewDragDrop
                title="Img data"
                setImageFile={(file: any) => {
                  setImage({ data: file, fileName: file.name });
                  setShowDialog(true);
                }}
                fileName={image.name}
                link={image.link}
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
                  <div
                    className="fs-12 publish-button"
                    onClick={() => handleSubmit("Published")}
                  >
                    Publish
                  </div>
                  <div
                    className="fs-12 delete-button bg-red cursor-pointer"
                    onClick={handleShowDeleteModal}
                  >
                    Delete
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(`${itemShopList}`);
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
              navigate(`${itemShopList}`);
              handleCloseCompletedModal();
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
        {showPreview && (
          <PreviewModalBox
            show={showPreview}
            modalHeader="Preview"
            handleClose={handleClosePreview}
            image={image?.data || image?.link}
          />
        )}
        {!dataLoaded && <Loader />}
      </Layout>
    </>
  );
}
