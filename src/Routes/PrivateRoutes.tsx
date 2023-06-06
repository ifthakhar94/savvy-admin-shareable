import { Navigate } from "react-router-dom";
import { login } from "../assets/static/routes";
import { isAuth } from "../Services/utils/isAuth";
const PrivateRoute = ({ children }: any) => {
  const isAuthValue = isAuth();
  if (!isAuthValue) {
    return <Navigate to={`${login}`} replace />;
  }
  return children;
};
export default PrivateRoute;
