import axiosInstance from "./axiosInstance";

const bannerService = {};

bannerService.getBanner = (requestBody) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("getbanner", requestBody)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default bannerService;
