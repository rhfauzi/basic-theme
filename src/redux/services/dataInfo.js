import axiosInstance from "./axiosInstance";

const getManageTeamsService = (requestBody) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("getManageTeams", requestBody)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getContactInformationService = (requestBody) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("getContactInformation", requestBody)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const dataInfo = {
  getManageTeamsService,
  getContactInformationService,
};
export default dataInfo;
