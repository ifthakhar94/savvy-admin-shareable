import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import NewDragDrop from "../../Components/dragndropimage/NewDragDrop";
import { useNavigate } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import PreviewModalBox from "../components/PreviewModalBox";
import Loader from "../../Components/loader/Loader";
import { createItem, getCategoryList } from "../services/itemshop";
import { categoryType } from "../../Services/type/type";
import { imageUploadSignedUrl } from "../services/fileUploadSignedUrl";
import ModalBox from "../../Components/modal/ModalBox";
import { publishedContents } from "../../Components/modal/modalContents";
import { itemShopList } from "../../assets/static/routes";
import DialogBox from "../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import {
  acceptedImageFileType,
  allImageSize
} from "../../assets/static/static";

export default function CreateItem() {
  const navigate = useNavigate();
  const [image, setImage] = useState<any>({
    data: null,
    fileName: ""
  });
  const [showPreview, setShowPreview] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [item, setItem] = useState({ name: "", coin: "", category: "" });
  const [categoryList, setCategoryList] = useState([] as categoryType[]);
  const [showDialog, setShowDialog] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
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
  const fetchCategoryList = async () => {
    setDataLoaded(false);
    const response = await getCategoryList();
    if (response) {
      setCategoryList(response);
      setItem({ ...item, category: JSON.stringify(response[0]) }); // need to fix later
    }
    setDataLoaded(true);
  };
  useLayoutEffect(() => {
    fetchCategoryList();
  }, []);
  const handleChangeItem = (e: any) => {
    setShowDialog(true);
    setItem({ ...item, [e.target.name]: e.target.value });
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

  const isValidated = () => {
    if (
      !image?.data ||
      !checkImageValidation(image?.data) ||
      !checkFileTypeValidation(image?.data, acceptedImageFileType)
    )
      return false;

    if (item.name?.length > 20 || item.name?.length === 0) return false;
    if (Number(item.coin) === 0) return false;
    return true;
  };
  //shop#category#d9c78bb1-50d9-42d0-bdf1-3718acc1ec42
  //shop#category#d9c78bb1-50d9-42d0-bdf1-3718acc1ec42
  const handleUploadFile = async () => {
    return await imageUploadSignedUrl(image?.data, image?.data.type);
  };
  const handleSubmit = async (e: any) => {
    setShowDialog(false);
    setDataLoaded(false);
    try {
      if (isValidated()) {
        setError(false);
        let imageUrl: any = await handleUploadFile();
        const response = await createItem(
          JSON.parse(item.category)?.categorySortKey,
          item.name,
          imageUrl,
          image?.fileName,
          Number(item.coin)
        );
        if (response) {
          handleShow();
        }
        // console.log(
        //   JSON.parse(item.category)?.categorySortKey,
        //   item.name,
        //   imageUrl,
        //   image?.fileName,
        //   item.coin
        // );
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
              <div
                className={`color-red fs-10 mb-1 ${
                  error ? "opacity-1" : "opacity-0"
                }`}
              >
                Please note that some fields have not been filled in.
              </div>
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
              <NewDragDrop
                title="Img data"
                setImageFile={(file: any) => {
                  setImage({ data: file, fileName: file.name });
                  setShowDialog(true);
                }}
                error={error}
                // link={fetchedData?.image}
              />
            </div>

            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between">
                  {/* <div
                    className="fs-12 preview-button"
                    // onClick={handleShowPreview}
                  >
                    Preview
                  </div> */}
                  <div className="fs-12 publish-button" onClick={handleSubmit}>
                    Publish
                  </div>
                  <div className="fs-12 delete-button bg-mid-gray">Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPreview && (
          <PreviewModalBox
            show={showPreview}
            modalHeader="Preview"
            handleClose={handleClosePreview}
            image={image}
          />
        )}
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
        {!dataLoaded && <Loader />}
      </Layout>
    </>
  );
}
