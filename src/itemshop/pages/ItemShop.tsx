import React, { useLayoutEffect, forwardRef, useState } from "react";
import Layout from "../../Layout/Index";
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
import { getFormattedDateTime } from "../../Services/utils/getFormattedDateTime";
import ModalBox from "../../Components/modal/ModalBox";
import {
  completeContents,
  deleteContents
} from "../../Components/modal/modalContents";
import {
  categoryList,
  editItem,
  itemShopList
} from "../../assets/static/routes";
import { getItemShopList, deleteItemList } from "../services/itemshop";
import NoRecordComponent from "../../Components/noRecordComponent/NoRecordComponent";
import { getItemListType } from "../../Services/type/type";
function ItemShop() {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([] as any);
  const [currentPageNumber, setcurrentPageNumber] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [selectedItemList, setSelectedItemList] = useState<any>([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalItem, setTotalItem] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseCompletedModal = () => {
    setShowCompleteModal(false);
  };
  const handleShowCompletedModal = () => {
    fetchItemShopList();
    setShowCompleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    selectedItemList.length > 0 && setShowDeleteModal(true);
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
          maxWidth: "200px !important",
          minWidth: "80px !important",

          padding: "0"
        },
        "&:nth-child(3)": {
          maxWidth: "90px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          maxWidth: "70px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          maxWidth: "150px !important",
          minWidth: "95px !important",
          padding: "0"
        },
        "&:nth-child(6)": {
          maxWidth: "150px !important",
          minWidth: "100px !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "150px !important",
          minWidth: "140px !important",
          padding: "0"
        },
        "&:nth-child(8)": {
          width: "100% !important",
          paddingRight: "0"
        },
        "&:nth-child(9)": {
          width: "50px !important",
          paddingRight: "0"
        }
      }
    },
    cells: {
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
          maxWidth: "200px !important",
          minWidth: "80px !important",
          padding: "0"
        },
        "&:nth-child(3)": {
          maxWidth: "90px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(4)": {
          maxWidth: "70px !important",
          minWidth: "50px !important",
          padding: "0"
        },
        "&:nth-child(5)": {
          maxWidth: "150px !important",
          minWidth: "95px !important",
          padding: "0"
        },
        "&:nth-child(6)": {
          maxWidth: "150px !important",
          minWidth: "100px !important",
          padding: "0"
        },
        "&:nth-child(7)": {
          maxWidth: "150px !important",
          minWidth: "140px !important",
          padding: "0"
        },
        "&:nth-child(8)": {
          width: "100% !important",
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
  const columns = [
    {
      name: "Item name",
      selector: (row: getItemListType) => row.title,
      cell: (row: getItemListType) => (
        <Link
          to={`${editItem}/${encodeURIComponent(row.SK)}`}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="fs-12 cursor-pointer">{row.title}</div>
        </Link>
      )
    },
    {
      name: "Category",
      selector: (row: getItemListType) => row.categoryTitle,
      cell: (row: getItemListType) => (
        <Link to={`${editItem}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 cursor-pointer">{row.categoryTitle}</div>
        </Link>
      )
    },
    {
      name: "Coin",
      selector: (row: getItemListType) => row.price,
      cell: (row: getItemListType) => (
        <Link to={`${editItem}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 cursor-pointer whitespace-nowrap">
            {row.price}
          </div>
        </Link>
      )
    },
    {
      name: "Update",
      selector: (row: getItemListType) => row.updatedAt,
      cell: (row: getItemListType) => (
        <Link to={`${editItem}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 whitespace-nowrap cursor-pointer">
            {getFormattedDateTime(row.updatedAt)}
          </div>
          <div className="width-10"></div>
        </Link>
      )
    },
    {
      name: "Create",
      selector: (row: getItemListType) => row.createdAt,
      cell: (row: getItemListType) => (
        <Link
          to={`${editItem}/${encodeURIComponent(row.SK)}`}
          className="d-flex flex-row"
        >
          <div className="fs-12 whitespace-nowrap">
            {getFormattedDateTime(row.createdAt)}
          </div>
          <div className="width-10"></div>
        </Link>
      )
    },
    {
      name: "Creator",

      selector: (row: getItemListType) => row.createdBy,
      cell: (row: getItemListType) => (
        <Link to={`${editItem}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 whitespace-nowrap cursor-pointer ">
            {row.createdBy}
          </div>
        </Link>
      )
    },
    {
      right: true,
      name: `${from ? `${from}~${to}/${totalItem}` : `0 ~ 0 / 0`}`,
      cell: (row: getItemListType) => (
        <Link to={`${editItem}/${encodeURIComponent(row.SK)}`}>
          <div className="fs-12 cursor-pointer color-transparent user-select-none">
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

    return (
      <div className="list-wrapper">
        <div className="d-flex flex-column justify-content-flex-start">
          <button
            type="button"
            className={`fs-10 text-center ${
              selectedItemList.length
                ? "bg-red cursor-pointer"
                : "bg-mid-gray cursor-default"
            } color-white width-80 border-radius-5 mb-20 pt-5 pb-5`}
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
                  className="page-link pagination-btn bg-blue color-white"
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
      </div>
    );
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
  const handleSelectedRowChange = ({ selectedRows }: any) => {
    setSelectedItemList(selectedRows);
  };
  const handleDelete = async () => {
    setDataLoaded(false);
    const response = await deleteItemList(selectedItemList);
    setDataLoaded(true);
    setSelectedItemList([]);
    if (dataLoaded) handleShowCompletedModal();
  };
  const fetchItemShopList = async () => {
    setDataLoaded(false);
    try {
      const response = await getItemShopList(currentPageNumber);
      if (response) {
        setFetchedData(response?.items);
        setTo(response?.to);
        setFrom(response?.from);
        setTotalItem(response?.totalItem);
        setTotalPage(response?.totalPage);
        setSelectedItemList([]);
      }
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  useLayoutEffect(() => {
    fetchItemShopList();
  }, [currentPageNumber]);
  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12">
              <div className="d-flex justify-content-between">
                <span className="fs-20">Item shop</span>
              </div>

              <div className="special-product-data-table-wrapper">
                <div className="special-product-data-table-header d-flex flex-row justify-between p-0 width-100-pt mb-10">
                  <div className="d-flex flex-row flex-start"></div>
                  <div className="d-flex flex-row flex-start">
                    <div className="question-btn-wrapper  mt-3">
                      {/* {process.env.REACT_APP_DB === "dev" ? (
                        <button
                          type="submit"
                          className="fs-12 border-radius-5 width-80 h-35 color-black bg-yellow mr-20"
                          onClick={() => navigate(`${categoryList}`)}
                        >
                          Category
                        </button>
                      ) : (
                        <></>
                      )} */}
                      <button
                        type="submit"
                        className="fs-12 border-radius-5 width-80 h-35 color-white bg-blue"
                        onClick={() => navigate("/item-shop/create-item")}
                      >
                        NEW
                      </button>
                    </div>
                  </div>
                </div>
                <div id="data-table-wrapper">
                  <DataTable
                    columns={columns}
                    data={fetchedData}
                    pagination
                    paginationComponent={BootyPagination}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                    selectableRows
                    onSelectedRowsChange={handleSelectedRowChange}
                    selectableRowsComponent={BootyCheckbox}
                    paginationPerPage={16}
                    persistTableHead={true}
                    progressPending={!dataLoaded}
                    progressComponent={<Loader />}
                    noDataComponent={<NoRecordComponent />}
                  />
                </div>
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
              navigate(`${itemShopList}`);
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

export default ItemShop;
