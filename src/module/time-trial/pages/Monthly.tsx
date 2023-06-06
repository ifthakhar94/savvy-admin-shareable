import React from "react";
import Layout from "../../../Layout/Index";
import { blue, white } from "../../../assets/style/color";
import MonthlyQuestionList from "../component/MonthlyQuestionList";
import { useNavigate } from "react-router-dom";

function Monthly() {
  const navigate = useNavigate();

  const btnStyle = {
    backgroundColor: `${blue}`,
    color: `${white}`,
    padding: "7px 25px"
  };

  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12">
              <div className="d-flex justify-content-between">
                <span className="color-black m-0 fs-20">
                  Time trial_Monthly
                </span>
                <button
                  type="button"
                  style={btnStyle}
                  className="btn fs-12"
                  onClick={() =>
                    navigate("/time-trial/monthly/new-monthly-question")
                  }
                >
                  New
                </button>
              </div>

              <MonthlyQuestionList />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Layout>
  );
}

export default Monthly;
