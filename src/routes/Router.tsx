import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, LoginPage, ErrorPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export { Router };
