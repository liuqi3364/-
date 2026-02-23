import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 确保引入了 antd-mobile 样式
import "antd-mobile/es/global";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
