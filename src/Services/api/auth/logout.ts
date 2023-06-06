export const logout = () => {
  let request_parameters = JSON.stringify({
    query: `query LOGUT_USER{
    logoutUser{
        message
    }
}`,
    variables: {}
  });
  var config: any = {
    method: "POST",
    url:
      process.env.REACT_APP_DB === "dev"
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_BASE_URL_PROD,
    headers: {
      Authorization: localStorage.getItem("idToken")
    },
    data: request_parameters
  };
  return config;
};
