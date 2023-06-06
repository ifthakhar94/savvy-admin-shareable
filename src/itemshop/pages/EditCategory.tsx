import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import NewDragDrop from "../../Components/dragndropimage/NewDragDrop";
import { useNavigate } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import { CategoryPositionListType } from "../../Services/type/type";
import ModalBox from "../../Components/modal/ModalBox";
import { publishedContents, deleteContents, completeContents, publicContents } from "../../Components/modal/modalContents";
import PreviewModalBox from "../components/PreviewModalBox";
import { getCategoryUIPosition, updateCategory, getCategory } from "../service/CategoryListService";
import Loader from "../../Components/loader/Loader";
import { categoryList } from "../../assets/static/routes";
import { useParams } from "react-router";

export default function EditCategory() {
  const navigate = useNavigate();
  const {id} : any = useParams()
    const [showPreview, setShowPreview] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [positionNumber, setPositionNumber] = useState(9);
  const [shopCategoryStauts, setShopCategoryStatus] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const [dataLoaded, setDataLoaded] = useState(false)
  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState([] as CategoryPositionListType[]);
  const handleShowPreview = () => {
    setShowPreview(true);
  };
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleClosePublicModal = () => {
    setShowPublicModal(false);
  };
  const handleShowPublicModal = () => {
    setShowPublicModal(true);
  };
  const fetchCategory = async(categorySK : string) => {
    setDataLoaded(false)
  const response = await getCategory(categorySK)
  if(response) {
    setShopCategoryStatus(response.shopCategoryStatus)
    setCategoryName(response.title)
    setPositionNumber(response.appUiPosition)
  }
  console.log(response)
  setDataLoaded(true)
  }
  useLayoutEffect(()=>{
    const categorySK = decodeURIComponent(id);
    fetchCategoryUIPosition();
    fetchCategory(categorySK);
  },[])
  const handleClosePreview = () => {
    setShowPreview(false);
  };
  const fetchCategoryUIPosition = () => {
 getCategoryUIPosition().then((response) => setItemList(response))
setDataLoaded(true)
  }

  const handleChange = (e:any) => {
    setPositionNumber(e.target.value)
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = async (status: string) => {
    setDataLoaded(false)
    try{
     const response = await updateCategory(categoryName,status,positionNumber,decodeURIComponent(id))
     if(response) {
      if(status === 'Draft' || status === 'Deleted') handleShowCompleteModal()
      else handleShow()
     }
    }catch(e){console.log(e)}
    setDataLoaded(true)
  }
  return (
    <>
      <Layout>
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
                  <span className="fs-12 color-dark">Category name</span>{" "}
                  <span className="asterisk">&#42;</span>
                  <span
                    className={`ms-1 fs-10 ${
                      categoryName?.length > 20 ? `color-red` : `color-light-dark`
                    }`}
                  >
                    ※Up to 20 characters
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  value={categoryName}
                  name="title"
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="title-input"
                />
              </div>
              {/* category and coin */}
              <div className="d-flex flex-wrap-wrap">
                <div className="select_input mb-4">
                  <div className="mb-1">
                    <span className="color-dark fs-12">Position</span>
                    <span className="asterisk">&#42;</span>
                  </div>
                  <select className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                  onChange={handleChange}
                  value={positionNumber}
                  >
                    {itemList?.map((item: any, index: number): any => (
                      <option key={index} value={item.position} disabled={item.isUsed}>
                        {item.position}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div className={`status-value ${
                      shopCategoryStauts === "Published"
                        ? `bg-blue color-white border-solid-blue`
                        : shopCategoryStauts === "Draft"
                        ? `bg-yellow color-black border-solid-yellow`
                        : `bg-white border-solid-dark-gray`
                    }`}>{shopCategoryStauts}</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-20">
                  <div className="fs-12 draft-button"                   
                  onClick={() => handleSubmit('Draft')}>Draft</div>
                  <div className="fs-12 publish-button"
                  onClick={handleShowPublicModal}
                  >Publish</div>
                </div>
                <div className="d-flex flex-row justify-between">
                  {" "}
                  <div
                    className="fs-12 preview-button"
                    style={{
                      visibility: "hidden"
                    }}
                    onClick={handleShowPreview}
                  >
                    Preview
                  </div>
                  <div className="fs-12 delete-button bg-red"                   
                  onClick={handleShowDeleteModal}
>Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(`${categoryList}`);
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}
         {showPublicModal && (
          <ModalBox
            show={showPublicModal}
            handleActionNClose={() => {
              handleSubmit("Published");
              handleClosePublicModal()
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
         {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              handleSubmit('Deleted');
              handleCloseDeleteModal();
            }}
            handleClose={handleCloseDeleteModal}
            modalHeader={deleteContents.modalHead}
            modalText={deleteContents.modalText}
            firstBtnText={deleteContents.firstBtnText}
            secondBtnText={deleteContents.secondBtnText}
          />
        )}
        {!dataLoaded && <Loader/>}
        {/* {showPreview && (
          <PreviewModalBox
            show={showPreview}
            modalHeader="Preview"
            handleClose={handleClosePreview}
            image={newItemShopImage}
          />
        )} */}
      </Layout>
    </>
  );
}
