import axios from "axios";

const URL = "http://localhost:8000/api/v1";

export const defaultError = "Something went wrong! Try again later.";
export const checkInternetError = "Check your internet connection";

// export const handleError = (error) => {
//   const errorString = error?.response?.data
//     ? error?.response?.data?.message
//     : error?.message;
//   return {
//     message: errorString ? errorString : defaultError,
//     code: `${error?.response?.status || error?.code}`,
//   };
// };
export const handleValidation = (error) => {
  // console.error("axiosInstance -> handleValidation", error);
  const errorMsg = error?.response?.data?.error
    ? error?.response?.data?.error.message
    : error?.message;
  const errorCode = error?.response?.status;
  return {
    message: errorMsg ? errorMsg : defaultError,
    code: `${errorCode || error?.code}`,
  };
};

export const setAxiosAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers["auth-token"] = token;
  } else {
    delete axiosInstance.defaults.headers["auth-token"];
  }
};

const onFulfilledRequest = (response) => response;
const onRejectedResponse = (error) => {
  console.error("onRejectedResponse =========>", error);
  if (!error.response) {
    //console.error('inside response');
    return Promise.reject(checkInternetError);
  }
  if (handleValidation(error)) {
    // console.error("inside handleValidation");
    return Promise.reject(handleValidation(error));
  }
  // if (handleError(error)) {
  //   // console.error("inside handleError");
  //   return Promise.reject(handleError(error));
  // }
  console.error("else");
  return Promise.reject({ ...error });
};

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
  timeout: 10000,
  baseURL: URL,
});

axiosInstance.interceptors.response.use(onFulfilledRequest, onRejectedResponse);

export default axiosInstance;
