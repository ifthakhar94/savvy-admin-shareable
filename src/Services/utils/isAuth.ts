// export const isAuth = () => {
//   if (!localStorage.hasOwnProperty("idToken")) return false;
//   //return true;
//   if (
//     localStorage.getItem("idToken") &&
//     Date.parse(localStorage.getItem("idTokenExpiresIn") as string) < Date.now()
//   ) {
//     return true;
//   }
//   return true;
// };

export const isAuth = () => {
  if (!localStorage.hasOwnProperty("refreshToken")) return false;
  //return true;
  if (
    localStorage.getItem("refreshToken") &&
    Date.parse(localStorage.getItem("refreshTokenExpiresIn") as string) <
      Date.now()
  ) {
    return true;
  }
  return true;
};
