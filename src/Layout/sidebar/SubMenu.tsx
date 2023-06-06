import { blue } from "../../assets/style/color";
import { NavLink, useLocation } from "react-router-dom";

type getSingleSidebarLink = {
  label: string;
  icon: string;
  path: string;
};
function SubMenu({ label, path }: getSingleSidebarLink) {
  const location = useLocation();
  let activeStyle = {
    backgroundColor: blue
  };
  let bgStyle = {
    backgroundColor: blue
  };
  return (
    <NavLink
      to={path}
      style={(state): any =>
        state.isActive ? (activeStyle as any) : undefined
      }
    >
      <div
        className="sidebar-link-container"
        style={
          location.pathname.slice(0, path.length - 2) ===
          path.slice(2, path.length)
            ? bgStyle
            : undefined
        }
      >
        <div className="single-sidebar-link  submenu d-flex flex-row justify-content-center align-items-center">
          <div className="single-sidebar-link-wrapper d-flex flex-row justify-content-flex-start align-items-center">
            <span>{label}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default SubMenu;
