import PathRoutes from "./Routes/PathRoutes";
import { useLayoutEffect } from "react";
import { checkTokenValidation } from "../src/Services/utils/handleError";

function App() {
  async function callIt() {
    await checkTokenValidation("from apptsx");
  }
  useLayoutEffect(() => {
    callIt();
  }, []);
  return (
    <>
      <PathRoutes />
    </>
  );
}

export default App;
