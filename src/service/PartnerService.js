import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getPartnerURL = "/partner/get";
const createPartnerURL = "/partner/create";
const updatePartnerURL = "/partner/update/";
const getPartnerByIdURL = "/partner/get-partner/";
const getPartnersDeliveryPricesURL = "/delivery/get-by-partner/";
const createPriceURL = "/delivery/create";
const updatePriceURL = "/delivery/update/";
const removePartnerURL = "/partner/delete/";

export const GetPartners = (s = "", p = 0, size = 5) => {
  const {
    response: getPartnersResponse,
    isLoading: getPartnersIsLoading,
    error: getPartnerError,
    refetch: reloadPartner,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getPartnerURL,
    requestConfig: {
      params: {
        s: s,
        p: p,
        size: size,
      },
    },
  });

  return {
    getPartnersResponse,
    getPartnersIsLoading,
    getPartnerError,
    reloadPartner,
  };
};

export const GetPartnersDeliveryPrices = (partnerId) => {
  const {
    response: getPricesResponse,
    isLoading: getPricesIsLoading,
    error: getPricesError,
    refetch: reloadPrices,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getPartnersDeliveryPricesURL + partnerId,
  });

  return {
    getPricesResponse,
    getPricesIsLoading,
    getPricesError,
    reloadPrices,
  };
};

export const CreatePartnerService = () => {
  const {
    response: createPartnerResponse,
    error: createPartnerError,
    loading: createPartnerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const createPartnerAction = (data) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createPartnerURL,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    createPartnerResponse,
    createPartnerError,
    createPartnerIsLoading,
    createPartnerAction,
  };
};

export const UpdatePartnerService = () => {
  const {
    response: updatePartnerResponse,
    error: updatePartnerError,
    loading: updatePartnerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updatePartnerAction = ({ data, partnerId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updatePartnerURL + partnerId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updatePartnerResponse,
    updatePartnerError,
    updatePartnerIsLoading,
    updatePartnerAction,
  };
};

export const GetPartnerByIdService = () => {
  const {
    response: getPartnerByIdRes,
    error: getPartnerByIdErr,
    loading: getPartnerByIdIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const getPartnerByIdAction = (partnerId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getPartnerByIdURL + partnerId,
    });
  };

  return {
    getPartnerByIdRes,
    getPartnerByIdErr,
    getPartnerByIdIsLoading,
    getPartnerByIdAction,
  };
};

export const CreatePriceService = () => {
  const {
    response: createPriceResponse,
    error: createPriceError,
    loading: createPriceIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const createPriceAction = ({ partnerId, deliveryTypeId, deliveryPrice }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createPriceURL,
      requestConfig: {
        params: {
          partnerId: partnerId,
          deliveryTypeId: deliveryTypeId,
          deliveryPrice: deliveryPrice
        },
      },
    });
  };

  return {
    createPriceResponse,
    createPriceError,
    createPriceIsLoading,
    createPriceAction,
  };
};

export const UpdatePriceService = () => {
  const {
    response: updatePriceResponse,
    error: updatePriceError,
    loading: updatePriceIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updatePriceAction = ({ priceId, active, price }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updatePriceURL + priceId,
      requestConfig: {
        data: {
          active: active,
          price: price
        },
      },
    });
  };

  return {
    updatePriceResponse,
    updatePriceError,
    updatePriceIsLoading,
    updatePriceAction,
  };
};

export const RemovePartnerService = () => {
  const {
    response: removePartnerRes,
    error: removePartnerError,
    loading: removePartnerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removePartnerAction = (partnerId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removePartnerURL + partnerId,
    });
  };

  return {
    removePartnerRes,
    removePartnerError,
    removePartnerIsLoading,
    removePartnerAction,
  };
};
