import React from "react";
import Layout from "../../../Layout/Index";
import SpecialProductList from "../component/SpecialProductList";
import "../../../assets/style/specialproduct.css";
function SpecialProducts() {
  return (
    <Layout>
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 col-xl-10 col-wrapper mt-3 col-md-12 col-sm-12">
              <div className="d-flex justify-content-between">
                <span className="fs-20">Special product</span>
              </div>

              <SpecialProductList />
            </div>
          </div>
        </div>
      </React.Fragment>
    </Layout>
  );
}

export default SpecialProducts;
