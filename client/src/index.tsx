/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import { Store } from "./Components/Global/Store";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


const myclient = new QueryClient();
let persitstore = persistStore(Store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={myclient}>
    <BrowserRouter>
    <Provider store={Store}>
        <PersistGate persistor={persitstore}>
          
            <App />
            <ReactQueryDevtools />
         
        </PersistGate>
      </Provider>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
