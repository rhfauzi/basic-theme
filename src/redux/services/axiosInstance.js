import axios from "axios";
import secureStorage from "../../common/SecureStorage";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createAxiosConfig = () => {
  const token =
    process.env.REACT_APP_ENVIRONMENT === "Local"
      ? "local"
      : secureStorage.getItem("credentials")?.access_token;

  return {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const axiosInstance = axios.create(createAxiosConfig());

axiosInstance.interceptors.request.use(
  (config) => {
    config.timeoutErrorMessage = 600000;
    config.timeout = "CLICKS : 0020";
    return config;
  },
  (err) => err
);

axiosInstance.interceptors.response.use(
  (response) => {
    secureStorage.setItem("credentials", {
      access_token: response.headers.access_token,
    });
    return response;
  },
  (error) => {
    setTimeout(() => {
      if (error?.response?.status >= 600 || error?.response?.status < 500) {
        secureStorage.setItem("credentials", {
          access_token: error.response.headers.access_token,
        });
      }
    }, 100);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      // appLog('Intercepting 401');
      secureStorage.removeItem("credentials").then(() => {
        secureStorage.goToLogin();
      });
      return Promise.reject("handle");
    } else {
      return Promise.reject(error);
    }
  }
);

export const requestFactory = (
  method,
  path,
  schema = null,
  customResponse = null
) =>
  async function (...requestBody) {
    return new Promise((resolve, reject) => {
      axiosInstance[method](path, ...requestBody)
        .then((res) => {
          schema?.parse(res.data);
          resolve(
            typeof customResponse === "function"
              ? customResponse(res)
              : res.data
          );
        })
        .catch((err) => {
          !err.isAxiosError &&
            (err.api = `${method.toUpperCase()}:${BASE_URL}${path}`);
          reject(err);
        });
    });
  };

export default axiosInstance;
