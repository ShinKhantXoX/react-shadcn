import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layout/DefaultLayout";
import BlankLayout from "@/layout/BlankLayout";
import Login from "@/modules/auth/Login";
import { userRoute } from "@/modules/user/userRoute";
import { mediaRoute } from "@/modules/media/mediaRoute";

export const routers = createBrowserRouter([
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      ...userRoute,
      ...mediaRoute
    ],
  },
  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);