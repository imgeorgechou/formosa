import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ScenicSpots } from "./pages/ScenicSpots";
import { Food } from "./pages/Food";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/scenic-spots",
    element: <ScenicSpots />,
  },
  {
    path: "/food",
    element: <Food />,
  },
]);
