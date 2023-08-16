import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const createReceiptURL = "/receipt/create";
const getReceiptURL = "/receipt/get";
const getReceiptDetailsURL = "/receipt-detail/get-by-id/";

export const NewReceiptService = () => {
  const {
    response: newReceiptResponse,
    error: newReceiptError,
    loading: newReceiptIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newReceiptAction = ({data, params}) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createReceiptURL,
      requestConfig: {
        data: data,
        params: params
      },
    });
  };

  return {
    newReceiptResponse,
    newReceiptError,
    newReceiptIsLoading,
    newReceiptAction,
  };
};

export const GetReceiptService = (p = 0, size = 5, startDate = null, endDate = null) => {
  const {
    response: getReceiptResponse,
    isLoading: getReceiptIsLoading,
    error: getReceiptError,
    refetch: reloadReceipt,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getReceiptURL,
    requestConfig: {
      params: {
        p: p,
        size: size,
        startDate: startDate,
        endDate: endDate,
      },
    },
  });

  return {
    getReceiptResponse,
    getReceiptIsLoading,
    getReceiptError,
    reloadReceipt,
  };
}; 


export const GetReceiptDetailsService = (receiptId) => {
  const {
    response: getReceiptDetailsRes,
    isLoading: getReceiptDetailsIsLoading,
    error: getReceiptDetailsErr,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getReceiptDetailsURL + receiptId,
  });

  return {
    getReceiptDetailsRes,
    getReceiptDetailsIsLoading,
    getReceiptDetailsErr,
  };
}; 