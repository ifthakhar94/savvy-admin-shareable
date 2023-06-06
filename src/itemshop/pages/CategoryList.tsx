import React from "react";
import Layout from "../../Layout/Index";
import { forwardRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { blue, midGray, previewLightGreen } from "../../assets/style/color";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import Loader from "../../Components/loader/Loader";
//import { getSpecialProductTimerTrialQuestionList } from "../service/getSpecialProductTimerTrialQuestionList";
import { getFormattedDateTime } from "../../Services/utils/getFormattedDateTime";
import ModalBox from "../../Components/modal/ModalBox";
//import { deleteSpecialProductTimerTrialQuestion } from "../service/deleteSpecialProductTimerTrialQuestion";
import {
  completeContents,
  deleteContents
} from "../../Components/modal/modalContents";
import { createCategory, editCategory } from "../../assets/static/routes";
import { getCategoryList } from "../service/CategoryListService";
import NoRecordComponent from "../../Components/noRecordComponent/NoRecordComponent";
function CategoryList() {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([] as any);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [dataLoaded, setDataLoaded] = useState(true);
  const [selectedThemeList, setSelectedThemeList] = useState<any>([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalItem, setTotalItem] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [responceData, setResponceData] = useState([]);

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
  const columns = [
    // {
    //   name: "Id",
    //   selector: (row: any) => row,
    //   cell: (row: any) => (
    //     <Link to={"/item-shop/edit-item"}>
    //       <div className="fs-12 text-center cursor-pointer">{row.Id}</div>
    //     </Link>
    //   )
    // },
    {
      name: "Category",
      selector: (row: any) => row.title,
      cell: (row: any) => (
        <Link to={`${editCategory}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 text-center cursor-pointer">{row.title}</div>
        </Link>
      )
    },
    {
      name: "Position",
      selector: (row: any) => row.appUiPosition,
      cell: (row: any) => (
        <Link to={`${editCategory}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 cursor-pointer whitespace-nowrap">
            {row.appUiPosition}
          </div>
        </Link>
      )
    },
    {
      name: "Update",
      selector: (row: any) => row.updatedAt,
      cell: (row: any) => (
        <Link to={`${editCategory}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 whitespace-nowrap cursor-pointer">{getFormattedDateTime(row.updatedAt)}
          </div>
        </Link>
      )
    },
    {
      name: "Create",
      selector: (row: any) => row.createdAt,
      cell: (row: any) => (
        <Link to={`${editCategory}/${encodeURIComponent(row.SK)}`}>
        <div className="fs-12 whitespace-nowrap">{getFormattedDateTime(row.createdAt)}</div>
        </Link>
      )
    },
    {
      name: "Creator",

      selector: (row: any) => row.createdBy,
      cell: (row: any) => (
        <Link to={`${editCategory}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 whitespace-nowrap cursor-pointer ">
            {row.createdBy}
          </div>
        </Link>
      )
    }
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "30px",
        border: `1px solid ${midGray}`,
        "&:hover": {
          border: `1px solid ${previewLightGreen}`,
          cursor: "pointer"
        },
        "&:input[type='checkbox']:checked": {
          backgroundColor: `1px solid ${blue} !important`
        },
        backgroundColor: "white !important"
      }
    },
    headRow: {
      style: {
        fontWeight: "normal",
        minHeight: "25px",
        paddingBottom: "5px",
        fontSize: "12px"
      }
    }
  };

  const handleDelete = async () => {
    setDataLoaded(false);
    /* const config: any = await deleteSpecialProductTimerTrialQuestion(
      selectedThemeList
    );
    const response = await axios(config);
    if (response?.data?.errors) {
      if (response?.data?.errors[0]?.errorType === "BadRequestException") {
        handleBadRequestException();
      }
      if (response?.data?.errors[0]?.errorType === "ExpiredTokenException") {
        handleExpiredTokenException();
      }
    }
    */

    setDataLoaded(true);
    handleShowCompletedModal();
    };

  // fetch data from the server
  const fetchStageList = async () => {
    setDataLoaded(false);
    const response = await getCategoryList();
    // localStorage.setItem("lastStageSortKey", response.lastStageSortKey);
    // console.log(response);
    setResponceData(response);
    // setFetchedData(response?.items);
    // // setSelectedTheme("");
    // setFrom(response?.from);
    // setTo(response?.to);
    // setTotalItem(response?.totalItem);
    // setTotalPage(response?.totalPage);
    //  var resubmit = await handleApiError(response?.data);
    //  if (resubmit) fetchStageList();
    // if (response.totalItem === null) {
    //   setFetchedData([]);
    //   setTo(0);
    //   setFrom(0);
    //   setTotalItem(0);
    // }
    setDataLoaded(true);
  };
  useEffect(() => {
    fetchStageList();
    // resizeAdjust();
  }, []);

  // const resizeAdjust = () => {
  //   var style = document.getElementById("stage_list");
  //   setHeight(window.innerHeight);
  //   setClientHeight(style?.clientHeight);
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", resizeAdjust);

  //   return () => {
  //     window.removeEventListener("resize", resizeAdjust);
  //   };
  // }, []);
  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="back-btn">
              <span className="back-btn" onClick={() => navigate(-1)}>
                &lt; Back
              </span>
            </div>
            <div className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12">
              <div className="d-flex justify-content-between">
                <span className="fs-20">Category</span>
              </div>

              <div className="special-product-data-table-wrapper">
                <div className="special-product-data-table-header d-flex flex-row justify-between p-0 mb-10 width-100-pt">
                  <div className="d-flex flex-row flex-start"></div>
                  <div className="d-flex flex-row flex-start">
                    <div className="question-btn-wrapper  mt-3">
                      <button
                        type="submit"
                        className="fs-12 width-80 color-white bg-blue h-35 border-radius-5"
                        onClick={() => navigate(`${createCategory}`)}
                      >
                        NEW
                      </button>
                    </div>
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={responceData}
                  customStyles={customStyles}
                  persistTableHead={true}
                  progressPending={!dataLoaded}
                  progressComponent={<Loader />}
                  noDataComponent={<NoRecordComponent />}
                />
              </div>
            </div>
          </div>
        </div>
        {!dataLoaded && <Loader />}
        {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              handleDelete();
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
              navigate("/time-trial/special-products");
              handleCloseCompletedModal();
            }}
            modalHeader={completeContents.modalHead}
            modalText={completeContents.modalText}
            secondBtnText={completeContents.secondBtnText}
          />
        )}
      </React.Fragment>
    </Layout>
  );
}

export default CategoryList;
