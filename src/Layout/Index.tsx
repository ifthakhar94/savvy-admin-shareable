import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Index";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/image/logo-white.png"; //white logo for layout in top header is needed. need to change
import { logout } from "../Services/api/auth/logout";
import axios from "axios";
import ModalBox from "../Components/modal/ModalBox";
import Loader from "../Components/loader/Loader";
import { logoutContents } from "../Components/modal/modalContents";
import { clearAllLocalStorage } from "../assets/static/static";
import { login } from "../assets/static/routes";

function Index({ children }: any): React.ReactElement {
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  function openSidebar() {
    setOpen(!open);
  }
  let handleResize = () => {
    if (window.innerWidth > 1024) {
      setOpen(true);
      setOpenSubMenu(false);
    } else {
      setOpen(false);
      setOpenSubMenu(false);
    }
  };
  // Modal Open & close
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const userLogout = async () => {
    setLoader(true);
    const config = logout();
    const response = await axios(config);
    clearAllLocalStorage();
    window.location.assign(`${login}`);
    localStorage.removeItem("idToken");
    handleClose();
    setLoader(false);
  };
  return (
    <React.Fragment>
      <div className="layout-container">
        <div className="body-container d-flex flex-row">
          <div className="header-container d-flex align-items-center flex-row justify-content-between ">
            <span className="burger-icon" onClick={openSidebar}>
              <GiHamburgerMenu />
            </span>
            <img src={logo} alt="Saavy Study" className="layout-logo" />
            <button onClick={handleShow} className="color-white fs-16">
              Logout
            </button>
          </div>
          <Sidebar
            open={open}
            openSidebar={openSidebar}
            openSubMenu={openSubMenu}
            setOpenSubMenu={() => setOpenSubMenu(!openSubMenu)}
          />

          <div className="children-container">{children}</div>
        </div>
      </div>
      {loader && <Loader />}
      {show && (
        <ModalBox
          show={show}
          handleActionNClose={() => {
            userLogout()
            handleClose()
          }}
          handleClose={handleClose}
          modalHeader={logoutContents.modalHead}
          modalText={logoutContents.modalText}
          firstBtnText={logoutContents.firstBtnText}
          secondBtnText={logoutContents.secondBtnText}
        />
      )}
    </React.Fragment>
  );
}

export default Index;
