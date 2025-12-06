import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PlantDetails from "../pages/MealsDetails/MealsDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateMeal from "../pages/Dashboard/Chef/CreateMeal";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../pages/Dashboard/Chef/OrderRequests";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import MyReview from "../pages/Dashboard/Customer/MyReview";
import FavoriteMeal from "../pages/Dashboard/Customer/FavoriteMeal";
import MyMeals from "../pages/Dashboard/Chef/MyMeals";
import ManageRequest from "../pages/Dashboard/Admin/ManageRequest";
import Meals from "../pages/Home/Meals";
import MealsDetails from "../pages/MealsDetails/MealsDetails";
import OrderPage from "../components/Modal/OrderModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/meal/:id",
        element: (
          <PrivateRoute>
            <MealsDetails></MealsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <OrderPage></OrderPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "create-meal",
        element: (
          <PrivateRoute>
            <CreateMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <PrivateRoute>
            <MyMeals></MyMeals>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-request",
        element: (
          <PrivateRoute>
            <ManageRequest></ManageRequest>
          </PrivateRoute>
        ),
      },

      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-review",
        element: (
          <PrivateRoute>
            <MyReview />
          </PrivateRoute>
        ),
      },
      {
        path: "favorite-meal",
        element: (
          <PrivateRoute>
            <FavoriteMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "order-requests",
        element: <OrderRequests />,
      },
    ],
  },
]);
