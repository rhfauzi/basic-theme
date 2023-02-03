import dataInfoService from "../services/dataInfo";

const dataInfo = {
  state: {
    fetching: false,
    fetched: false,
    manageTeamsList: [],
    contactInformation: [],
    error: {},
  },
  reducers: {
    getData_Failed(state, payload) {
      return { ...state, fetching: false, error: payload, fetched: true };
    },
    getData_ManageTeams(state, payload) {
      return {
        ...state,
        manageTeamsList: payload,
        fetching: false,
        fetched: true,
        error: {},
      };
    },
  },
  effects: (dispatch) => ({
    async getManageTeams(requestBody = {}) {
      try {
        const response = await dataInfoService.getManageTeamsService(
          requestBody
        );
        console.log("response", response);
        this.getData_ManageTeams(response);
        // dispatch.dataInfo.manageTeamsList(response);
      } catch (error) {
        console.error("error 333333333333333333333", error);
        this.getData_Failed(error);
        return false;
      }
    },
  }),
};

export default dataInfo;