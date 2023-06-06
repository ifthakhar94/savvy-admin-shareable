import React, { useState, useEffect, forwardRef } from "react";
import DataTable from "react-data-table-component";
import {
  red,
  yellow,
  blue,
  midGray,
  previewLightGreen,
  white
} from "../../../assets/style/color";
import { getMonthlyTimeTrialQuestionList } from "../service/timeTrial";
import { getFormattedDateTime } from "../../../Services/utils/getFormattedDateTime";
import Layout from "../../../Layout/Index";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import { useNavigate, Link, useParams } from "react-router-dom";
import Loader from "../../../Components/loader/Loader";
import { DebounceInput } from "react-debounce-input";
import ModalCSV from "../../../Components/modal/ModalCSV";
import ModalBox from "../../../Components/modal/ModalBox";
import {
  completeContents,
  deleteContents
} from "../../../Components/modal/modalContents";
import { deleteMonthlyTimerTrialQuestion } from "../service/timeTrial";
import NoRecordComponent from "../../../Components/noRecordComponent/NoRecordComponent";
import { getQuestionType } from "../../../Services/type/type";
import CSS from "csstype";

function Question() {
  const navigate = useNavigate();
  let { id }: any = useParams();
  // let themeId = "";
  let concatData = "";
  const [fetchedData, setFetchedData] = useState([] as getQuestionType[]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("");
  const [themeId, setThemeId] = useState("");
  const [themeSK, setThemeSK] = useState("");
  const [selectedQuestionList, setSelectedQuestionList] = useState(
    [] as getQuestionType[]
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [height, setHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState<any>(0);

  const paginationQuestion: CSS.Properties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: height > clientHeight + 250 ? "absolute" : "relative",
    bottom: height > clientHeight + 250 ? "50px" : "0"
  };
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };
  const handleShowCSVModal = () => {
    setShowCSVModal(true);
  };
  const handleCloseCSVModal = () => {
    setShowCSVModal(false);
    fetchQuestionList();
  };
  const handleChange = (e: any) => {
    setFilterText(e.target.value);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    fetchQuestionList();
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "30px",
        border: `1px solid ${midGray}`,
        cursor: "pointer",
        "&:hover": {
          border: `1px solid ${previewLightGreen}`
        }
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
  const columns = [
    {
      name: "Status",
      selector: (row: any) => row.currentStatus,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/question/edit-question/${encodeURIComponent(
            row.SK + "#" + themeId
          )}`}
          state={{
            data: row
          }}
          className="cursor-pointer display-block"
        >
          <div
            style={{
              backgroundColor:
                row.questionStatus === "Draft" ? `${yellow}` : `${blue}`,
              color: row.questionStatus === "Draft" ? "black" : "white",
              minWidth: "80px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: "10px",
              borderRadius: "25px"
            }}
          >
            {row.questionStatus}
          </div>
        </Link>
      )
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/question/edit-question/${encodeURIComponent(
            row.SK + "#" + themeId
          )}`}
          state={{
            data: row
          }}
          className="cursor-pointer width-100-pt whitespace-nowrap"
        >
          <div className="fs-12">{row.title}</div>
        </Link>
      ),
      grow: 2
    },
    {
      name: "Update",
      selector: (row: any) => row.updatedAt,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/question/edit-question/${encodeURIComponent(
            row.SK + "#" + themeId
          )}`}
          state={{
            data: row
          }}
          className="cursor-pointer width-100-pt whitespace-nowrap"
        >
          <div className="fs-12">{getFormattedDateTime(row.updatedAt)}</div>
        </Link>
      )
    },
    {
      name: "Create",
      selector: (row: any) => row.createdAt,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/question/edit-question/${encodeURIComponent(
            row.SK + "#" + themeId
          )}`}
          state={{
            data: row
          }}
          className="cursor-pointer width-100-pt whitespace-nowrap"
        >
          <div className="fs-12">{getFormattedDateTime(row.createdAt)}</div>
        </Link>
      )
    },
    {
      name: "Creator",
      selector: (row: any) => row.createdBy,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/question/edit-question/${encodeURIComponent(
            row.SK + "#" + themeId
          )}`}
          state={{
            data: row
          }}
          className="cursor-pointer width-100-pt whitespace-nowrap"
        >
          <div className="fs-12">{row.createdBy}</div>
        </Link>
      )
    },
    {
      right: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`
    }
  ];

  const BootyPagination = ({ onChangePage }: any) => {
    const handleDoubleBackButtonClick = () => {
      onChangePage(1);
      setcurrentPageNumber(1);
    };
    const handleBackButtonClick = () => {
      onChangePage(currentPageNumber - 1);
      setcurrentPageNumber(currentPageNumber - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPageNumber + 1);
      setcurrentPageNumber(currentPageNumber + 1);
    };
    const handleDoubleNextButtonClick = () => {
      onChangePage(totalPage);
      setcurrentPageNumber(totalPage);
    };

    const handlePageNumber = (e: any) => {
      onChangePage(Number(e.target.value));
    };
    const nextDisabled = currentPageNumber === totalPage;
    const previosDisabled = currentPageNumber === 1;
    return (
      <div style={paginationQuestion}>
        <button
          type="button"
          className="fs-10 text-center"
          style={{
            backgroundColor: selectedQuestionList?.length
              ? `${red}`
              : `${midGray}`,
            color: "#fff",
            marginBottom: "20px",
            padding: "5px 5px",
            borderRadius: "5px",
            width: "60px",
            cursor: selectedQuestionList?.length ? "pointer" : "default"
          }}
          onClick={() => {
            if (selectedQuestionList?.length) handleShowDeleteModal();
          }}
        >
          Delete
        </button>{" "}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link pagination-btn"
                onClick={handleDoubleBackButtonClick}
                aria-label="previous page"
                style={{
                  backgroundColor: previosDisabled ? `${midGray}` : `${white}`,
                  color: previosDisabled ? `${white}` : `${blue}`,
                  border: previosDisabled
                    ? `1px solid ${midGray}`
                    : `1px solid ${blue}`
                }}
              >
                <AiOutlineDoubleLeft />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link pagination-btn"
                onClick={handleBackButtonClick}
                aria-label="previous page"
                disabled={previosDisabled}
                style={{
                  backgroundColor: previosDisabled ? `${midGray}` : `${white}`,
                  color: previosDisabled ? `${white}` : `${blue}`,
                  border: previosDisabled
                    ? `1px solid ${midGray}`
                    : `1px solid ${blue}`
                }}
              >
                <AiOutlineLeft />
              </button>
            </li>

            <li>
              <button
                className="page-link pagination-btn bg-blue color-white"
                onClick={handlePageNumber}
                value={currentPageNumber}
              >
                {currentPageNumber}
              </button>
            </li>

            <li className="page-item">
              <button
                className="page-link pagination-btn"
                onClick={handleNextButtonClick}
                aria-label="next page"
                disabled={nextDisabled}
                style={{
                  backgroundColor: nextDisabled ? `${midGray}` : `${white}`,
                  color: nextDisabled ? `${white}` : `${blue}`,
                  border: nextDisabled
                    ? `1px solid ${midGray}`
                    : `1px solid ${blue}`
                }}
              >
                <AiOutlineRight />
              </button>
            </li>
            <li className="page-item">
              <button
                className={`page-link pagination-btn ${
                  nextDisabled
                    ? "bg-mid-gray color-white border-solid-mid-gray"
                    : "bg-white color-blue border-solid-blue"
                }`}
                onClick={handleDoubleNextButtonClick}
                aria-label="next page"
              >
                <AiOutlineDoubleRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  const fetchQuestionList = async () => {
    setDataLoaded(false);
    concatData = decodeURIComponent(id);
    setThemeId(concatData.slice(concatData.length - 7, concatData.length));
    setThemeSK(
      `theme#${concatData.slice(
        concatData.lastIndexOf("timetrial"),
        concatData.length
      )}`
    );
    const response = await getMonthlyTimeTrialQuestionList(
      currentPageNumber,
      filterText,
      concatData,
      status
    );
    setFetchedData(response?.items);
    setFrom(response?.from);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setSelectedQuestionList([]);
    setTotalPage(response?.totalPage);
    if (response?.totalItem === null) {
      setFetchedData([]);
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }
    setDataLoaded(true);
  };
  const handleDelete = async () => {
    setDataLoaded(false);
    const response = await deleteMonthlyTimerTrialQuestion(
      selectedQuestionList
    );
    setDataLoaded(true);
    // setFilterText("");
    //var uncheckInput = document.querySelector(".form-check .form-check-input");
    handleShowCompleteModal();
  };
  const handleSelectedRowChange = ({ selectedRows }: any) => {
    setSelectedQuestionList(selectedRows);
  };
  useEffect(() => {
    fetchQuestionList();
    resizeAdjust();
  }, [currentPageNumber, filterText, status]);
  const BootyCheckbox = forwardRef(
    ({ onClick, ...rest }: any, ref: any): any => (
      <div className="form-check">
        <input
          htmlFor="booty-check"
          type="checkbox"
          className="form-check-input"
          ref={ref}
          onClick={onClick}
          {...rest}
        />
        <label className="form-check-label" id="booty-check" />
      </div>
    )
  ) as any;

  const resizeAdjust = () => {
    var style = document.getElementById("qus_list");
    setHeight(window.innerHeight);
    setClientHeight(style?.clientHeight);
  };
  useEffect(() => {
    resizeAdjust();
    window.addEventListener("resize", resizeAdjust);

    return () => {
      window.removeEventListener("resize", resizeAdjust);
    };
  }, []);

  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div
              className="col-lg-12 col-xl-12 col-wrapper col-md-12 col-sm-12"
              id="qus_list"
            >
              <div className="back-btn">
                <span
                  className="back-btn"
                  onClick={() => navigate("/time-trial/monthly")}
                >
                  &lt; Back
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="question-title">{themeId}</h6>
                <div className="d-flex">
                  <button
                    className="fs-12 draft-button mr-20"
                    type="submit"
                    onClick={handleShowCSVModal}
                  >
                    CSV
                  </button>
                  <button
                    className="fs-12 color-white bg-blue width-80"
                    type="submit"
                  >
                    <Link
                      to={`/time-trial/monthly/new-question/${encodeURIComponent(
                        themeSK
                      )}`}
                      className="h-35 d-flex justify-content-center align-items-center"
                    >
                      New
                    </Link>
                  </button>
                </div>
              </div>
              <div className="width-100-pt d-flex flex-row justify-content-flex-start mb-2 header-wrapper">
                <div className="data-table-filter-search d-flex flex-row justify-between p-0">
                  <div className="me-4 width-100">
                    <span className="fs-10">Status</span>
                    <div className="width-180 position-relative">
                      <div className="select-input mt-0 position-relative">
                        <select
                          onChange={(e: any) => {
                            setStatus(e.target.value);
                          }}
                          className="width-100 cursor-pointer bg-white custom-select fs-10 py-1 ps-2 me-2"
                        >
                          <option value="">All</option>
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="fs-10">Keyword search</span>
                    <div className="width-180 position-relative">
                      <DebounceInput
                        placeholder="Enter keyword"
                        debounceTimeout={300}
                        className="form-control keyword-search"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-transparent p-0">
                <div id="q-data-table-wrapper">
                  <DataTable
                    paginationPerPage={16}
                    columns={columns}
                    data={fetchedData}
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowChange}
                    selectableRowsComponent={BootyCheckbox}
                    pagination
                    paginationComponent={BootyPagination}
                    customStyles={customStyles}
                    persistTableHead={true}
                    progressPending={!dataLoaded}
                    progressComponent={<Loader />}
                    onRowClicked={(row: any, event: any) => {
                      navigate(
                        `/time-trial/monthly/question/edit-question/${encodeURIComponent(
                          row.SK + "#" + themeId
                        )}`
                      );
                    }}
                    noDataComponent={<NoRecordComponent />}
                  />
                </div>
                {/* {!dataLoaded && <Loader />} */}
              </div>
            </div>
          </div>
        </div>
        {showCSVModal && (
          <ModalCSV
            show={showCSVModal}
            handleClose={handleCloseCSVModal}
            themeSK={themeSK}
          />
        )}
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
              //fetchQuestionList();
              handleCloseCompleteModal();
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

export default Question;
