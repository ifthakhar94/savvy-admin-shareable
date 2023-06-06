import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  yellow,
  midGray,
  blue,
  previewLightGreen,
  white
} from "../../../../assets/style/color";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import Loader from "../../../../Components/loader/Loader";
import { Link } from "react-router-dom";
import { getStageList } from "../service/stageService";
import NoRecordComponent from "../../../../Components/noRecordComponent/NoRecordComponent";
import CSS from "csstype";

function StageList() {
  const [fetchedData, setFetchedData] = useState([] as any);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);

  const customStyles = {
    rows: {
      style: {
        minHeight: "30px",
        padding: "0",
        border: `1px solid ${midGray}`,
        "&:hover": {
          border: `1px solid ${previewLightGreen}`
        }
      }
    },
    columns: {
      style: {
        padding: "0"
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
      name: "No",
      selector: (row: any) => row.title,
      cell: (row: any) => (
        <Link
          to={`/stage-edit/${encodeURIComponent(row.SK)}`}
          state={{ data: row }}
          style={{
            cursor: "pointer",
            width: "100%",
            pointerEvents: row.title === "Deleted" ? "none" : "inherit"
          }}
        >
          <div
            style={{
              color: "black",
              width: "20px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: "12px",
              borderRadius: "25px"
            }}
          >
            {row.title === null ? " - " : row.title}
          </div>
        </Link>
      )
    },
    {
      name: "Status",
      selector: (row: any) => row.stageStatus,
      cell: (row: any) => (
        <Link
          to={`/stage-edit/${encodeURIComponent(row.SK)}`}
          state={{ data: row }}
          style={{
            cursor: "pointer",
            width: "100%",
            pointerEvents: row.stageStatus === "Deleted" ? "none" : "inherit"
            // backgroundColor: "red"
          }}
        >
          <div
            style={{
              backgroundColor:
                row.stageStatus === "Draft"
                  ? `${yellow}`
                  : row.stageStatus === "Published"
                  ? `${blue}`
                  : `${midGray}`,
              color: row.stageStatus === "Draft" ? "black" : "white",
              width: "87px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: "10px",
              borderRadius: "25px"
            }}
          >
            {row.stageStatus}
          </div>
        </Link>
      )
    },

    {
      name: "Image Setting",
      selector: (row: any) => row.imageData,
      cell: (row: any) => (
        <Link
          to={`/stage-edit/${encodeURIComponent(row.SK)}`}
          state={{ data: row }}
          style={{
            cursor: "pointer",
            width: "100%",
            pointerEvents: row.imageData === "Deleted" ? "none" : "inherit"
          }}
        >
          <div
            style={{
              color: "black",
              width: "50px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: "12px",
              borderRadius: "25px"
            }}
          >
            {row.imageData === null ? "No" : "Yes"}
          </div>
        </Link>
      )
    },

    {
      name: "Registered questions",
      selector: (row: any) => row.numberOfQuestion,
      cell: (row: any) => (
        <Link
          to={`/stage-edit/${encodeURIComponent(row.SK)}`}
          state={{ data: row }}
          style={{
            cursor: "pointer",
            width: "100%",
            pointerEvents:
              row.numberOfQuestion === "Deleted" ? "none" : "inherit"
          }}
        >
          <div
            style={{
              color: "black",
              width: "20px",
              padding: "5px 0",
              textAlign: "center",
              fontSize: "12px",
              borderRadius: "25px"
            }}
          >
            {row.registeredQuestions === null ? "-" : row.registeredQuestions}
          </div>
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
            cursor: row.stageStutus === "Deleted" ? "none" : "pointer",
            pointerEvents: row.stageStutus === "Deleted" ? "none" : "inherit"
          }}
        >
          {selectedTheme === row.SK ? (
            <Link to={`/stage-edit/${row.SK}`} state={{ data: row }}>
              <div className="edit-style">Edit</div>
            </Link>
          ) : (
            <div
              onClick={() => {
                setSelectedTheme(row.SK);
              }}
            >
              {/* <BsThreeDotsVertical /> */}
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
        // style={stageListPaginationBar}
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

  // fetch data from the server
  const fetchStageList = async () => {
    setDataLoaded(false);
    const response = await getStageList(currentPageNumber);
    localStorage.setItem("lastStageSortKey", response.lastStageSortKey || "");

    setFetchedData(response?.items);
    setSelectedTheme("");
    setFrom(response?.from);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setTotalPage(response?.totalPage);
    //  var resubmit = await handleApiError(response?.data);
    //  if (resubmit) fetchStageList();
    if (response.totalItem === null) {
      setFetchedData([]);
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }
    setDataLoaded(true);
  };
  useEffect(() => {
    fetchStageList();
  }, [currentPageNumber]);

  return (
    <>
      <div className="monthly-question-data-table-wrapper" id="stage_list">
        <div className="width-100-pt d-flex flex-row justify-content-flex-start">
          <div className="data-table-filter-search d-flex flex-column flex-start position-relative p-0 mb-15"></div>
        </div>{" "}
        <div id="data-table-wrapper">
        <DataTable
          columns={columns}
          data={fetchedData}
          pagination
          paginationComponent={BootyPagination}
          customStyles={customStyles}
          persistTableHead={true}
          progressPending={!dataLoaded}
          paginationPerPage={18}
          progressComponent={<Loader />}
          //onRowClicked={(row: any, event: any) => console.log(row, event)}
          noDataComponent={<NoRecordComponent />}
        />
        </div>
      </div>
      {!dataLoaded && <Loader />}
    </>
  );
}

export default StageList;
