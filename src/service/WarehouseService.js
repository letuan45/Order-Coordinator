import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getAllWareHouseURL = "/warehouse/get-all";
const getWarehouseURL = "/warehouse/get/paginate";
const createWarehouseURL = "/warehouse/create";
const updateWarehouseURL = "/warehouse/update/";
const getAWarehouseURL = "/warehouse/get-warehouse/";
const removeWarehouseURL = "/warehouse/delete/";

export const GetAllWarehouse = () => {
  const {
    response: getAllWarehouseRes,
    isLoading: getAllWarehouseIsLoading,
    error: getAllWarehouseErr,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllWareHouseURL,
  });

  return {
    getAllWarehouseRes,
    getAllWarehouseIsLoading,
    getAllWarehouseErr,
  };
};

export const GetWarehousePaginate = (s = "", p = 0, size = 5) => {
  const {
    response: getWarehouseRes,
    isLoading: getWarehouseIsLoading,
    error: getWarehouseErr,
    refetch: reloadWarehouse,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getWarehouseURL,
    requestConfig: {
      params: {
        s: s,
        p: p,
        size: size,
      },
    },
  });

  return {
    getWarehouseRes,
    getWarehouseIsLoading,
    getWarehouseErr,
    reloadWarehouse,
  };
};

export const CreateWarehouse = () => {
  const {
    response: createWarehouseRes,
    isLoading: createWarehouseIsLoading,
    error: createWarehouseErr,
    axiosFetch,
  } = useAxiosFunction();

  const createWarehouseAction = ({ data, districtId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createWarehouseURL,
      requestConfig: {
        data: data,
        params: {
          districtId: districtId,
        },
      },
    });
  };

  return {
    createWarehouseRes,
    createWarehouseIsLoading,
    createWarehouseErr,
    createWarehouseAction,
  };
};

export const UpdateWarehouseService = () => {
  const {
    response: updateWarehouseRes,
    isLoading: updateWarehouseIsLoading,
    error: updateWarehouseErr,
    axiosFetch,
  } = useAxiosFunction();

  const updateWarehouseAction = ({ data, warehouseId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updateWarehouseURL + warehouseId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updateWarehouseRes,
    updateWarehouseIsLoading,
    updateWarehouseErr,
    updateWarehouseAction,
  };
};


export const GetWarehouseService = () => {
  const {
    response: getWareHouseRes,
    isLoading: getWarehouseIsLoading,
    error: getWarehouseErr,
    axiosFetch,
  } = useAxiosFunction();

  const getWarehouseAction = (warehouseId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getAWarehouseURL + warehouseId,
    });
  };

  return {
    getWareHouseRes,
    getWarehouseIsLoading,
    getWarehouseErr,
    getWarehouseAction,
  };
};

export const RemoveWarehouseService = () => {
  const {
    response: removeWarehouseRes,
    error: removeWarehouseErr,
    loading: removeWarehouseIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removeWarehouseAction = (warehouseId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeWarehouseURL + warehouseId,
    });
  };

  return {
    removeWarehouseRes,
    removeWarehouseErr,
    removeWarehouseIsLoading,
    removeWarehouseAction,
  };
};
