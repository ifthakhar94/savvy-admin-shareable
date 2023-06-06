import React from "react";
import Layout from "../../../../Layout/Index";
import { blue, white } from "../../../../assets/style/color";
import { useNavigate } from "react-router-dom";
import StageList from "../components/StageList";
import { useState } from "react";
import NewStageCreate from "./NewStageCreate";

function Monthly() {
  const navigate = useNavigate();
  const [page, setPage] = useState("list");
  const btnStyle = {
    backgroundColor: `${blue}`,
    color: `${white}`,
    padding: "7px 25px"
  };

  const handlerProps = () => {
    setPage("list");
  };

  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12">
              <div className="d-flex justify-content-between">
                <span className="color-black m-0 fs-20">Stage</span>
                <button
                  type="button"
                  style={btnStyle}
                  className="btn fs-12"
                  onClick={() => navigate("/create-new-stage")}
                  // onClick={(event) => {
                  //   event.preventDefault();
                  //   setPage("create")
                  // }}
                >
                  New
                </button>
              </div>

              {/* <MonthlyQuestionList /> */}
              <StageList />
            </div>
          </div>
        </div>

        {/* {page === "create" && <NewStageCreate/> } */}
      </React.Fragment>
    </Layout>
  );
}

export default Monthly;
