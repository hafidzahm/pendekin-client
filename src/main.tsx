import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import PublicLayout from "./layouts/PublicLayout";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
