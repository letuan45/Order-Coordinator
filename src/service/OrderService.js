import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const createOrderURL = "/order/create";
const getOrdersURL = "/order/get";
const getOrderDetailsURL = "/order-detail/get-by-id/";
const orderCoordinateURL = "/order/coordinate";
const confirmOrderURL = "/order/confirm/";
const cancelOrderURL = "/order/cancel/";


export const NewOrderService = () => {
  const {
    response: newOrderResponse,
    error: newOrderError,
    loading: newOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newOrderAction = ({ data, params }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createOrderURL,
      requestConfig: {
        data: data,
        params: params,
      },
    });
  };

  return {
    newOrderResponse,
    newOrderError,
    newOrderIsLoading,
    newOrderAction,
  };
};

export const GetOrdersService = (
  p = 0,
  size = 5,
  startDate = null,
  endDate = null
) => {
  const {
    response: getOrdersResponse,
    isLoading: getOrdersIsLoading,
    error: getOrdersError,
    refetch: reloadOrders,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getOrdersURL,
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
    getOrdersResponse,
    getOrdersIsLoading,
    getOrdersError,
    reloadOrders,
  };
};

export const GetOrderDetailsService = (orderId) => {
  const {
    response: getOrderDetailsRes,
    isLoading: getOrderDetailIsLoading,
    error: getOrderDetailsErr,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getOrderDetailsURL + orderId,
  });

  return {
    getOrderDetailsRes,
    getOrderDetailIsLoading,
    getOrderDetailsErr,
  };
};

export const OrderCoordinateService = () => {
  const {
    response: orderCoordinateResponse,
    error: orderCoordinateError,
    loading: orderCoordinateIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const orderCoordinateAction = (orderListString) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: orderCoordinateURL,
      requestConfig: {
        params: {
          ordersString: orderListString,
        },
      },
    });
  };

  return {
    orderCoordinateResponse,
    orderCoordinateError,
    orderCoordinateIsLoading,
    orderCoordinateAction,
  };
};

export const ConfirmOrderService = () => {
  const {
    response: confirmOrderResponse,
    error: confirmOrderError,
    loading: confirmOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const confirmOrderAction = (orderId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: confirmOrderURL + orderId,
    });
  };

  return {
    confirmOrderResponse,
    confirmOrderError,
    confirmOrderIsLoading,
    confirmOrderAction,
  };
};

export const CancelOrderService = () => {
  const {
    response: cancelOrderResponse,
    error: cancelOrderError,
    loading: cancelOrderIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const cancelOrderAction = (orderId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: cancelOrderURL + orderId,
    });
  };

  return {
    cancelOrderResponse,
    cancelOrderError,
    cancelOrderIsLoading,
    cancelOrderAction,
  };
};
