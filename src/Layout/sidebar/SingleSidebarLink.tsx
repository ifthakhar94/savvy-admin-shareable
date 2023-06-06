import { blue } from "../../assets/style/color";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
type getSingleSidebarLink = {
  label: string;
  icon: string | any;
  path?: string;
  dropdown?: boolean;
  openSubMenu?: boolean;
};
type getSideBarLinkContainer = {
  path?: string | undefined;
  pathName?: string | undefined;
};
function SingleSidebarLink({
  icon,
  label,
  path,
  dropdown,
  openSubMenu
}: getSingleSidebarLink) {
  const location = useLocation();
  let activeStyle = {
    backgroundColor: blue
  };
  let sideBarIconStyle = {
    fontWeight: "900",
    transformOrigin: "center",
    transform: openSubMenu ? "rotateZ(180deg)" : "rotateZ(0)"
  };
  const SideBarLinkContainer = ({
    path,
    pathName
  }: getSideBarLinkContainer) => (
    <div
      className="sidebar-link-container"
      style={
        pathName?.includes(path?.slice(2, path?.length) as string) && !dropdown
          ? activeStyle
          : undefined
      }
    >
      <div className="single-sidebar-link d-flex flex-row justify-content-center align-items-center">
        <div className="single-sidebar-link-wrapper d-flex flex-row justify-between align-items-center">
          <div>
            {typeof icon === "string" ? (
              <img src={icon} alt={label} />
            ) : (
              <span className="fs-25 ml-0">{icon}</span>
            )}
            <span>{label}</span>
          </div>
          {dropdown ? (
            <span style={sideBarIconStyle}>
              <IoIosArrowDown />
            </span>
          ) : (
            <></>
          )}
        </div>{" "}
      </div>
    </div>
  );
  return path ? (
    <NavLink
      to={path}
      style={(state): any =>
        state.isActive ? (activeStyle as any) : undefined
      }
    >
      <SideBarLinkContainer path={path} pathName={location.pathname} />
    </NavLink>
  ) : (
    <SideBarLinkContainer path={path} pathName={location.pathname} />
  );
}

export default SingleSidebarLink;
