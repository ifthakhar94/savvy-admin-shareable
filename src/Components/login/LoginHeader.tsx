type getLoginHeaderType = {
  title: string;
};
export default function LoginHeader({ title }: getLoginHeaderType) {
  return <h2 className="login-header">{title}</h2>;
}
