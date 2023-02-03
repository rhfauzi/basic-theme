import dataInfoService from "../services/dataInfo";

const dataInfo = {
  state: {
    fetching: false,
    fetched: false,
    data: {
      manageTeamsList: {},
      contactInformation: {},
    },
    error: {},
  },
  reducers: {
    getData_Failed(state, payload) {
      return { ...state, fetching: false, error: payload, fetched: true };
    },
    getData_Success(state, payload) {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: {},
        data: { ...state.data, ...payload },
      };
    },
  },
  effects: (dispatch) => ({
    async getManageTeams(requestBody = {}) {
      try {
        const response = await dataInfoService.getManageTeamsService(
          requestBody
        );
        console.log("response getManageTeams", response);
        this.getData_Success(response);
        // dispatch.dataInfo.manageTeamsList(response);
      } catch (error) {
        console.error("error 333333333333333333333", error);
        this.getData_Failed(error);
        return false;
      }
    },

    async getContactInformation(requestBody = {}) {
      try {
        const response = await dataInfoService.getContactInformationService(
          requestBody
        );
        console.log("response getContactInformation", response);
        this.getData_Success(response);
      } catch (error) {
        console.error("error 333333333333333333333", error);
        this.getData_Failed(error);
        return false;
      }
    },
  }),
};

export default dataInfo;