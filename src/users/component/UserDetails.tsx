import { useState, useEffect } from "react";
import { userDetails } from "../service/user";
import { useNavigate, useParams } from "react-router-dom";

import { getFormattedDateTime } from "../../Services/utils/getFormattedDateTime";
import Loader from "../../Components/loader/Loader";
import { defaultPrefectureJapan } from "../../assets/static/static";
import Layout from "../../Layout/Index";
function UserDetails() {
  const navigate = useNavigate();

  let { id }: any = useParams();
  const [dataLoaded, setDataLoaded] = useState(true);
  const [fetchedData, setFetchedData] = useState([] as any);

  const fetchUserDetails = async (SK: any) => {
    setDataLoaded(false);

    const response = await userDetails(SK);
    setFetchedData(response);
    setDataLoaded(true);
  };
  const getResponseDate = (date: string) => {
    if (Date.parse(date) > Date.now()) return true;
    return false;
  };
  const timeStringGenerator = (duration: any) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };
  useEffect(() => {
    fetchUserDetails(decodeURIComponent(id));
  }, []);
  return (
    <Layout>
      <div>
        {" "}
        <div className="content-wrapper">
          <div className="back-btn">
            <span className="back-btn" onClick={() => navigate(-1)}>
              &lt; Back
            </span>
          </div>
          <div className="content-inner-wrapper Mg-B">
            <div className="wrappper-content">
              <div className="inner-layer-wrapper">
                <div className="inner-content-left Mg-R">
                  <div className="top-content-wrapper">
                    <div className="fs-16 mr-20">{fetchedData?.email}</div>
                    <div className="d-flex align-items-center wrapper flex-wrap-wrap">
                      {fetchedData && (
                        <div
                          className={`status-wrapper mb-5 ${
                            !dataLoaded
                              ? `bg-white color-dark`
                              : fetchedData?.status === false
                              ? `bg-white border-solid-dark-gray color-dark`
                              : getResponseDate(
                                  fetchedData?.contractExpiredAt
                                ) === true
                              ? `bg-blue border-solid-blue color-white`
                              : getResponseDate(
                                  fetchedData.contractExpiredAt
                                ) === false ||
                                fetchedData.contractExpiredAt === null
                              ? `bg-yellow border-solid-dark-gray color-dark`
                              : ""
                          }`}
                        >
                          {fetchedData?.status === false
                            ? `Deleted`
                            : dataLoaded &&
                              (getResponseDate(
                                fetchedData.contractExpiredAt
                              ) === false ||
                                fetchedData.contractExpiredAt === null)
                            ? "Free"
                            : getResponseDate(
                                fetchedData?.contractExpiredAt
                              ) === true
                            ? `Paid`
                            : ``}
                        </div>
                      )}
                      <h3 className="date-time width-120 whitespace-nowrap m-0 mb-5">
                        {getFormattedDateTime(fetchedData?.contractExpiredAt)}
                      </h3>
                    </div>
                  </div>
                  <div className="data-wrapper">
                    <div className="d-flex">
                      <div className="d-flex flex-column">
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">
                            Player birth year
                          </div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.birthYear
                              ? " "
                              : fetchedData?.birthYear}
                          </div>
                        </div>
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">Create</div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.userCreatedDate
                              ? " "
                              : getFormattedDateTime(
                                  fetchedData?.userCreatedDate
                                ).split(" ")[0]}
                          </div>
                        </div>
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">
                            last login
                          </div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.lastLoginAt
                              ? " "
                              : getFormattedDateTime(
                                  fetchedData?.lastLoginAt
                                ).split(" ")[0]}
                          </div>
                        </div>
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">Name</div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.firstName
                              ? " "
                              : fetchedData?.firstName}{" "}
                            {!fetchedData?.lastName
                              ? " "
                              : fetchedData?.lastName}
                              {dataLoaded && !fetchedData?.firstName && !fetchedData?.lastName && "-"}
                          </div>
                        </div>
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">Tell</div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.phoneNumber && dataLoaded
                              ? "-"
                              : fetchedData?.phoneNumber}
                          </div>
                        </div>
                        <div className="d-flex single-user-details">
                          <div className="single-user-field fs-14">
                            Residence
                          </div>
                          <div className="single-user-name fs-14">
                            {!fetchedData?.residence?.jp && !!dataLoaded
                              ? defaultPrefectureJapan
                              : fetchedData?.residence?.jp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inner-content-right">
                  <div className="inner-right-layer">
                    <div className="inner-left-content-wrapper">
                      <div className="point-wrapper">Coin</div>
                      <span
                        className={`btn-label fw-semi-bold fs-32 ${
                          !fetchedData.totalCoin && "h-35"
                        }`}
                      >
                        {fetchedData?.totalCoin}
                      </span>
                    </div>
                    <div className="inner-right-content-wrapper">
                      <div className="coupon-wrapper">Coupon</div>
                      <h1 className="fs-32 h-35 btn-label">
                        {!!fetchedData?.totalCoupons && (
                          <>
                            {fetchedData?.totalCoupons}
                            <span className="fs-14 pl-5">枚</span>
                          </>
                        )}
                        {/* <span className="label-title">枚</span>  */}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-inner-wrapper">
            <div className="content-left left-wrapper-content">
              <div className="inner-right-layer inner-right-res-layer">
                <div className="lower-card-content-wrapper">
                  <div className="bottom-card bottom-wrapper">
                    <h1 className="card-title">English question</h1>
                    <div className="Mg-T">
                      <h1 className="btn-label">
                        <span className="label-title fs-14">stage</span>
                        <span className="fs-32 fw-semi-bold">
                          {" "}
                          {fetchedData?.stage}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="lower-card-content-wrapper">
                  <div className="bottom-card">
                    <h1 className="card-title">Map of Japan</h1>
                    <div className="data-wrapper">
                      <div className="d-flex">
                        <div className="d-flex flex-column">
                          <div className="d-flex single-user-details">
                            <div className="bottom-left-card-title  fs-14">
                              Easy
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.mapOfJapan?.easy
                              )}
                            </div>
                          </div>
                          <div className="d-flex single-user-details body-content">
                            <div className="bottom-left-card-title  fs-14">
                              Normal
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.mapOfJapan?.normal
                              )}
                            </div>
                          </div>
                          <div className="d-flex single-user-details body-content">
                            <div className="bottom-left-card-title  fs-14">
                              Hard
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.mapOfJapan?.hard
                              )}
                            </div>
                          </div>
                          <div className="d-flex single-user-details body-content">
                            <div className="bottom-left-card-title  fs-14">
                              Very hard
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.mapOfJapan?.veryHard
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lower-card-content-wrapper">
                  <div className="bottom-card">
                    <h1 className="card-title">Special product</h1>
                    <div className="data-wrapper">
                      <div className="d-flex">
                        <div className="d-flex flex-column">
                          <div className="d-flex single-user-details">
                            <div className="bottom-left-card-title  fs-14">
                              Easy
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.specialProduct?.easy
                              )}
                            </div>
                          </div>
                          <div className="d-flex single-user-details body-content">
                            <div className="bottom-left-card-title  fs-14">
                              Normal
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.specialProduct?.normal
                              )}
                            </div>
                          </div>
                          <div className="d-flex single-user-details body-content">
                            <div className="bottom-left-card-title  fs-14">
                              Hard
                            </div>
                            <div className="single-user-name fs-32 time-label fw-semi-bold">
                              {timeStringGenerator(
                                fetchedData?.specialProduct?.hard
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-right-content-wrapper">
                  <div className="bottom-card">
                    <h1 className="card-title">Monthly</h1>
                    <h1 className="btn-label fs-32 fw-semi-bold">
                      {timeStringGenerator(fetchedData?.monthly?.medium)}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!dataLoaded && <Loader />}
      </div>
    </Layout>
  );
}

export default UserDetails;
