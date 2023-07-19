import { createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage/HomePage";
import TestePage from "./pages/TestePage/TestePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/teste",
        element: <TestePage />,
      },
    ],
  },
]);
