import useAxios from "@/hooks/useAxios";
import httpClient from "@/utils/axiosInstance";
import useAxiosFunction from "@/hooks/useAxiosFunction";

const getAllRoleURL = "/accounts/role/get-all";
const registerURL = "/accounts/register";
const getRoleByEmployeeURL = "/accounts/get-role/";
const changePasswordURL = "/accounts/change";
const changeUserRoleURL = "/accounts/grant";
const requestResetPassURL = "/accounts/forget";
const resetPasswordURL = "/accounts/forget/change-password";

export const GetAllRole = () => {
  const {
    response: getAllRoleRes,
    isLoading: getAllRoleIsLoading,
    error: getAllRoleError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getAllRoleURL,
  });

  return {
    getAllRoleRes,
    getAllRoleIsLoading,
    getAllRoleError,
  };
};

export const GetRoleByEmployee = () => {
  const {
    response: getRoleByEmployeeRes,
    isLoading: getRoleByEmployeeIsLoading,
    error: getRoleByEmployeeErr,
    axiosFetch,
  } = useAxiosFunction();

  const getRoleByEmployeeAction = (employeeId) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "GET",
      url: getRoleByEmployeeURL + employeeId,
    });
  };

  return {
    getRoleByEmployeeRes,
    getRoleByEmployeeIsLoading,
    getRoleByEmployeeErr,
    getRoleByEmployeeAction,
  };
};

export const RegiserService = () => {
  const {
    response: registerRes,
    error: registerErr,
    loading: registerIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const registerAction = ({ data, params }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: registerURL,
      requestConfig: {
        data: data,
        params: params,
      },
    });
  };

  return { registerRes, registerErr, registerIsLoading, registerAction };
};

export const ChangePasswordService = () => {
  const {
    response: changePasswordResponse,
    error: changePasswordError,
    loading: changePassowordIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const changePasswordAction = (data) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: changePasswordURL,
      requestConfig: {
        params: data,
      },
    });
  };

  return {
    changePasswordResponse,
    changePasswordError,
    changePassowordIsLoading,
    changePasswordAction,
  };
};

export const GrantUserRole = () => {
  const {
    response: grantUserRoleRes,
    error: grantUserRoleErr,
    loading: grantUserRoleIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const changeUserRoleAction = ({ employeeId, roleId }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "PUT",
      url: changeUserRoleURL,
      requestConfig: {
        params: {
          employeeId: employeeId,
          roleId: roleId,
        },
      },
    });
  };

  return {
    grantUserRoleRes,
    grantUserRoleErr,
    grantUserRoleIsLoading,
    changeUserRoleAction,
  };
};

export const RequestChangePassService = () => {
  const {
    response: requestResetPassRes,
    error: requestResetPassErr,
    loading: requestResetPassIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const requestResetPassAction = ({ username2 }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: requestResetPassURL,
      requestConfig: {
        params: {
          username: username2,
        },
      },
    });
  };

  return {
    requestResetPassRes,
    requestResetPassErr,
    requestResetPassIsLoading,
    requestResetPassAction,
  };
};

export const ResetPasswordService = () => {
  const {
    response: resetPasswordRes,
    error: resetPasswordErr,
    loading: resetPasswordIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const resetPasswordAction = ({ resetToken, newPassword }) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: resetPasswordURL,
      requestConfig: {
        params: {
          resetToken: resetToken,
          newPassword: newPassword,
        },
      },
    });
  };

  return {
    resetPasswordRes,
    resetPasswordErr,
    resetPasswordIsLoading,
    resetPasswordAction,
  };
};