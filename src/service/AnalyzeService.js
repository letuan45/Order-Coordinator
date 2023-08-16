import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";

const getCardDataURL = "/analyze/get-card-data";
const getChartDataURL = "/analyze/get-chart-data";

export const GetCardDataService = () => {
  const {
    response: getCardDataResponse,
    isLoading: getCardDataIsLoading,
    error: getCardDataError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCardDataURL,
  });

  return {
    getCardDataResponse,
    getCardDataIsLoading,
    getCardDataError,
  };
};

export const GetChartDataService = () => {
  const {
    response: getChartDataResponse,
    isLoading: getChartDataIsLoading,
    error: getChartDataError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getChartDataURL,
  });

  return {
    getChartDataResponse,
    getChartDataIsLoading,
    getChartDataError,
  };
};
