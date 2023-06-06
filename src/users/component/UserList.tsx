import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

import "../../assets/style/user/userList.css";
import {
  blue,
  white,
  midGray,
  previewLightGreen
} from "../../assets/style/color";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import Loader from "../../Components/loader/Loader";
import { DebounceInput } from "react-debounce-input";
import { userList } from "../service/user";
import { getFormattedDateTime } from "../../Services/utils/getFormattedDateTime";
import NoRecordComponent from "../../Components/noRecordComponent/NoRecordComponent";
import CSS from "csstype";
import { getUserType } from "../../Services/type/type";

function UserList() {
  //const { handleShowUserDetails, setSelectedUser } = props;
  const [fetchedData, setFetchedData] = useState([] as getUserType[]);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [startStage, setStartStage] = useState<number | null | any>(null);
  const [endStage, setEndStage] = useState<number | null | any>(null);
  const [startPoint, setStartPoint] = useState<number | null | any>(null);
  const [endPoint, setEndPoint] = useState<number | null | any>(null);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [height, setHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const getResponseDate = (date: string) => {
    if (Date.parse(date) > Date.now()) return true;
    return false;
  };
  const userListPaginationBar: CSS.Properties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: height > clientHeight + 130 ? "absolute" : "relative",
    bottom: height > clientHeight + 130 ? "50px" : "0"
  };

  const columns = [
    {
      name: "No",
      selector: (row: any) => row.id,
      cell: (row: any, id: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div className="fs-12">{id + 1}</div>
        </Link>
      )
    },
    {
      name: "Status",
      selector: (row: any) => row.contract,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div
            className={`fs-10 text-center width-100 border-radius-25 ${
              row.status === false
                ? `bg-white color-light-dark border-solid-light-dark`
                : row.contractExpiredAt === null ||
                  getResponseDate(row.contractExpiredAt) === false
                ? `bg-yellow color-dark border-solid-yellow`
                : `bg-blue color-white border-solid-blue`
            }`}
            style={{
              padding: "3px 0"
            }}
          >
            {row.status === false
              ? "Deletion"
              : row.contractExpiredAt === null ||
                getResponseDate(row.contractExpiredAt) === false
              ? "Free"
              : "Paid"}
          </div>
        </Link>
      )
    },
    {
      name: "Mail",
      selector: (row: any) => row.email,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          {" "}
          <div className="fs-12 h-30 d-flex justify-center align-items-center width-100-pt cursor-pointer whitespace-nowrap">
            {row.email}
          </div>
        </Link>
      ),
      grow: 2
    },
    {
      name: "Name",
      selector: (row: any) => row.firstName + " " + row.lastName,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div className="width-100-pt cursor-pointer fs-12 h-30 d-flex justify-center align-items-center">
            {(row?.firstName ?? " ") + " " + (row?.lastName ?? " ")}
          </div>
        </Link>
      ),
      grow: 2,
      style: {
        paddingLeft: "5px"
      }
    },
    {
      name: <span className="ml-20">Coin</span>,
      selector: (row: any) => row.coin,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div className="width-100-pt cursor-pointer fs-12  h-30 d-flex justify-center align-items-center">
            <div className="width-20"></div>
            {row.coin === null ? "-" : row.coin}
          </div>
        </Link>
      )
    },
    {
      name: "Stage",

      selector: (row: any) => row.stage,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          {" "}
          <div className="width-100-pt cursor-pointer fs-12  h-30 d-flex justify-center align-items-center">
            {row.stage === null ? "-" : row.stage}
          </div>
        </Link>
      )
    },
    {
      name: "Create",
      grow: 2,
      selector: (row: any) => row.userCreatedDate,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          {" "}
          <div className="width-100-pt cursor-pointer whitespace-nowrap fs-12 h-30 d-flex justify-center align-items-center">
            {getFormattedDateTime(row.userCreatedDate)}
          </div>
        </Link>
      )
    },
    {
      right: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`,
      cell: (row: any) => (
        <Link
          to={`user-details/${encodeURIComponent(row.SK)}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          {" "}
          <div
            className="fs-12 h-30 d-flex justify-center align-items-center"
            style={{
              width: "100%",
              cursor: "pointer",
              color: "transparent",
              userSelect: "none"
            }}
          >
            None
          </div>
        </Link>
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
      onChangePage(currentPage + 1);
      setcurrentPageNumber(currentPageNumber + 1);
    };
    const handleDoubleNextButtonClick = () => {
      onChangePage(totalPage);
      setcurrentPageNumber(totalPage);
    };

    const handlePageNumber = (e: any) => {
      setcurrentPageNumber(Number(e.target.value));
      onChangePage(Number(e.target.value));
    };
    const previosDisabled = currentPageNumber === 1;
    const nextDisabled = currentPageNumber === totalPage;
    // const pageDisabled;

    return (
      <div
        className="d-flex flex-column justify-content-flex-start pagination-nav-bar"
        style={userListPaginationBar}
      >
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
                className="page-link pagination-btn"
                onClick={handlePageNumber}
                value={currentPageNumber}
                style={{
                  backgroundColor: `${blue}`,
                  color: `${white}`
                }}
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
                    currentPageNumber + 1 <= totalPage ? `${blue}` : `${white}`,
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
                    currentPageNumber + 2 <= totalPage ? `${blue}` : `${white}`,
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
                    currentPageNumber + 3 <= totalPage ? `${blue}` : `${white}`,
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
                    currentPageNumber + 4 <= totalPage ? `${blue}` : `${white}`,
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
    );
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
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      style: {
        "&:nth-child(1)": {
          maxWidth: "55px !important",
          minWidth: "50px !important"
        },
        "&:nth-child(2)": {
          maxWidth: "140px !important",
          minWidth: "130px !important",
          paddingLeft: "10px",
          paddingRight: "0"
        },
        "&:nth-child(3)": {
          maxWidth: "460px !important",
          width: "410px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          maxWidth: "165px !important",
          width: "135px !important",
          paddingLeft: "10px"
        },
        "&:nth-child(5)": {
          maxWidth: "105px !important",
          wdth: "95px !important",
          paddingLeft: "10px",
          paddingRight: "0"
        },
        "&:nth-child(6)": {
          maxWidth: "95px !important",
          width: "85px !important",
          paddingLeft: "10px",
          paddingRight: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "100% !important",
          width: "85px !important",
          paddingLeft: "10px",
          paddingRight: "0"
        },
        "&:nth-child(8)": {
          width: "50px !important",
          paddingRight: "0"
        }
      }
    },
    cells: {
      style: {
        "&:nth-child(1)": {
          maxWidth: "55px !important",
          minWidth: "50px !important"
        },
        "&:nth-child(2)": {
          maxWidth: "140px !important",
          minWidth: "130px !important",
          paddingLeft: "10px",
          paddingRight: "0"
        },
        "&:nth-child(3)": {
          maxWidth: "440px !important",
          width: "390px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          maxWidth: "165px !important",
          width: "135px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          maxWidth: "105px !important",
          width: "95px !important",
          padding: "0"
        },
        "&:nth-child(6)": {
          maxWidth: "95px !important",
          width: "85px !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "100% !important",
          width: "85px !important",
          padding: 0
        },
        "&:nth-child(8)": {
          width: "50px !important",
          padding: "0"
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

  const handleSetStartPoint = (e: any) => {
    setStartPoint(parseInt(e.target.value));
  };
  const handleSetEndPoint = (e: any) => {
    setEndPoint(parseInt(e.target.value));
  };
  const handleSetStartStage = (e: any) => {
    setStartStage(parseInt(e.target.value));
  };
  const handleSetEndStage = (e: any) => {
    setEndStage(parseInt(e.target.value));
  };

  const fetchUserList = async () => {
    setDataLoaded(false);
    let contractBooleanValue =
      contract === "false" ? false : contract === "true" ? true : null;

    if (isNaN(startPoint)) {
      setStartPoint(null);
    }

    if (isNaN(endPoint)) {
      setEndPoint(null);
    }
    if (isNaN(startStage)) {
      setStartStage(null);
    }
    if (isNaN(endStage)) {
      setEndStage(null);
    }

    const response = await userList(
      currentPageNumber,
      filterText,
      contractBooleanValue,
      status,
      startPoint,
      endPoint,
      startStage,
      endStage
    );
    setFetchedData(response?.items);
    setFrom(response?.from);
    // setSelectedThemeList([]);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setTotalPage(response?.totalPage);

    if (response?.totalItem === null) {
      setFetchedData([]);
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }
    setDataLoaded(true);
  };
  const resizeAdjust = () => {
    var style = document.getElementById("user_list");
    setHeight(window.innerHeight);
    // setClientHeight(style?.clientHeight);
  };
  useEffect(() => {
    fetchUserList();
  }, [
    currentPageNumber,
    contract,
    filterText,
    status,
    startPoint,
    endPoint,
    startStage,
    endStage
  ]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div
          className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12"
          id="user_list"
        >
          <div className="d-flex flex-column">
            <span className="fs-20">Users</span>
            <div
              className="user-list-data-table-wrapper position-relative"
              style={{ minHeight: "80vh" }}
            >
              <div className=" d-flex flex-row justify-between p-0 width-100-pt mb-10 align-items-flex-end">
                <div className="user-list-data-table-header d-flex flex-row flex-start">
                  <div className="mr-20 width-100">
                    <span className="fs-10">Status</span>
                    <div className="width-180 position-relative">
                      <div className="select-input mt-0 position-relative">
                        <select
                          onChange={(e: any) => {
                            setContract(e.target.value);
                          }}
                          className="bg-white custom-select fs-10 py-1 ps-2 me-2 color-dark width-100"
                        >
                          <option value="">全て</option>
                          <option value="false">Free</option>
                          <option value="true">Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mr-20">
                    <span className="fs-10">Stage</span>
                    <div className="mt-0 position-relative d-flex align-items-baseline flex-row color-dark">
                      <DebounceInput
                        placeholder="1"
                        debounceTimeout={300}
                        type="number"
                        className="bg-white form-control keyword-search-no-icon width-100"
                        onChange={handleSetStartStage}
                      />
                      <span className="mx-1 color-dark">〜</span>
                      <DebounceInput
                        placeholder="32"
                        debounceTimeout={300}
                        type="number"
                        className="bg-white form-control keyword-search-no-icon width-100"
                        onChange={handleSetEndStage}
                      />
                    </div>
                  </div>
                  <div className="mr-20">
                    <span className="fs-10">Point</span>
                    <div
                      className="position-relative d-flex flex-row align-items-baseline"
                      style={{ width: "250px" }}
                    >
                      <DebounceInput
                        placeholder="数字を入力"
                        debounceTimeout={300}
                        type="number"
                        className="bg-white form-control keyword-search-no-icon"
                        onChange={handleSetStartPoint}
                      />
                      <span className="mx-1 color-dark">〜</span>
                      <DebounceInput
                        placeholder="数字を入力"
                        debounceTimeout={300}
                        className="form-control keyword-search-no-icon"
                        type="number"
                        onChange={handleSetEndPoint}
                      />
                    </div>
                  </div>
                  <div className="mr-20">
                    <span className="fs-10">Keyword</span>
                    <div className="width-180 position-relative">
                      <DebounceInput
                        placeholder="キーワードを入力"
                        debounceTimeout={300}
                        className="form-control keyword-search"
                        onChange={(event) => setFilterText(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div id="data-table-wrapper">
                <DataTable
                  columns={columns}
                  data={fetchedData}
                  pagination
                  paginationPerPage={16}
                  paginationComponent={BootyPagination}
                  customStyles={customStyles}
                  persistTableHead={true}
                  progressPending={!dataLoaded}
                  progressComponent={<Loader />}
                  noDataComponent={<NoRecordComponent />}
                />
              </div>
            </div>
            {/* {!dataLoaded && <Loader />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
