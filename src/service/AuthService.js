import useAxiosFunction from "@/hooks/useAxiosFunction";
import httpClient from "@/utils/axiosInstance";

const loginURL = "accounts/login";

export const LoginService = () => {
  const {
    response: loginResponse,
    error: loginError,
    loading: loginIsLoading,
    axiosFetch,
  } = useAxiosFunction();

  const loginAction = (values) => {
    axiosFetch({
      axiosInstance: httpClient,
      method: "POST",
      url: loginURL,
      requestConfig: {
        params: values,
      },
    });
  }

  return { loginResponse, loginError, loginIsLoading, loginAction };
};
