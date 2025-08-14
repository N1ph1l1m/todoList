import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import AuthForm from "./components/AuthForm/AuthForm";
import TodoForm from "./components/TodoForm/TodoForm";

function Routers() {
  function privateLoader() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw redirect("/login");
    }
    return null;
  }


 const router = createBrowserRouter([
    {
      path: "/",
      loader: privateLoader,
      children: [
        {
          index: true,
          element: <TodoForm />,
        },
        {
          path: "todos",
          element: <TodoForm />,
        },
      ],
    },
    {
      path: "/login",
      element: <AuthForm/>,
    },
    {
      path: "/register",
      element: <AuthForm/>,
    },
    {
      path: "*",
      element: <AuthForm/>,
    },
  ]);

  return (
    <div className="wrapRoute">
      <RouterProvider router={router} />
    </div>
  );
}
export default Routers;
