import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DarkModeProvider } from "context/darkMode.context";

import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//react strict mode - problem z beautiful dnd
root.render(
  <DarkModeProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </DarkModeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// react 17.0.2

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// ReactDOM.render(
//   <DarkModeProvider>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </DarkModeProvider>,
//   document.getElementById("root")
// );
