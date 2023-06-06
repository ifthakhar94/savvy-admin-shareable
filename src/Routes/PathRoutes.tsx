import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/login/Index";
import Monthly from "../module/time-trial/pages/Monthly";
import EnglishQuestion from "../module/english-question/pages/EnglishQuestion";
import EditEnglishQuestion from "../module/english-question/pages/EditEnglishQuestion";
import NewEnglishQuestion from "../module/english-question/pages/NewEnglishQuestion";
import Users from "../users/pages/Users";
import SpecialProduct from "../module/special-product/pages/SpecialProducts";
import ItemShop from "../itemshop/pages/ItemShop";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoute";
import NewMonthlyQuestion from "../module/time-trial/pages/NewMonthlyQuestion";
import EditMonthlyQuestion from "../module/time-trial/pages/EditMonthlyQuestion";
import NewSpecialProducts from "../module/special-product/pages/NewSpecialProducts";
import NewQuestion from "../module/time-trial/pages/NewQuestion";
import EditQuestion from "../module/time-trial/pages/EditQuestion";
import Question from "../module/time-trial/pages/Question";
import EditSpecialProducts from "../module/special-product/pages/EditSpecialProducts";
import Stage from "../module/english-question/stage/pages/Index";
import NewStageCreate from "../module/english-question/stage/pages/NewStageCreate";
import CreateItem from "../itemshop/pages/CreateItem";
import EditItem from "../itemshop/pages/EditItem";
import EditStage from "../module/english-question/stage/pages/EditStage";
import Token from "../token/App";
import UserDetails from "../users/component/UserDetails";
import {
  englishQuestionList,
  newEnglishQuestion,
  editEnglishQuestion,
  newTheme,
  editTheme,
  questionList,
  login,
  newQuestion,
  editQuestion,
  themeList,
  specialProductList,
  newSpecialProduct,
  editSpecialProduct,
  stageList,
  newStage,
  editStage,
  userList,
  itemShopList,
  newItem,
  editItem,
  categoryList,
  createCategory,
  editCategory,
  loginBonusList,
  loginBonusCreate,
  loginBonusEdit,
  addStoreListPdf
} from "../assets/static/routes";
import CategoryList from "../itemshop/pages/CategoryList";
import CreateCategory from "../itemshop/pages/CreateCategory";
import CreateLoginBonus from "../login-bonus/page/CreateLoginBonus";
import EditCategory from "../itemshop/pages/EditCategory";
import LoginBonusList from "../login-bonus/page/LoginBonusList";
import EditLoginBonus from "../login-bonus/page/EditLoginBonus";
import AddStoreList from "../login-bonus/page/AddStoreList";

const PathRoutes = (): ReactElement<any, any> => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${login}`}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={`${newTheme}`}
          element={
            <PrivateRoute>
              <NewMonthlyQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editTheme}/:id`}
          element={
            <PrivateRoute>
              <EditMonthlyQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${questionList}`}
          element={
            <PrivateRoute>
              <Question />
            </PrivateRoute>
          }
        />
        <Route
          path={`${newQuestion}`}
          element={
            <PrivateRoute>
              <NewQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editQuestion}`}
          element={
            <PrivateRoute>
              <EditQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${themeList}`}
          element={
            <PrivateRoute>
              <Monthly />
            </PrivateRoute>
          }
        />
        <Route
          path={`${specialProductList}`}
          element={
            <PrivateRoute>
              <SpecialProduct />
            </PrivateRoute>
          }
        />
        <Route
          path={`${newSpecialProduct}`}
          element={
            <PrivateRoute>
              <NewSpecialProducts />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editSpecialProduct}`}
          element={
            <PrivateRoute>
              <EditSpecialProducts />
            </PrivateRoute>
          }
        />
        <Route
          path={`${englishQuestionList}`}
          element={
            <PrivateRoute>
              <EnglishQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${newEnglishQuestion}`}
          element={
            <PrivateRoute>
              <NewEnglishQuestion />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path={`${editEnglishQuestion}`}
          element={
            <PrivateRoute>
              <EditEnglishQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path={`${stageList}`}
          element={
            <PrivateRoute>
              <Stage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${newStage}`}
          element={
            <PrivateRoute>
              <NewStageCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editStage}`}
          element={
            <PrivateRoute>
              <EditStage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${userList}`}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={`${userList}/user-details/:id`}
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />
        <Route
          path={`${itemShopList}`}
          element={
            <PrivateRoute>
              <ItemShop />
            </PrivateRoute>
          }
        />
        <Route
          path={`${newItem}`}
          element={
            <PrivateRoute>
              <CreateItem />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editItem}/:id`}
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />
        <Route
          path={`${categoryList}`}
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path={`${createCategory}`}
          element={
            <PrivateRoute>
              <CreateCategory />
            </PrivateRoute>
          }
        />
        <Route
          path={`${editCategory}/:id`}
          element={
            <PrivateRoute>
              <EditCategory />
            </PrivateRoute>
          }
        />
        <Route
          path={`${addStoreListPdf}`}
          element={
            <PrivateRoute>
              <AddStoreList />
            </PrivateRoute>
          }
        />
        <Route
          path={`${loginBonusList}`}
          element={
            <PrivateRoute>
              <LoginBonusList />
            </PrivateRoute>
          }
        />
        <Route
          path={`${loginBonusCreate}`}
          element={
            <PrivateRoute>
              <CreateLoginBonus />
            </PrivateRoute>
          }
        />
        <Route
          path={`${loginBonusEdit}/:id`}
          element={
            <PrivateRoute>
              <EditLoginBonus />
            </PrivateRoute>
          }
        />
        <Route path={`/coupon/:id`} element={<Token />} />
        <Route
          path="*"
          element={
            <main className="p-20">
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default PathRoutes;
