// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { getPersistor } from "@rematch/persist";
// import { PersistGate } from "redux-persist/lib/integration/react";

// import store from "./redux/store";
// import App from "./App";
// import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const persistor = getPersistor();

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes";

ReactDOM.render(<Router />, document.getElementById("root"));
