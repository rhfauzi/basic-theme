import bannerService from "../services/banner";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  state: {
    bannerData: [],
    fetching: false,
    fetched: false,
    error: {},
  },
  reducers: {
    getBanner_Succeed(state, payload) {
      return { ...state, bannerData: payload, fetching: false, fetched: true };
    },
    getBanner_Request(state, payload) {
      return { ...state, fetching: true };
    },
    getBanner_Failed(state, payload) {
      return { ...state, fetching: false, error: payload, fethed: true };
    },
  },
  effects: {
    async getBanner(requestBody = {}) {
      try {
        this.getBanner_Request();
        const response = await bannerService.getBanner(requestBody);
        // console.log('response', response)
        this.getBanner_Succeed(response);
      } catch (error) {
        console.error("error", error);
        this.getBanner_Failed(error);
      }
    },
  },
};
