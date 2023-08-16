import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getProductsURL = "/product/get/paginate";
const newProductURL = "/product/create";
const updateProductURL = "/product/update/";
const disableProductURl = "/product/disable/";
const reactiveProductURL = "/product/reactive/";
const getProductByIdListURL = "/product/get/ids";
const removeProductURL = "/product/delete/";

export const GetProduct = (s = "", p = 0, size = 5) => {
    const {
      response: getProductsResponse,
      isLoading: getProductsIsLoading,
      error: getProductsError,
      refetch: reloadProducts,
    } = useAxios({
      axiosInstance: httpClient,
      method: "GET",
      url: getProductsURL,
      requestConfig: {
        params: {
          s: s,
          p: p,
          size: size,
        },
      },
    });

    return {
      getProductsResponse,
      getProductsIsLoading,
      getProductsError,
      reloadProducts,
    };
}; 

export const NewProductService = () => {
  const {
    response: newProductRespone,
    error: newProductErr,
    loading: newProductIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const newProductAction = (data) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: newProductURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    newProductRespone,
    newProductErr,
    newProductIsLoading,
    newProductAction,
  };
}

export const UpdateProductService = () => {
  const {
    response: updateProductResponse,
    error: updateProductError,
    loading: updateProductIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updateProductAction = ({productId, data}) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updateProductURL + productId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updateProductResponse,
    updateProductError,
    updateProductIsLoading,
    updateProductAction,
  };
};

export const DisableProduct = () => {
  const {
    response: disableProductResponse,
    error: disableProductError,
    loading: disableProductIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const disableProductAction = ({ productId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: disableProductURl + productId,
    });
  };

  return {
    disableProductResponse,
    disableProductError,
    disableProductIsLoading,
    disableProductAction,
  };
};

export const ReactiveProduct = () => {
  const {
    response: reactiveProductResponse,
    error: reactiveProductError,
    loading: reactiveProductIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const reactiveProductAction = ({ productId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: reactiveProductURL + productId,
    });
  };

  return {
    reactiveProductResponse,
    reactiveProductError,
    reactiveProductIsLoading,
    reactiveProductAction,
  };
};

export const GetProductByIdList = () => {
  const {
    response: getProductByIdListRes,
    error: getProductByIdErr,
    loading: getProductByIdListIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const getProductByIdListAction = (idListString) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getProductByIdListURL,
      requestConfig: {
        params: {
          idList: idListString,
        },
      },
    });
  };

  return {
    getProductByIdListRes,
    getProductByIdErr,
    getProductByIdListIsLoading,
    getProductByIdListAction,
  };
};

export const RemoveProductService = () => {
  const {
    response: removeProductRes,
    error: removeProductErr,
    loading: removeProductIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removeProductAction = (productId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeProductURL + productId,
    });
  };

  return {
    removeProductRes,
    removeProductErr,
    removeProductIsLoading,
    removeProductAction,
  };
};