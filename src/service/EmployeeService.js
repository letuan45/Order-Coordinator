import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getEmployeesURL =
  "/employee/get/paginate";
const checkHasAccountURL = "/accounts/has-account/";
const createEmployeesURL = "/employee/create";
const getSingleEmployeeURL = "/employee/get/";
const updateEmployeesURL = "/employee/update/";
const getEmployeesByIdURL = "/employee/get-by-warehouse/";
const removeEmployeeURL = "/employee/delete/";

export const GetEmployees = (s= "", p = 0, size = 5) => {
  const {
    response: employeesResponse,
    isLoading: employeesIsLoading,
    error: employeesError,
    refetch: reloadEmployees,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getEmployeesURL,
    requestConfig: {
      params: {
        s: s,
        p: p,
        size: size,
      },
    },
  });

  return {
    employeesResponse,
    employeesIsLoading,
    employeesError,
    reloadEmployees,
  };
};

export const GetSingleEmployee = ({employeeId}) => {
  const { response: employeeResponse, error: employeeError } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getSingleEmployeeURL + employeeId,
  });

  return {
    employeeResponse,
    employeeError
  };
};

export const CheckHasAccountService = () => {
  const {
    response: checkHasAccountResponse,
    error: checkHasAccountError,
    axiosFetch,
  } = useAxiosFunction();

  const checkHasAccountAction = (employeeId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: checkHasAccountURL + employeeId,
    });
  };

  return {
    checkHasAccountResponse,
    checkHasAccountError,
    checkHasAccountAction,
  };
};

export const CreateEmployeeService = () => {
  const {
    response: createEmployeeResponse,
    error: createEmployeeError,
    loading: createEmployeeIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const createEmployeeAction = ({data, warehouseId}) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: createEmployeesURL,
      requestConfig: {
        data: data,
        params: {
          warehouseId: warehouseId,
        },
      },
    });
  }

  return {
    createEmployeeResponse,
    createEmployeeError,
    createEmployeeIsLoading,
    createEmployeeAction,
  };
}

export const UpdateEmployeeService = () => {
  const {
    response: updateEmployeeResponse,
    error: updateEmployeeError,
    loading: updateEmployeeIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const updateEmployeeAction = ({ data, employeeId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: updateEmployeesURL + employeeId,
      requestConfig: {
        data: data,
      },
    });
  };

  return {
    updateEmployeeResponse,
    updateEmployeeError,
    updateEmployeeIsLoading,
    updateEmployeeAction,
  };
};

export const GetEmployeesByWarehose = (warehouseId, p = 0, size = 5) => {
  const {
    response: employeesWHResponse,
    isLoading: employeesWHIsLoading,
    error: employeesWHError,
    refetch: reloadEmployeesWH,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getEmployeesByIdURL + warehouseId,
    requestConfig: {
      params: {
        p: p,
        size: size,
      },
    },
  });

  return {
    employeesWHResponse,
    employeesWHIsLoading,
    employeesWHError,
    reloadEmployeesWH,
  };
};

export const RemoveEmployeeService = () => {
  const {
    response: removeEmployeeRes,
    error: removeEmployeeErr,
    loading: removeEmployeeIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const removeEmployeeAction = (employeeId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "DELETE",
      url: removeEmployeeURL + employeeId,
    });
  };

  return {
    removeEmployeeRes,
    removeEmployeeErr,
    removeEmployeeIsLoading,
    removeEmployeeAction,
  };
};