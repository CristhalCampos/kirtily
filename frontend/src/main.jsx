import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from './contexts/themeContextProvider'
import { LanguageContextProvider } from './contexts/languageContextProvider'
import { RoleContextProvider } from "./contexts/roleContextProvider";
import './resources/css/output.css'
import Layout from "./components/Layout";
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <RoleContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Auth pages */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* Protected pages */}
                {/* Error pages */}
              </Routes>
            </Layout>
          </BrowserRouter>
        </RoleContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
