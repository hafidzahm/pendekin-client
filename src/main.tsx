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
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import DashboardPage from "./pages/DashboardPage";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
  // </StrictMode>
);
