import { useState, useEffect } from "react";
import { blue, white, red, midGray } from "../../assets/style/color.js";
import { login } from "../../Services/api/auth/login";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { isAuth } from "../../Services/utils/isAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import CSS from "csstype";
function LoginForm() {
  const navigate = useNavigate();
  //const [account, setAccount] = useState(`${process.env.REACT_APP_LOGIN_NAME}`);
  const [account, setAccount] = useState("");
  //const [password, setPassword] = useState("savvyadmin@2022");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  let errorMessage = "The account name or password is incorrect.";
  const handleSubmit = async () => {
    setDataLoaded(false);
    await login(account, password);
    setDataLoaded(true);
    var isAuthValue = await isAuth();
    if (isAuthValue) {
      navigate("/english-question");
    } else setError(true);
  };
  let loginErrorText: CSS.Properties = {
    color: `${red}`,
    fontSize: "12px",
    visibility: error ? "visible" : "hidden",
    marginBottom: "20px"
  };
  let formInputStyle = {
    width: 237,
    border: error ? `1px solid ${red}` : `1px solid ${midGray}`
  };
  let btnStyle = {
    backgroundColor: `${blue}`,
    color: `${white}`,
    fontSize: "12px",
    padding: "14px 23px 11px 23px",
    borderRadius: "5px"
  };
  const changePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  // useEffect(() => {
  //   var isAuthValue = await isAuth();
  //   if (isAuthValue) {
  //     navigate("/english-question");
  //   }
  // });
  return (
    <>
      {!dataLoaded && <Loader />}
      <div className="login-form d-flex flex-column justify-content-center align-items-center">
        <div className="mb-3 d-flex flex-column">
          <label className="form-label fs-12 color-login-form-title">
            Account
          </label>
          <input
            style={formInputStyle}
            type="email"
            className="form-control fs-14"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="E - mail"
          />
        </div>
        <div className="mb-3 position-relative d-flex flex-column">
          <label className="form-label fs-12 color-login-form-title">
            Password
          </label>
     <div className="position-relative">
     <input
            type={isPasswordVisible ? "text" : "password"}
            style={formInputStyle}
            className="form-control fs-14"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              zIndex: 10000,
              bottom: '0',
              transform: 'translateY(-50%)',
              cursor: "pointer"
            }}
            className='color-mid-gray fs-14'
            onClick={changePasswordVisibility}
          >
            {isPasswordVisible ? <BsEye /> : <BsEyeSlash />}
          </div>
     </div>
        </div>
      </div>
      <span style={loginErrorText}>{errorMessage}</span>
      <button style={btnStyle} onClick={() => handleSubmit()}>
        LOGIN
      </button>
    </>
  );
}

export default LoginForm;
