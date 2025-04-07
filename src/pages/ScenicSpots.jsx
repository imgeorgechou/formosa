import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "../components/Card";
import { Spinner } from "../components/Spinner";
import { getAuthorizationHeader } from "../utils/auth";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

export const ScenicSpots = () => {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const itemsPerPage = 18;

  const fetchMoreData = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const skip = page * itemsPerPage;
      const response = await axios.get(
        `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$top=${itemsPerPage}&$skip=${skip}&$format=JSON`,
        {
          headers: getAuthorizationHeader(),
        }
      );

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("API返回的數據格式不正確");
      }

      const newSpots = response.data.filter((item) => item);

      if (newSpots.length === 0) {
        setHasMore(false);
        return;
      }

      setSpots((prevSpots) => [...prevSpots, ...newSpots]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("載入更多景點失敗:", error);
      setError(error.message || "載入數據時發生錯誤");
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 lg:ml-[300px]">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-[32px] h-[32px] cursor-pointer"
          >
            <img
              src="/down.svg"
              alt="返回"
              className="w-[30px] h-[30px] rotate-90 -mr-3"
            />
          </button>
          <h1 className="text-2xl font-bold">景點推薦</h1>
          <div className="flex gap-2"></div>
        </div>
        {spots.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spinner />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={spots.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spinner />}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-3.5"
          >
            {spots.map((item) => (
              <Card
                key={item.ScenicSpotID}
                scenicSpotName={item.ScenicSpotName}
                picture={item.Picture?.PictureUrl1}
                address={item.Address}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
