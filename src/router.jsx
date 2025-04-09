import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ScenicSpots } from "./pages/ScenicSpots";
import { Food } from "./pages/Food";
import { DetailPage } from "./pages/DetailPage";
import { FoodDetailPage } from "./pages/FoodDetailPage";
import { SearchResults } from "./pages/SearchResults";

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
  {
    path: "/scenic-spots/:id",
    element: <DetailPage />,
  },
  {
    path: "/food/:id",
    element: <FoodDetailPage />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
]);
