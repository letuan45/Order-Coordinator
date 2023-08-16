import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getCustomersURL = "/customer/get";
const newCustomerURL = "/customer/create";
const updateCustomerURL = "/customer/update/";
const getCustomerByIdURL = "/customer/get-by-id/";
const removeCustomerURL =  "/customer/delete/"

export const GetCustomers = (s = "", p = 0, size = 5) => {
  const {
    response: getCustomersResponse,
    isLoading: getCustomersIsLoading,
    error: getCustomersError,
    refetch: reloadCustomers,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCustomersURL,
    requestConfig: {
      params: {
        s: s,
        p: p,
        size: size,
      },
    },
  });

  return {
    getCustomersResponse,
    getCustomersIsLoading,
    getCustomersError,
    reloadCustomers,
  };
};

export const NewCustomerService = () => {
  const {
    response: newCustomerResponse,
    error: newCustomerError,
    loading: newCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newCustomerAction = (data) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: newCustomerURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newCustomerResponse,
    newCustomerError,
    newCustomerIsLoading,
    newCustomerAction,
  };
};

export const UpdateCustomerService = () => {
  const {
    response: updateCustomerRes,
    error: updateCustomerErr,
    loading: updateCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updateCustomerAction = ({ customerId, data }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updateCustomerURL + customerId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updateCustomerRes,
    updateCustomerErr,
    updateCustomerIsLoading,
    updateCustomerAction,
  };
};

export const GetCustomerById = () => {
  const {
    response: getCustomerByIdRes,
    error: getCustomerByIdError,
    loading: getCustomerByIdIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const getCustomerByIdAction = (customerId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getCustomerByIdURL + customerId,
    });
  };

  return {
    getCustomerByIdRes,
    getCustomerByIdError,
    getCustomerByIdIsLoading,
    getCustomerByIdAction,
  };
};

export const RemoveCustomerService = () => {
  const {
    response: removeCustomerRes,
    error: removeCustomerError,
    loading: removeCustomerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removeCustomerAction = (customerId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeCustomerURL + customerId,
    });
  };

  return {
    removeCustomerRes,
    removeCustomerError,
    removeCustomerIsLoading,
    removeCustomerAction,
  };
};