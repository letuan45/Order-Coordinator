import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getStockURl = "/stock/get-stocks/";

export const GetStockService = (warehouseId) => {
  const {
    response: getStockResponse,
    isLoading: getStockIsLoading,
    error: getStockError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getStockURl + warehouseId,
  });

  return {
    getStockResponse,
    getStockIsLoading,
    getStockError,
  };
};
