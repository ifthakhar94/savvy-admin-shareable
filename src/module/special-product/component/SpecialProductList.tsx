import { forwardRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  blue,
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
import {
  getSpecialProductList,
  deleteSpecialProduct
} from "../service/specialProduct";
import { getFormattedDateTime } from "../../../Services/utils/getFormattedDateTime";
import ModalBox from "../../../Components/modal/ModalBox";
import { DebounceInput } from "react-debounce-input";
import {
  completeContents,
  deleteContents
} from "../../../Components/modal/modalContents";
import NoRecordComponent from "../../../Components/noRecordComponent/NoRecordComponent";
import CSS from "csstype";

function SpecialProductList() {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([] as any);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [dataLoaded, setDataLoaded] = useState(true);
  const [selectedThemeList, setSelectedThemeList] = useState<any>([]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [height, setHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState<any>(0);

  const sepicalProductPagination: CSS.Properties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: height > clientHeight + 100 ? "absolute" : "relative",
    bottom: height > clientHeight + 100 ? "50px" : "0"
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
  const columns = [
    {
      name: "Status",
      selector: (row: any) => row.questionStatus,
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div
            className={`fs-10 text-center width-100 border-radius-25 ${
              row.questionStatus === "Draft"
                ? "bg-yellow color-black"
                : row.questionStatus === "Published"
                ? "bg-blue color-white"
                : "bg-mid-gray"
            } `}
            style={{
              padding: "3px 0",
              pointerEvents:
                row.questionStatus === "Deleted" ? "none" : "inherit"
            }}
          >
            {row.questionStatus}
          </div>
          <div className="width-10"></div>
        </Link>
      )
    },
    {
      name: "Product",
      selector: (row: any) => row.productName,
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div className="fs-12">{row.productName}</div>
        </Link>
      ),
      grow: 1.5
    },
    {
      name: "Prefectures",
      selector: (row: any) => row.prefecture.jp,
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start  align-items-center cursor-pointer"
        ><div className="width-5"></div>
          <div className="fs-12">{row.prefecture.jp}</div>
        </Link>
      )
    },
    {
      name: "Update",
      selector: (row: any) => getFormattedDateTime(row.updatedAt),
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        ><div className="width-5"></div>
          <div className="fs-12">{getFormattedDateTime(row.updatedAt)}</div>
        </Link>
      )
    },
    {
      name: "Create",
      selector: (row: any) => getFormattedDateTime(row.createdAt),
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        ><div className="width-10"></div>
          <div className="fs-12">{getFormattedDateTime(row.createdAt)}</div>
        </Link>
      )
    },
    {
      name: "Creator",
      selector: (row: any) => row.createdBy,
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="whitespace-nowrap width-100-pt d-flex justify-content-flex-start align-items-center cursor-pointer"
        >
          <div className="fs-12">{row.createdBy}</div>
        </Link>
      )
    },
    {
      right: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`,
      cell: (row: any) => (
        <Link
          to={`/time-trial/special-products/edit-special-product/${encodeURIComponent(
            row.SK
          )}`}
          className="width-100-pt d-flex justify-content-flex-start align-items-center"
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
      // console.log(Number(e.target.value));
      //setActiveBtn(pageNumber);
      setcurrentPageNumber(Number(e.target.value));
      onChangePage(Number(e.target.value));
    };
    const previosDisabled = currentPageNumber === 1;
    const nextDisabled = currentPageNumber === totalPage;
    // const pageDisabled;

    return (
      <div style={sepicalProductPagination}>
        <button
          type="button"
          className={`fs-10 text-center color-white mb-20 border-radius-5 width-60 p-5 ${
            selectedThemeList?.length
              ? "cursor-pointer bg-red"
              : "cursor-default bg-mid-gray"
          }`}
          onClick={() => handleShowDeleteModal()}
        >
          Delete
        </button>{" "}
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
                disabled={previosDisabled}
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
            <li>
              <button
                className={`page-link pagination-btn ${
                  currentPageNumber + 1 <= totalPage
                    ? "bg-white color-blue border-solid-blue cursor-pointer"
                    : "bg-mid-gray color-white border-solid-mid-gray"
                }`}
                onClick={(e: any) =>
                  currentPageNumber + 1 <= totalPage && handlePageNumber(e)
                }
                value={currentPageNumber + 1}
                disabled={currentPageNumber + 1 <= totalPage ? false : true}
              >
                {currentPageNumber + 1}
              </button>
            </li>
            <li>
              <button
                className={`page-link pagination-btn ${
                  currentPageNumber + 2 <= totalPage
                    ? "bg-white color-blue border-solid-blue cursor-pointer"
                    : "bg-mid-gray color-white border-solid-mid-gray"
                }`}
                onClick={(e: any) =>
                  currentPageNumber + 2 <= totalPage && handlePageNumber(e)
                }
                value={currentPageNumber + 2}
                disabled={currentPageNumber + 2 <= totalPage ? false : true}
              >
                {currentPageNumber + 2}
              </button>
            </li>
            <li>
              <button
                className={`page-link pagination-btn ${
                  currentPageNumber + 3 <= totalPage
                    ? "bg-white color-blue border-solid-blue cursor-pointer"
                    : "bg-mid-gray color-white border-solid-mid-gray"
                }`}
                onClick={(e: any) =>
                  currentPageNumber + 3 <= totalPage && handlePageNumber(e)
                }
                value={currentPageNumber + 3}
                disabled={currentPageNumber + 3 <= totalPage ? false : true}
              >
                {currentPageNumber + 3}
              </button>
            </li>
            <li>
              <button
                className={`page-link pagination-btn ${
                  currentPageNumber + 4 <= totalPage
                    ? "bg-white color-blue border-solid-blue cursor-pointer"
                    : "bg-mid-gray color-white border-solid-mid-gray"
                }`}
                onClick={(e: any) =>
                  currentPageNumber + 4 <= totalPage && handlePageNumber(e)
                }
                value={currentPageNumber + 4}
                disabled={currentPageNumber + 4 <= totalPage ? false : true}
              >
                {currentPageNumber + 4}
              </button>
            </li>
            <li className="page-item">
              <button
                className={`page-link pagination-btn ${
                  nextDisabled
                    ? "bg-mid-gray color-white border-solid-mid-gray"
                    : "bg-white color-blue border-solid-blue"
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
                disabled={nextDisabled}
              >
                <AiOutlineDoubleRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  const fetchSpecialProductList = async () => {
    setDataLoaded(false);
    const response = await getSpecialProductList(
      currentPageNumber,
      filterText,
      status
    );
    setFetchedData(response?.items);
    setFrom(response?.from);
    setSelectedThemeList([]);
    setTo(response?.to);
    setTotalItem(response?.totalItem);
    setTotalPage(response?.totalPage);
    //  var resubmit = await handleApiError(response?.data);
    // if (resubmit) fetchSpecialProductList();

    if (response?.totalItem === null) {
      setFetchedData([]);
      setTo(0);
      setFrom(0);
      setTotalItem(0);
    }

    setDataLoaded(true);
  };
  useEffect(() => {
    fetchSpecialProductList();
    setSelectedThemeList([]);
   // resizeAdjust();
  }, [currentPageNumber, filterText, status]);
  const handleSelectedRowChange = ({ selectedRows }: any) => {
    setSelectedThemeList(selectedRows);
  };
  const handleDelete = async () => {
    setDataLoaded(false);
    const response = await deleteSpecialProduct(selectedThemeList);
    setDataLoaded(true);
    if (dataLoaded) handleShowCompletedModal();
    fetchSpecialProductList();
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
        maxWidth: '100% !important',
        "&:nth-child(1)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(2)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(3)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          width: "150px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          width: "250px !important",
          padding: "0"
        },
        "&:nth-child(6)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          width: "100% !important",
          padding: "0"
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
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(2)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(3)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          width: "150px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          width: "250px !important",
          padding: "0"
        },
        "&:nth-child(6)": {
          width: "100% !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          width: "100% !important",
          paddingRight: "0"
        },
        "&:nth-child(8)": {
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
  
  const conditionalRowStyles = [
    {
      when: (row: any) => row.input === "checked",
      style: {
        backgroundColor: `${blue}`
      }
    }
  ];
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
  return (
    <div className="special-product-data-table-wrapper" id="sepecial_list">
      <div className="special-product-data-table-header d-flex flex-row justify-between p-0 width-100-pt mb-10">
        <div className="d-flex flex-row flex-start">
          <div className="me-4 width-100">
            <span className="fs-10">Status</span>
            <div className="width-180 position-relative">
              <div className="select-input mt-0 position-relative">
                <select
                  onChange={(e: any) => {
                    setStatus(e.target.value);
                  }}
                  className="bg-white custom-select fs-10 py-1 ps-2 me-2 width-100"
                >
                  <option value="all">All</option>
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
                onChange={(event) => setFilterText(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row flex-start">
          <div className="question-btn-wrapper  mt-3">
            <button
              type="submit"
              className={`fs-12 bg-blue color-white width-80 h-35 border-radius-5`}
              onClick={() =>
                navigate("/time-trial/special-products/new-special-product")
              }
            >
              NEW
            </button>
          </div>
        </div>
      </div>
      {!dataLoaded ? (
        <Loader />
      ) : (
        <div id="data-table-wrapper">
          <DataTable
            paginationPerPage={16}
            columns={columns}
            data={fetchedData}
            pagination
            paginationComponent={BootyPagination}
            selectableRows
            onSelectedRowsChange={handleSelectedRowChange}
            selectableRowsComponent={BootyCheckbox}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            persistTableHead={true}
            progressPending={!dataLoaded}
            progressComponent={<Loader />}
            noDataComponent={<NoRecordComponent />}
          />
        </div>
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
            navigate("/time-trial/special-products");
            handleCloseCompletedModal();
          }}
          modalHeader={completeContents.modalHead}
          modalText={completeContents.modalText}
          secondBtnText={completeContents.secondBtnText}
        />
      )}
      {/* {showCSVModal && (
        <ModalCSV show={showCSVModal} handleClose={handleCloseCSVModal} />
      )} */}
    </div>
  );
}

export default SpecialProductList;
