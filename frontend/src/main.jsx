import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from './contexts/themeContextProvider'
import { LanguageContextProvider } from './contexts/languageContextProvider'
import { RoleContextProvider } from "./contexts/roleContextProvider";
import './resources/css/output.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Register from './pages/auth/Register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <RoleContextProvider>
          <div className="flex flex-col">
            <BrowserRouter>
              <NavBar />
              <main className="flex-grow">
                <Routes>
                  {/* Auth pages */}
                  <Route path="/register" element={<Register />} />
                  {/* Protected pages */}
                  {/* Error pages */}
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </div>
        </RoleContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
