import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from './contexts/themeContextProvider'
import { LanguageContextProvider } from './contexts/languageContextProvider'
import { AuthContextProvider } from "./contexts/authContextProvider";
import './resources/css/output.css'
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Feed from "./pages/protected/Feed";
import NotFound from "./pages/error/NotFound";
import Unauthorized from "./pages/error/Unauthorized";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                {/* Auth pages */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* Protected pages */}
                <Route path="/feed" element={
                  <ProtectedRoute roles={['user', 'userpremium', 'admin']}>
                    <Feed />
                  </ProtectedRoute>
                } />
                {/* Error pages */}
                <Route path="*" element={<NotFound />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
