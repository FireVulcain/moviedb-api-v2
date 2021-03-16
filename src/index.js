import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";

/* CSS */
import "./assets/css/reset.css";
import "./assets/css/style.css";

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById("root")
);
