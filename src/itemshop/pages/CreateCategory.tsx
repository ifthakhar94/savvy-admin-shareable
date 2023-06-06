import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import NewDragDrop from "../../Components/dragndropimage/NewDragDrop";
import { useNavigate } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import { CategoryPositionListType } from "../../Services/type/type";
import ModalBox from "../../Components/modal/ModalBox";
import { publishedContents } from "../../Components/modal/modalContents";
import PreviewModalBox from "../components/PreviewModalBox";
import { getCategoryUIPosition,createCategory } from "../service/CategoryListService";
import Loader from "../../Components/loader/Loader";
import { categoryList } from "../../assets/static/routes";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  const [showPreview, setShowPreview] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [positionNumber, setPositionNumber] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(true)
  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState([] as CategoryPositionListType[]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false); //Modal codes
  const handleShowPreview = () => {
    console.log(showPreview);
    setShowPreview(true);
  };
  
  const handleClosePreview = () => {
    setShowPreview(false);
  };
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const fetchCategoryUIPosition = () => {
    setDataLoaded(false)
    getCategoryUIPosition()
     .then((response) => {
      setItemList(response); 
     // console.log(response?.find((item: any)=> item.isUsed === false).position)
      setPositionNumber(response?.find((item: any)=> item.isUsed === false).position)
    })
setDataLoaded(true)
  }
  useLayoutEffect(()=> 
  fetchCategoryUIPosition()
  ,[])
  const handleChange = (e:any) => {
    console.log(e.target.value)
    setPositionNumber(e.target.value)
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = async (status: string) => {
    if (categoryName === '' || categoryName?.length >20 ) {
      setError(true);
      return;
    }else {
      setError(false)
      try{
        setDataLoaded(false)
        console.log(categoryName, positionNumber, status)
        const response = await createCategory(categoryName,positionNumber,status)
        if(response) {
          if(status === 'Draft' || status === 'Deleted') handleShowCompleteModal()
          else handleShow()
         }
       }catch(e){console.log(e)}
       setDataLoaded(true)
    }
    
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
                  className={`title-input ${categoryName === '' && error && 'border-red'}`}
                />
              </div>
              {/* category and coin */}
              <div className="d-flex flex-wrap-wrap">
                <div className="select_input mb-4">
                  <div className="mb-1">
                    <span className="color-dark fs-12">Position</span>
                    <span className="asterisk">&#42;</span>
                  </div>
                  <select className={`custom-select fs-14 ps-2 width-200 h-35 bg-white ${positionNumber === 0 && error ? 'border-red' : ''} ${positionNumber === 0 ? 'color-mid-gray' : 'color-dark'}`}
                  onChange={handleChange}>
                    {itemList?.map((item: any, index: number): any => (
                      <option key={index} value={item.position} disabled={item.isUsed} className={`${positionNumber === 0 && 'color-light-gray'}`}>
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
                <div className="status-value">New</div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-20">
                  <div className="fs-12 draft-button"                   
                  onClick={() => handleSubmit('Draft')}>Draft</div>
                  <div className="fs-12 publish-button"
                  onClick={() => handleSubmit('Published')}
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
                  <div className="fs-12 delete-button bg-mid-gray">Delete</div>
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
