import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import Form from "../../components/Form";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import animationDark from "../../resources/files/animationDark.mp4";
import animationLight from "../../resources/files/animationLight.mp4";

/**
 * @description Login page
 * @route /
 * @access public
 * @function Login
 * @redirect /feed
 * @returns {JSX.Element}
 */
export const Login = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setAccessToken, setRole } = useAuth();

  const handleSubmit = async (formValues) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await login(formValues);
      const { accessToken } = response;
      if (!accessToken) {
        setErrorMessage("A token was not received. Try again");
        return;
      }

      localStorage.setItem("role", JSON.stringify(response.role));
      setAccessToken(accessToken);
      setRole(response.role);

      navigate("/feed");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-screen h-screen`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-black"} font-opensans text-sm md:text-lg w-[95%] h-[80%] md:w-[97%] md:h-[77%] p-8 flex flex-col md:flex-row justify-center items-center shadow`}>
        <div className="flex flex-col md:flex-row justify-around items-center h-1/5 w-full md:h-full md:w-1/2">
          <div className="flex flex-col justify-center items-center md:justify-start h-3/4">
            <video src={theme === 'dark' ? animationDark : animationLight} autoPlay loop className="h-full md:w-1/2 md:h-2/3" />
            <p className="md:w-9/12 text-center italic">{t.sloganLogin}</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-[#5FA8F5]' : 'bg-[#FFD27F]'} md:w-[2px] w-4/5 md:h-full h-[2px] animate-pulse`}></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-3">
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-lg md:text-2xl text-center font-bold font-poppins mb-4`}>{t.titles.login}</h1>
          {/* Loading spinner */}
          {loading && (
            <div className={`${theme === 'dark' ? 'border-[#2C2C2C] border-t-[#FFD27F]' : 'border-white border-t-[#3B8AD9]'} h-8 w-8 animate-spin rounded-full border-4 mb-2`}></div>
          )}

          {/* Error message */}
          {errorMessage && (
            <p className="text-center text-sm md:text-base text-red-500">
              {errorMessage}
            </p>
          )}
          <Form formType="login" onSubmit={handleSubmit} />
          <p className="text-xs md:text-base mt-4 text-center">{t.forgotPassword} <Link to="/forgot-password" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.to.forgot}</Link></p>
          <p className="text-xs md:text-base mt-4 text-center">{t.notHaveAccount} <Link to="/register" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.to.register}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;