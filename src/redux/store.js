import { init } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

// import banner from "./models/banner";

export const history = createBrowserHistory({
  basename: `/${process.env.REACT_APP_MICROSITENAME}`,
});

const routingMiddleware = routerMiddleware(history);

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["otp"],
};

const store = init({
  models: {
    // banner,
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
