import { Navigate } from "react-router-dom";
import { englishQuestionList } from "../assets/static/routes";
import { isAuth } from "../Services/utils/isAuth";
const PublicRoute = ({ children }: any) => {
  const isAuthValue = isAuth();
  if (isAuthValue) {
    return <Navigate to={`${englishQuestionList}`} replace />;
  }
  return children;
};
export default PublicRoute;
