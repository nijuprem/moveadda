import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router, } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
import { Provider } from "react-redux";
import store from "./app/store";
import './index.css'

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <Router>
        <App />
      </Router>
    </ToggleColorModeProvider>
  </Provider>
); 