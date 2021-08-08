import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import { refreshToken } from "./auth/refreshToken";
import { refreshToken } from "./auth/use-auth";

// FIXME PRIORITY: refreshing PM sends u to the login page. FIX.

// attempt silent token refresh on page load
refreshToken().finally((x) => {
    console.log("rendering!!!!!!!!!!!!!!!!!!!!");
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>,
        document.getElementById("root")
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
