import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getAllRegionsURL = "/address/regions";
const getProvinceURL = "/address/province/";
const getDistrictURL = "/address/district/";
const getDistrictByIdURL = "/address/district/get-by-id/";

export const GetAllRegion = () => {
  const {
    response: getAllRegionRes,
    isLoading: getAllRegionIsLoading,
    error: getAllRegionErr,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllRegionsURL,
  });

  return {
    getAllRegionRes,
    getAllRegionIsLoading,
    getAllRegionErr,
  };
};

export const GetProvince = () => {
  const {
    response: getProvinceRes,
    isLoading: getProvinceIsLoading,
    error: getProvinceErr,
    axiosFetch,
  } = useAxiosFunction();

  const getProvinceAction = ({ regionId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getProvinceURL + regionId,
    });
  };

  return {
    getProvinceRes,
    getProvinceIsLoading,
    getProvinceErr,
    getProvinceAction,
  };
};

export const GetDistrict = () => {
  const {
    response: getDistrictRes,
    isLoading: getDistrictIsLoading,
    error: getDistrictErr,
    axiosFetch,
  } = useAxiosFunction();

  const getDistrictAction = ({ provinceId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getDistrictURL + provinceId,
    });
  };

  return {
    getDistrictRes,
    getDistrictIsLoading,
    getDistrictErr,
    getDistrictAction,
  };
};

export const GetDistrictById = () => {
  const {
    response: getDistrictByIdRes,
    isLoading: getDistrictByIdIsLoading,
    error: getDistrictByIdError,
    axiosFetch,
  } = useAxiosFunction();

  const getDistrictByIdAction = (districtId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getDistrictByIdURL + districtId,
    });
  };

  return {
    getDistrictByIdRes,
    getDistrictByIdIsLoading,
    getDistrictByIdError,
    getDistrictByIdAction,
  };
};
