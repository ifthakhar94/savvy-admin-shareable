import SingleSidebarLink from "./SingleSidebarLink";
import icon1 from "../../assets/image/icon1.png";
import icon2 from "../../assets/image/icon2.png";
import icon3 from "../../assets/image/icon3.png";
import CSS from "csstype";
import Collapse from "react-bootstrap/Collapse";
import SubMenu from "./SubMenu";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { AiFillClockCircle } from "react-icons/ai";
import { loginBonusList } from "../../assets/static/routes";
type getSidebarTypes = {
  open: boolean;
  openSidebar: () => void;
  openSubMenu: boolean;
  setOpenSubMenu: () => void;
};
function Index({
  open,
  openSidebar,
  openSubMenu,
  setOpenSubMenu
}: getSidebarTypes) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.slice(0, 11) === "/time-trial") setOpenSubMenu();
  }, []);

  let sideBarStyle: CSS.Properties = {
    transform: open ? `translateX(0px)` : `translateX(-100%)`,
    transition: "all 0.5s ease-in"
  };
  let bgStyle: CSS.Properties = {
    transform: open ? `translateX(0px)` : `translateX(-100%)`
  };
  return (
    <>
      <div className="bg-layer" onClick={openSidebar} style={bgStyle}></div>
      <div className="sidebar-wrapper" style={sideBarStyle}>
        <div
          className="sidebar-container"
          //className="sidebar-container d-flex flex-column align-items-center"

          style={sideBarStyle}
        >
          <SingleSidebarLink
            icon={icon1}
            label="English question"
            path="../english-question"
          />
          <div onClick={setOpenSubMenu}>
            <SingleSidebarLink
              icon={<AiFillClockCircle />}
              label="Time trial"
              path="../time-trial/monthly"
              dropdown={true}
              openSubMenu={openSubMenu}
            />
          </div>
          <Collapse in={openSubMenu}>
            <div className="submenu-container">
              <SubMenu
                icon={icon3}
                label="Special product"
                path="../time-trial/special-products"
              />
              <SubMenu
                icon={icon3}
                label="Monthly"
                path="../time-trial/monthly"
              />
            </div>
          </Collapse>
          <SingleSidebarLink
            icon={<FaDoorOpen />}
            label="Stage"
            path="../stage"
          />
          <SingleSidebarLink icon={icon2} label="Users" path="../users" />
          <SingleSidebarLink
            icon={icon3}
            label="Item shop"
            path="../item-shop"
          />
          {/* <SingleSidebarLink
            icon={<GiTwoCoins />}
            label="Login Bonus"
            path={`..${loginBonusList}`}
          /> */}
        </div>
      </div>
    </>
  );
}

export default Index;
