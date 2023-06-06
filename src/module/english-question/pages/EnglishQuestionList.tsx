import React from "react";
import Layout from "../../../Layout/Index";
import { forwardRef, useState } from "react";
import DataTable from "react-data-table-component";
import {
  red,
  blue,
  white,
  yellow,
  midGray,
  previewLightGreen
} from "../../../assets/style/color";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import Loader from "../../../Components/loader/Loader";
import { getFormattedDateTime } from "../../../Services/utils/getFormattedDateTime";
import ModalBox from "../../../Components/modal/ModalBox";
import { deleteEnglishQuestion } from "../service/englishquestion";
import { DebounceInput } from "react-debounce-input";
import {
  completeContents,
  deleteContents
} from "../../../Components/modal/modalContents";
import {
  getEnglishQuestionType,
  getStageListType,
  getFormatListType
} from "../../../Services/type/type";
import NoRecordComponent from "../../../Components/noRecordComponent/NoRecordComponent";
import CSS from "csstype";
import ModalCSVEnglishQuestion from "../../../Components/modal/ModalCSVEnglishQuestion";

function EnglishQuestionList({
  fetchEnglishQuestion,
  fetchedData,
  to,
  from,
  currentPageNumber,
  setCurrentPageNumber,
  setFilterText,
  setStatus,
  setStage,
  setFormat,
  selectedThemeList,
  setSelectedThemeList,
  stageList,
  formatList,
  totalPage,
  totalItem,
  dataLoaded,
  setDataLoaded
}: any) {
  const navigate = useNavigate();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [height, setHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [internalLoader, setInternalLoader] = useState(true);
  const englishQuestionBottomPaginationBar: CSS.Properties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: height > clientHeight + 250 ? "absolute" : "relative",
    bottom: height > clientHeight + 250 ? "50px" : "0"
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
    if (selectedThemeList.length) setShowDeleteModal(true);
  };
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
    headCells: {
      style: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "&:nth-child(1)": {
          maxWidth: "55px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(2)": {
          maxWidth: "100px !important",
          minWidth: "80px !important",
          padding: "0"
        },
        "&:nth-child(3)": {
          // maxWidth: "60px !important",
          minWidth: "90px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          // maxWidth: "125px !important",
          minWidth: "115px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          // maxWidth: "400px !important",
          // minWidth: "100px !important",
          padding: "0",
          paddingLeft: "23px"
        },
        "&:nth-child(6)": {
          maxWidth: "200px !important",
          minWidth: "150px !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "200px !important",
          minWidth: "150px !important",
          padding: "0"
        },
        "&:nth-child(8)": {
          maxWidth: "400px !important",
          minWidth: "250px !important",
          paddingLeft: '20px',
          paddingRight: "0"
        },
        "&:nth-child(9)": {
          width: "50px !important",
          paddingRight: "0"
        }
      }
    },
    cells: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      style: {
        "&:nth-child(1)": {
          maxWidth: "55px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(2)": {
          maxWidth: "100px !important",
          minWidth: "80px !important",
          padding: "0"
        },
        "&:nth-child(3)": {
          minWidth: "90px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          minWidth: "115px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          padding: "0"
        },
        "&:nth-child(6)": {
          maxWidth: "200px !important",
          minWidth: "150px !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "200px !important",
          minWidth: "150px !important",
          padding: "0"
        },
        "&:nth-child(8)": {
          maxWidth: "400px !important",
          minWidth: "250px !important",
          paddingRight: "0"
        },
        "&:nth-child(9)": {
          width: "50px !important",
          paddingRight: "0"
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
  const getQuestionFormatUiComponentName = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace("_", "")
      .replace(/\s+/g, "");
  };
  const columns = [
    {
      name: "Status",
      selector: (row: any) => row.questionStatus,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt"
        >
          <div
            className="fs-10 text-center cursor-pointer d-flex justify-content-center align-items-center"
            style={{
              backgroundColor:
                row.questionStatus === "Draft" ? `${yellow}` : `${blue}`,
              color: row.questionStatus === "Draft" ? "black" : "white",
              minWidth: "80px",
              padding: "3px 0",
              textAlign: "center",
              borderRadius: "25px"
            }}
          >
            {row.questionStatus}
          </div>
        </Link>
      )
    },
    {
      name: <span className="ml-20">Stage</span>,
      selector: (row: any) => row.stageTitle,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
        >
          <div className="width-20"></div>
          <div className="fs-12 text-center cursor-pointer  h-30 d-flex justify-center align-items-center">
            {row.stageTitle}
          </div>
        </Link>
      )
    },
    {
      name: "Format",
      selector: (row: any) => row.questionFormat,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
        >
          <div className="fs-12 cursor-pointer whitespace-nowrap  h-30 d-flex justify-center align-items-center">
            {row.questionFormat}
          </div>
        </Link>
      ),
      maxWidth: "200px",
      minWidth: "150px"
    },
    {
      name: (
        <span>
          {" "}
          <div className="width-20"></div>Title
        </span>
      ),
      selector: (row: any) => row.title,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
          // style={{maxWidth: '400px',minWidth: '100px'}}
        >
          <div className="width-20"></div>
          <div className="fs-12 whitespace-nowrap cursor-pointer h-30 d-flex justify-center align-items-center">
            {row.title}
          </div>
        </Link>
      ),
      // maxWidth: '300px',
      // minWidth: '500px',
      grow: 4
    },
    {
      name: "Update",
      selector: (row: any) => row.updatedAt,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
        >
          <div className="width-5"></div>
          <div className="fs-12 whitespace-nowrap h-30 d-flex justify-center align-items-center">
            {getFormattedDateTime(row.updatedAt)}
          </div>
        </Link>
      ),
      maxWidth: "200px",
      minWidth: "150px"
    },
    {
      name: "Create",
      selector: (row: any) => row.createdAt,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
        >
          <div className="width-5"></div>
          <div className="fs-12 whitespace-nowrap h-30 d-flex justify-center align-items-center">
            {getFormattedDateTime(row.createdAt)}
          </div>
        </Link>
      ),
      maxWidth: "200px",
      minWidth: "150px"
    },
    {
      name: "Creator",
      selector: (row: any) => row.createdBy,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
        >
          <div className="width-10"></div>
          <div className="fs-12 whitespace-nowrap cursor-pointer  h-30 d-flex justify-center align-items-center">
            {row.createdBy}
          </div>
        </Link>
      )
      // maxWidth: '250px',
      // minWidth: '200px',
    },
    {
      right: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`,
      cell: (row: any) => (
        <Link
          to={`/english-question/edit-english-question/${encodeURIComponent(
            row.questionFormat
          )}/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-center align-items-center"
        >
          <div className="fs-12 cursor-pointer h-30 d-flex justify-center align-items-center color-transparent user-select-none">
            None
          </div>
        </Link>
      )
    }
  ];
  const BootyPagination = ({ onChangePage, currentPage }: any) => {
    const handleDoubleBackButtonClick = () => {
      onChangePage(1);
      setCurrentPageNumber(1);
    };
    const handleBackButtonClick = () => {
      onChangePage(currentPageNumber - 1);
      setCurrentPageNumber(currentPageNumber - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
      setCurrentPageNumber(currentPageNumber + 1);
    };
    const handleDoubleNextButtonClick = () => {
      onChangePage(totalPage);
      setCurrentPageNumber(totalPage);
    };

    const handlePageNumber = (e: any) => {
      // console.log(Number(e.target.value));
      //setActiveBtn(pageNumber);
      setCurrentPageNumber(Number(e.target.value));
      onChangePage(Number(e.target.value));
    };
    const previosDisabled = currentPageNumber === 1;
    const nextDisabled = currentPageNumber === totalPage;
    // const pageDisabled;

    return (
      <div className="pagination-wrapper">
        <div
          className="english-question-bottom-pagination-bar"
          style={englishQuestionBottomPaginationBar}
        >
          <button
            type="button"
            className="fs-10 text-center color-white mb-20"
            style={{
              backgroundColor: selectedThemeList?.length
                ? `${red}`
                : `${midGray}`,
              padding: "5px 5px",
              borderRadius: "5px",
              width: "60px",
              cursor: selectedThemeList.length ? "pointer" : "default"
            }}
            onClick={() => handleShowDeleteModal()}
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
                    backgroundColor: previosDisabled
                      ? `${midGray}`
                      : `${white}`,
                    color: previosDisabled ? `${white}` : `${blue}`,
                    border: previosDisabled
                      ? `1px solid ${midGray}`
                      : `1px solid ${blue}`
                  }}
                  disabled={previosDisabled}
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
                    backgroundColor: previosDisabled
                      ? `${midGray}`
                      : `${white}`,
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
                  className="page-link pagination-btn color-white bg-blue"
                  onClick={handlePageNumber}
                  value={currentPageNumber}
                >
                  {currentPageNumber}
                </button>
              </li>
              <li>
                <button
                  className="page-link pagination-btn"
                  onClick={(e: any) =>
                    currentPageNumber + 1 <= totalPage && handlePageNumber(e)
                  }
                  value={currentPageNumber + 1}
                  disabled={currentPageNumber + 1 <= totalPage ? false : true}
                  style={{
                    backgroundColor:
                      currentPageNumber + 1 <= totalPage
                        ? `${white}`
                        : `${midGray}`,
                    color:
                      currentPageNumber + 1 <= totalPage
                        ? `${blue}`
                        : `${white}`,
                    border:
                      currentPageNumber + 1 <= totalPage
                        ? `1px solid ${blue}`
                        : `1px solid ${midGray}`,
                    cursor: currentPageNumber + 1 <= totalPage ? "pointer" : ""
                  }}
                >
                  {currentPageNumber + 1}
                </button>
              </li>
              <li>
                <button
                  className="page-link pagination-btn"
                  onClick={(e: any) =>
                    currentPageNumber + 2 <= totalPage && handlePageNumber(e)
                  }
                  value={currentPageNumber + 2}
                  disabled={currentPageNumber + 2 <= totalPage ? false : true}
                  style={{
                    backgroundColor:
                      currentPageNumber + 2 <= totalPage
                        ? `${white}`
                        : `${midGray}`,
                    color:
                      currentPageNumber + 2 <= totalPage
                        ? `${blue}`
                        : `${white}`,
                    border:
                      currentPageNumber + 2 <= totalPage
                        ? `1px solid ${blue}`
                        : `1px solid ${midGray}`,
                    cursor: currentPageNumber + 2 <= totalPage ? "pointer" : ""
                  }}
                >
                  {currentPageNumber + 2}
                </button>
              </li>
              <li>
                <button
                  className="page-link pagination-btn"
                  onClick={(e: any) =>
                    currentPageNumber + 3 <= totalPage && handlePageNumber(e)
                  }
                  value={currentPageNumber + 3}
                  disabled={currentPageNumber + 3 <= totalPage ? false : true}
                  style={{
                    backgroundColor:
                      currentPageNumber + 3 <= totalPage
                        ? `${white}`
                        : `${midGray}`,
                    color:
                      currentPageNumber + 3 <= totalPage
                        ? `${blue}`
                        : `${white}`,
                    border:
                      currentPageNumber + 3 <= totalPage
                        ? `1px solid ${blue}`
                        : `1px solid ${midGray}`,
                    cursor: currentPageNumber + 3 <= totalPage ? "pointer" : ""
                  }}
                >
                  {currentPageNumber + 3}
                </button>
              </li>
              <li>
                <button
                  className="page-link pagination-btn"
                  onClick={(e: any) =>
                    currentPageNumber + 4 <= totalPage && handlePageNumber(e)
                  }
                  value={currentPageNumber + 4}
                  disabled={currentPageNumber + 4 <= totalPage ? false : true}
                  style={{
                    backgroundColor:
                      currentPageNumber + 4 <= totalPage
                        ? `${white}`
                        : `${midGray}`,
                    color:
                      currentPageNumber + 4 <= totalPage
                        ? `${blue}`
                        : `${white}`,
                    border:
                      currentPageNumber + 4 <= totalPage
                        ? `1px solid ${blue}`
                        : `1px solid ${midGray}`,
                    cursor: currentPageNumber + 4 <= totalPage ? "pointer" : ""
                  }}
                >
                  {currentPageNumber + 4}
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
                  className="page-link pagination-btn"
                  onClick={handleDoubleNextButtonClick}
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
                  <AiOutlineDoubleRight />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };
  const BootyCheckbox = forwardRef(({ onClick, ...rest }: any, ref: any) => (
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
  )) as any;
  const handleSelectedRowChange = ({ selectedRows }: any) => {
    setSelectedThemeList(selectedRows);
  };

  const handleDelete = async () => {
    setInternalLoader(false);
    const response = await deleteEnglishQuestion(selectedThemeList);
    setInternalLoader(true);
    setSelectedThemeList([]);
    handleShowCompletedModal();
  };
  const handleNewEnglishQuestionNavigate = () => {
    navigate("/english-question/new-english-question");
  };
  const handleCSVModalOpen = () => {
    setShowCSVModal(true);
  };
  const handleCSVModalClose = () => {
    setShowCSVModal(false);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value);

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStage(e.target.value);

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFormat(e.target.value);
  const handleChangeKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterText(e.target.value);

  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div
              id="english-question-list"
              className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12"
            >
              <div className="d-flex justify-content-between">
                <h6 className="question-title">English question</h6>
                <div className="question-btn-wrapper">
                  <button
                    className="fs-12 bg-yellow color-black width-80 mr-20 border-radius-5 h-35"
                    type="submit"
                    onClick={handleCSVModalOpen}
                  >
                    CSV
                  </button>
                  <button
                    className="fs-12 bg-blue color-white width-80 border-radius-5 h-35"
                    type="submit"
                    onClick={handleNewEnglishQuestionNavigate}
                  >
                    New
                  </button>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-flex-start mb-2 header-wrapper width-100-pt">
                <div className="data-table-filter-search d-flex flex-row justify-content-flex-start flex-wrap-wrap p-0">
                  <div className="me-4 width-100">
                    <span className="fs-10">Status</span>
                    <div className="position-relative">
                      <div className="mt-0 position-relative">
                        <select
                          onChange={handleStatusChange}
                          className="bg-white custom-select fs-10 py-1 ps-2 me-2 h-25 cursor-pointer width-100"
                        >
                          <option value="">All</option>
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="me-4 width-100">
                    <span className="fs-10">Stage</span>
                    <div className="width-100 position-relative">
                      <div className="mt-0 position-relative">
                        <select
                          onChange={handleStageChange}
                          className="bg-white custom-select fs-10 py-1 ps-2 me-2 h-25 width-100 cursor-pointer"
                        >
                          <option value="">All</option>
                          {stageList?.map(
                            (item: getStageListType, index: number) => (
                              <option key={index} value={item.SK}>
                                {item.title}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="me-4 width-120">
                    <span className="fs-10">Format</span>
                    <div className="width-120 position-relative">
                      <div className="mt-0 position-relative">
                        <select
                          onChange={handleFormatChange}
                          className="bg-white custom-select fs-10 py-1 ps-2 me-2 h-25 width-100-pt cursor-pointer"
                        >
                          <option value="">All</option>
                          {formatList?.map(
                            (item: getFormatListType, index: number) => (
                              <option key={index} value={item.uiComponentName}>
                                {item.title}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="fs-10">Keyword search</span>
                    <div className="width-120 position-relative">
                      <div className="mt-0 position-relative">
                        {/* <input
                        placeholder="Enter keyword"
                         onChange={(e)=> setFilterText(e.target.value)}
                         className="form-control keyword-search h-25"
                        value={filterText}
                        /> */}
                        <DebounceInput
                          placeholder="Enter keyword"
                          debounceTimeout={300}
                          className="form-control keyword-search h-25"
                          onChange={handleChangeKeywordSearch}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="data-table-wrapper">
                {dataLoaded && (
                  <DataTable
                    columns={columns}
                    data={fetchedData}
                    pagination
                    paginationComponent={BootyPagination}
                    selectableRows
                    paginationPerPage={16}
                    onSelectedRowsChange={handleSelectedRowChange}
                    selectableRowsComponent={BootyCheckbox}
                    customStyles={customStyles}
                    persistTableHead={true}
                    progressPending={!dataLoaded}
                    progressComponent={<Loader />}
                    noDataComponent={<NoRecordComponent />}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {showCSVModal && (
          <ModalCSVEnglishQuestion
            formatList={formatList}
            stageList={stageList}
            show={showCSVModal}
            handleClose={handleCSVModalClose}
            fetchEnglishQuestion={fetchEnglishQuestion}
          />
        )}
        {showDeleteModal && (
          <ModalBox
            show={showDeleteModal}
            handleActionNClose={() => {
              // console.log("clicked");
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
              fetchEnglishQuestion();
              // navigate("/english-question");
              handleCloseCompletedModal();
            }}
            modalHeader={completeContents.modalHead}
            modalText={completeContents.modalText}
            secondBtnText={completeContents.secondBtnText}
          />
        )}
        {!internalLoader && <Loader />}
      </React.Fragment>
    </Layout>
  );
}

export default EnglishQuestionList;
