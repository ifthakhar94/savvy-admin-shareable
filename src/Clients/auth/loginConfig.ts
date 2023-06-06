export const loginConfig = (email: string, password: string) => {
  let request_parameters = JSON.stringify({
    query: `query USER_LOGIN{
                loginUser(email: "${email}",password: "${password}"){
                refreshToken
                idToken
                expiresIn
                accessKeyId
                secretKey
                sessionToken
                expiration
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
      "X-Api-Key":
        process.env.REACT_APP_DB === "dev"
          ? process.env.REACT_APP_API_KEY
          : process.env.REACT_APP_API_KEY_PROD
    },
    data: request_parameters,
    validateStatus: function (status: any) {
      return status < 500;
    }
  };
  return config;
};
