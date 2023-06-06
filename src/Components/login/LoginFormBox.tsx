import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
export default function LoginFormBox() {
  return (
    <div className="login-form-container d-flex flex-column justify-content-center align-items-center">
      <LoginHeader title="Login" />
      <LoginForm />
    </div>
  );
}
