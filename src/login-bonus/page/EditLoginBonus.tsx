import React, { useState, useLayoutEffect } from "react";
import Layout from "../../Layout/Index";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/style/itemshop/createItem.css";
import Loader from "../../Components/loader/Loader";
import { categoryType } from "../../Services/type/type";
import ModalBox from "../../Components/modal/ModalBox";
import { publishedContents, completeContents } from "../../Components/modal/modalContents";
import { loginBonusList } from "../../assets/static/routes";
import DialogBox from "../../Components/modal/DialogBox";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import {
  getCountryOptionList,
  updateLoginBonus,
  getSingleLoginBonusDetail
} from "../service/loginBonus";
import { countryOptionListType } from "../../Services/type/type";
export default function EditLoginBonus() {
  let { id }: any = useParams();
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(true);
  const [loginBonusInfo, setLoginBonusInfo] = useState<any>({
    SK: "",
    title: "",
    coin: "",
    countryWithCities: "",
    country: "",
    city: "",
    status: "",
    countryCode: "",
    allCities: undefined
  });
  const [countryList, setCountryList] = useState([] as countryOptionListType[]);
  const [showDialog, setShowDialog] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
    const handleCloseCompletedModal = () => {
      setShowCompleteModal(false);
    };
    const handleShowCompletedModal = () => {
      setShowCompleteModal(true);
    };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleChangeItem = (e: any) => {
    setShowDialog(true);
    setLoginBonusInfo({
      ...loginBonusInfo,
      [e.target.name]: e.target.value
    });
  };
  const handleChangeCountry = (e: any) => {
    setShowDialog(true);
    let country = JSON.parse(e.target.value)?.name;
    let countryCode = JSON.parse(e.target.value)?.code;
    let cities = JSON.parse(e.target.value)?.cities;
    setLoginBonusInfo({
      ...loginBonusInfo,
      [e.target.name]: e.target.value,
      country: country,
      city: cities[0].title,
      allCities: cities,
      countryCode: countryCode?.toLowerCase()
    });
  };
  const isValidated = () => {
    if (loginBonusInfo.title?.length > 20 || loginBonusInfo.title?.length === 0)
      return false;
    if (Number(loginBonusInfo.coin) === 0) return false;

    return true;
  };

  const handleSubmit = async (status: string) => {
    setShowDialog(false);
    setDataLoaded(false);
    try {
      if (isValidated()) {
        setError(false);

        const response = await updateLoginBonus(
          loginBonusInfo.SK,
          JSON.parse(loginBonusInfo.countryWithCities)?.SK,
          loginBonusInfo.city,
          loginBonusInfo.title,
          Number(loginBonusInfo.coin),
          status
        );
        if (response) {
          if (status === "Published") handleShow();
          else handleShowCompletedModal();
        }
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
    setDataLoaded(true);
  };
  const fetchSingleLoginBonusDataCountryList = async () => {
    setDataLoaded(false);
    const [response, countryListResponse] = await Promise.all([
      getSingleLoginBonusDetail(decodeURIComponent(id)),
      getCountryOptionList()
    ]);
    setCountryList(countryListResponse);
    const countryWithCitiesFromResponse = countryListResponse?.find(
      (i: countryOptionListType) => response.countryName === i.name
    );
    if (response) {
      setLoginBonusInfo({
        SK: response.SK,
        allCities: countryWithCitiesFromResponse.cities,
        countryWithCities: JSON.stringify(countryWithCitiesFromResponse),
        title: response.title,
        coin: response.bonusCoin.toString(),
        country: response.countryName,
        countryCode: response.countryCode?.toLowerCase(),
        city: response.cityName,
        status: response.loginBonusItemStatus
      });
    }
    setDataLoaded(true);
  };
  useLayoutEffect(() => {
    fetchSingleLoginBonusDataCountryList();
  }, []);
  return (
    <>
      <Layout>
        <DialogBox
          // @ts-ignore
          showDialog={showPrompt}
          confirmNavigation={confirmNavigation}
          cancelNavigation={cancelNavigation}
        />
        <div className="content-wrapper">
          <div className="back-btn">
            <span className="back-btn" onClick={() => navigate(-1)}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left">
              <div
                className={`color-red fs-10 mb-1 ${
                  error ? "opacity-1" : "opacity-0"
                }`}
              >
                Please note that some fields have not been filled in.
              </div>
              <div className="mb-4">
                <label className="mb-1">
                  <span className="fs-12 color-dark">Title</span>{" "}
                  <span className="asterisk">&#42;</span>
                  <span
                    className={`ms-1 fs-10 ${
                      loginBonusInfo.title?.length > 20
                        ? "color-red"
                        : "color-light-dark"
                    }`}
                  >
                    ※Up to 20 characters
                  </span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  value={loginBonusInfo.title}
                  name="title"
                  onChange={handleChangeItem}
                  className={`title-input ${
                    error && loginBonusInfo.title?.length === 0 && "border-red"
                  }`}
                />
              </div>
              {/* category and coin */}
              <div className="d-flex flex-wrap-wrap">
                <div className="mb-4 width-200 h-35">
                  <label className="mb-1">
                    <span className="fs-12 color-dark">Coin</span>{" "}
                    <span className="asterisk">&#42;</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={loginBonusInfo.coin}
                    name="coin"
                    min={0}
                    onChange={handleChangeItem}
                    className={`coin-input ${
                      Number(loginBonusInfo.coin) === 0 && error && "border-red"
                    }`}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap-wrap mt-4 align-items-center">
                <div className="select_input mb-4">
                  <div className="mb-1">
                    <span className="color-dark fs-12">Country</span>
                    <span className="asterisk">&#42;</span>
                  </div>
                  <select
                    className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                    value={loginBonusInfo.countryWithCities}
                    name="countryWithCities"
                    onChange={handleChangeCountry}
                  >
                    {countryList?.map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span
                    className={`flag-size fi-${loginBonusInfo.countryCode} fi ml-10 border-solid-light-dark`}
                  ></span>
                </div>
                <div className="select_input mb-4 ml-20">
                  <div className="mb-1">
                    <span className="color-dark fs-12">City</span>
                    <span className="asterisk">&#42;</span>
                  </div>
                  <select
                    className="custom-select fs-14 ps-2 color-dark width-200 h-35 bg-white"
                    value={loginBonusInfo.city}
                    name="city"
                    onChange={handleChangeItem}
                  >
                    {loginBonusInfo.allCities?.map((item: any, index: any) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="content-right">
              <div className="status-display d-flex justify-between align-middle flex-row">
                <div className="fs-12">Status</div>
                <div
                  className={`status-value ${
                    loginBonusInfo.status === "Published"
                      ? `bg-blue color-white border-solid-blue`
                      : loginBonusInfo.status === "Draft"
                      ? `bg-yellow color-black border-solid-yellow`
                      : `bg-white border-solid-dark-gray`
                  }`}
                >
                  {loginBonusInfo.status}
                </div>
              </div>
              <div className="status-control-btn d-flex flex-column justify-between">
                <div className="d-flex flex-row justify-between mb-20">
                  <div
                    className="fs-12 publish-button"
                    onClick={()=> handleSubmit('Published')}
                  >
                    Publish
                  </div>
                  <div
                    className="fs-12 draft-button"
                    aria-label="Draft"
                    onClick={()=> handleSubmit('Draft')}
                  >
                    Draft
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-flex-end">
                  <div className="fs-12 delete-button bg-mid-gray">Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showCompleteModal && (
          <ModalBox
            show={showCompleteModal}
            handleClose={() => {
              navigate("/login-bonus-list");
              handleCloseCompletedModal();
            }}
            modalHeader={completeContents.modalHead}
            modalText={completeContents.modalText}
            secondBtnText={completeContents.secondBtnText}
          />
        )}
        {show && (
          <ModalBox
            show={show}
            handleClose={() => {
              navigate(`${loginBonusList}`);
              handleClose();
            }}
            modalHeader={publishedContents.modalHead}
            modalText={publishedContents.modalText}
            secondBtnText={publishedContents.secondBtnText}
          />
        )}
        {!dataLoaded && <Loader />}
      </Layout>
    </>
  );
}
