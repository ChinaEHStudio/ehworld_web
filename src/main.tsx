import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reg from "./routes/Reg"
import App from "./components/App";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="reg" element={<Reg />} />
    </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
