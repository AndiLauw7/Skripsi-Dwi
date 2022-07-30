import React from "react";
import ReactDOM from "react-dom";
import "../src/assets/css/styles.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import LoadingBar from "./components/loadingBar";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingBar />}>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
