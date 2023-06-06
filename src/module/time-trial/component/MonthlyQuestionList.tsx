import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { BsThreeDots } from "react-icons/bs";
import {
  yellow,
  midGray,
  blue,
  previewLightGreen,
  white
} from "../../../assets/style/color";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import Loader from "../../../Components/loader/Loader";
import { Link } from "react-router-dom";
import { getMonthlyTimeTrialQuestionThemeList } from "../service/timeTrial";
import NoRecordComponent from "../../../Components/noRecordComponent/NoRecordComponent";
import CSS from "csstype";

function MonthlyQuestionList() {
  const [fetchedData, setFetchedData] = useState([] as any);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState<any>(0);

  const englishQuestionBottomPaginationBar: CSS.Properties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: height > clientHeight + 130 ? "absolute" : "relative",
    bottom: height > clientHeight + 130 ? "50px" : "0"
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  // this function is not used
  /*
  const handleDeleteTheme = async () => {
    setDataLoaded(false);
    const config: any = await deleteMonthlyTimerTrialQuestionTheme(
      selectedTheme
    );
    const response = await axios(config);
    var resubmit = await handleApiError(response?.data);
    if (resubmit) handleDeleteTheme();
    console.log(response);
    setDataLoaded(true);
    setcurrentPageNumber(1);
    handleClose();
  };
  */
  const customStyles = {
    rows: {
      style: {
        minHeight: "30px",
        border: `1px solid ${midGray}`,
        "&:hover": {
          border: `1px solid ${previewLightGreen}`,
          fontSize: "12px"
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
    },
    tableBody: {
      style: {
        "&:not(:last-of-type)": {
          borderRadius: "5px"
        }
      }
    }
  };
  const columns = [
    {
      name: "Status",
      selector: (row: any) => row.currentStatus,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/${encodeURIComponent(row.SK)}`}
          style={{
            pointerEvents: row.currentStatus === "Deleted" ? "none" : "inherit"
          }}
          className={`cursor-pointer width-100-pt `}
        >
          <div
            className={` min-width-100 text-align-center pt-5 pb-5 ${
              row.currentStatus === "waiting"
                ? "bg-yellow color-black"
                : row.currentStatus === "now"
                ? "bg-blue color-white"
                : "bg-mid-gray color-white"
            } fs-10 border-radius-25`}
          >
            {row.currentStatus}
          </div>
        </Link>
      )
    },
    {
      name: "Release",
      selector: (row: any) => row.title,
      cell: (row: any) => (
        <Link
          to={`/time-trial/monthly/${encodeURIComponent(row.SK)}`}
          className={`fs-12 width-100-pt cursor-pointer`}
          style={{
            pointerEvents: row.currentStatus === "Deleted" ? "none" : "inherit"
          }}
        >
          <div>{row.title}</div>
        </Link>
      )
    },
    {
      right: true,
      button: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`,
      cell: (row: any) => (
        <div
          className="edit-button text-center"
          style={{
            cursor: row.currentStatus === "Deleted" ? "none" : "pointer",
            pointerEvents: row.currentStatus === "Deleted" ? "none" : "inherit"
          }}
        >
          {selectedTheme === row.SK ? (
            <Link
              to={`/time-trial/monthly/edit-monthly-question/${encodeURIComponent(
                row.SK
              )}`}
              state={{ data: row }}
            >
              <div className="edit-style">Edit</div>
            </Link>
          ) : (
            <div
              className="color-dark fs-16"
              onClick={() => {
                setSelectedTheme(row.SK);
              }}
            >
              <BsThreeDots />
            </div>
          )}
        </div>
      )
    }
  ];

  const BootyPagination = ({ onChangePage, currentPage }: any) => {
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
      <div style={englishQuestionBottomPaginationBar}>
        {/* <button
          type="button"
          style={{
            marginBottom: "20px",
            fontSize: "10px",
            color: "white",
            backgroundColor: `${midGray}`,
            width: "60px",
            borderRadius: "5px",
            height: "20px",
            display: selectedTheme ? "block" : "none"
          }}
          onClick={() => handleShow()}
        >
          Delete
        </button> */}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className={`page-link pagination-btn ${
                  previosDisabled
                    ? "bg-mid-gray color-white border-solid-mid-gray"
                    : "bg-white color-blue border-solid-blue"
                }`}
                onClick={handleDoubleBackButtonClick}
                aria-label="previous page"
              >
                <AiOutlineDoubleLeft />
              </button>
            </li>
            <li className="page-item">
              <button
                className={`page-link pagination-btn ${
                  previosDisabled
                    ? "bg-mid-gray color-white border-solid-mid-gray"
                    : "bg-white color-blue border-solid-blue"
                }`}
                onClick={handleBackButtonClick}
                aria-label="previous page"
                disabled={previosDisabled}
              >
                <AiOutlineLeft />
              </button>
            </li>

            <li>
              <button
                className={`page-link pagination-btn bg-blue color-white`}
                onClick={handlePageNumber}
                value={currentPageNumber}
              >
                {currentPageNumber}
              </button>
            </li>

            <li className="page-item">
              <button
                className={`page-link pagination-btn ${
                  nextDisabled
                    ? "bg-mid-gray color-white border-solid-mid-gray"
                    : "border-solid-blue bg-white color-blue"
                }`}
                onClick={handleNextButtonClick}
                aria-label="next page"
                disabled={nextDisabled}
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
  const fetchThemeList = async () => {
    //await getAwsCredentials();
    const response = await getMonthlyTimeTrialQuestionThemeList(
      currentPageNumber
    );

    setFetchedData(response?.items);
    setSelectedTheme("");
    setFrom(response?.from);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setTotalPage(response?.totalPage);
    localStorage.setItem(
      "nextMonthYearThemeCreation",
      response?.nextMonthYearThemeCreation
    );
    // var resubmit = await handleApiError(response?.data);
    // if (resubmit) fetchThemeList();
    if (response?.totalItem === null) {
      setFetchedData([]);
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }
    setDataLoaded(true);
  };
  useEffect(() => {
    fetchThemeList();
    // resizeAdjust();
  }, [currentPageNumber]);
  /*
  const resizeAdjust = () => {
    var style = document.getElementById("theme-list");
    setHeight(window.innerHeight);
    setClientHeight(style?.clientHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", resizeAdjust);

    return () => {
      window.removeEventListener("resize", resizeAdjust);
    };
  }, []);
*/
  return (
    <>
      <div
        className="monthly-question-data-table-wrapper pt-50"
        id="theme-list"
      >
        {/* <div
          style={{ width: "100%" }}
          className="d-flex flex-row justify-content-flex-start"
        >
          <div
            className="data-table-filter-search d-flex flex-column flex-start position-relative"
            style={{ padding: "0", marginBottom: "15px" }}
          >
            <label style={{ fontSize: "10px" }}>Keyword search</label>
            <DebounceInput
              placeholder="Enter keyword"
              debounceTimeout={300}
              className="form-control keyword-search"
              onChange={handleChange}
            />
          </div>
        </div>{" "} */}
        <div id="data-table-wrapper">
          <DataTable
            columns={columns}
            data={fetchedData}
            pagination
            paginationComponent={BootyPagination}
            customStyles={customStyles}
            persistTableHead={true}
            progressPending={!dataLoaded}
            progressComponent={<Loader />}
            paginationPerPage={20}
            noDataComponent={<NoRecordComponent />}
          />
        </div>
      </div>
      {/* {show && (
        <ModalBox
          show={show}
          handleActionNClose={handleDeleteTheme}
          handleClose={handleClose}
          modalHeader={deleteContents.modalHead}
          modalText={deleteContents.modalText}
          firstBtnText={deleteContents.firstBtnText}
          secondBtnText={deleteContents.secondBtnText}
        />
      )} */}
      {/* {!dataLoaded && <Loader />} */}
    </>
  );
}

export default MonthlyQuestionList;
