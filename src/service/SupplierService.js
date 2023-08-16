import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getSupplierURL = "/supplier/get/paginate";
const newSupplierURL = "/supplier/create";
const updateSupplierURL = "/supplier/update/";
const getASupplierURL = "/supplier/get/";
const removeSupplieURL = "/supplier/delete/";

export const GetSupplierService = (s = "" , p = 0, size = 5) => {
  const {
    response: getSupplierRes,
    isLoading: getSupplierIsLoading,
    error: getSupplierError,
    refetch: reloadSupplier,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getSupplierURL,
    requestConfig: {
      params: {
        s: s,
        p: p,
        size: size,
      },
    },
  });

  return {
    getSupplierRes,
    getSupplierIsLoading,
    getSupplierError,
    reloadSupplier,
  };
};

export const NewSupplierService = () => {
  const {
    response: newSupplierRes,
    error: newSupplierError,
    loading: newSupplierIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newSupplierAction = (data) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: newSupplierURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newSupplierRes,
    newSupplierError,
    newSupplierIsLoading,
    newSupplierAction,
  };
};

export const UpdateSupplierService = () => {
  const {
    response: updateSupplierRes,
    error: updateSupplierError,
    loading: updateSupplierIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updateSupplierAction = ({ data, supplierId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updateSupplierURL + supplierId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updateSupplierRes,
    updateSupplierError,
    updateSupplierIsLoading,
    updateSupplierAction,
  };
};

export const GetASupplierService = () => {
  const {
    response: getASupplierResponse,
    isLoading: getASupplierIsLoading,
    error: getASupplierError,
    axiosFetch,
  } = useAxiosFunction();

  const getASupplierAction = (supplierId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getASupplierURL + supplierId,
    });
  };

  return {
    getASupplierResponse,
    getASupplierIsLoading,
    getASupplierError,
    getASupplierAction,
  };
};

export const RemoveSupplierService = () => {
  const {
    response: removeSupplierRes,
    error: removeSupplierErr,
    loading: removeSupplierIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removeSupplierAction = (supplierId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeSupplieURL + supplierId,
    });
  };

  return {
    removeSupplierRes,
    removeSupplierErr,
    removeSupplierIsLoading,
    removeSupplierAction,
  };
};