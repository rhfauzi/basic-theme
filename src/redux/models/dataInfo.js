import dataInfoService from "../services/dataInfo";

const dataInfo =  {
  state: {
    bannerData: [],
    fetching: false,
    fetched: false,
    manageTeamsList: [],
    error: {},
  },
  reducers: {
    getBanner_Succeed(state, payload) {
      return { ...state, bannerData: payload, fetching: false, fetched: true };
    },
    getData_Request(state, payload) {
      return { ...state, fetching: true };
    },
    getData_Failed(state, payload) {
      return { ...state, fetching: false, error: payload, fetched: true };
    },
    SET_PRODUCT_LIST: (state, payload) => ({
      ...state,
      manageTeamsList: payload,
    }),
  },
  effects: (dispatch) => ({
    async getManageTeams(requestBody = {}) {
      try {
        const response = await dataInfoService.getManageTeamsService(
          requestBody
        );
        console.log("response", response);
        // dispatch.dataInfo.manageTeamsList(response);
      } catch (error) {
        console.error("error", error);
        this.getData_Failed(error);
      }
    },
  }),
};

export default dataInfo;