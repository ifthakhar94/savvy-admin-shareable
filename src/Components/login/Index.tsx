import React, { useEffect } from "react";
import "../../assets/style/login.css";
import Logo from "../../assets/image/logo.png";
import LoginFormBox from "./LoginFormBox";
import { checkTokenValidation } from "../../Services/utils/handleError";
function Index(): React.ReactElement {
  useEffect(() => {}, []);
  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center">
      <img src={Logo} alt="Saavy Study" className="login-logo" />
      <LoginFormBox />
    </div>
  );
}

export default Index;
