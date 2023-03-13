import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ErrorPage, ChatPage } from "../pages";
import { Layout } from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: ":id",
        element: <ChatPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export { Router };
