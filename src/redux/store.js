import { init } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import banner from "./models/banner";
import dataInfo from "./models/dataInfo";

export const history = createBrowserHistory({
  basename: `/admin`,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["otp"],
};

const routingMiddleware = routerMiddleware(history);

const store = init({
  models: {
    banner,
    dataInfo,
  },
  redux: {
    reducers: {
      router: connectRouter(history),
    },
    middlewares: [routingMiddleware],
  },
  plugins: [persistPlugin(persistConfig)],
});

export default store;
