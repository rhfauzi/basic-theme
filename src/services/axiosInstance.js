import axios from "axios";
import * as Constants from "../common/Utils/Constants";
import secureStorage from "../common/SecureStorage";
import pathnameCONFIG from "../common/pathnameCONFIG";

const baseUrlFlightServiceV1 = process.env.REACT_APP_BASE_URL_FLIGHT_SERVICE;

const axiosInstance = axios.create({
  baseURL: baseUrlFlightServiceV1,
  headers: {
    Authorization: `Bearer ${
      secureStorage.getItem("credentials")
        ? secureStorage.getItem("credentials").access_token
        : "dev"
    }`,
    "Browser-id": secureStorage.getItem("browserId")
      ? secureStorage.getItem("browserId")
      : "1234",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token =
        process.env.REACT_APP_ENVIRONMENT === "Local"
          ? "local"
          : secureStorage.getItem("credentials").access_token;
      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.timeout =
        config.timeout !== 0 ? config.timeout : Constants.TIME_OUT_API;
    } catch (e) {
      console.log(e);
    }

    return config;
  },
  (err) => {
    return err;
  }
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
      if (
        error &&
        error.response &&
        error.response.status &&
        (error.response.status >= 600 || error.response.status < 500)
      ) {
        secureStorage.setItem("credentials", {
          access_token: error.response.headers.access_token,
        });
      }
    }, 100);
    return Promise.reject(error);
  }
);

const asyncSecureStorage = {
  removeItem: async function (key) {
    return await secureStorage.removeItem(key);
  },
  goToLogin: async function () {
    return window.location.assign(pathnameCONFIG.LOGIN.BASE_URL);
  },
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      // appLog('Intercepting 401');
      asyncSecureStorage.removeItem("credentials").then(() => {
        asyncSecureStorage.goToLogin();
      });
      return Promise.reject("handle");
    } else {
      return Promise.reject(error);
    }
  }
);

/**
 * @param {string} path endpoint string
 * @param {null | (res: AxiosResponse<any>) => void} customResponse can be function or null
 * @return {(requestBody: {[key:string]: any}) => Promise<any>} return a callable function
 */
export const postFactoryRequest = (path, customResponse = null) =>
  async function (...requestBody) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(path, ...requestBody)
        .then((res) => {
          typeof customResponse === "function"
            ? resolve(customResponse(res))
            : resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export default axiosInstance;
