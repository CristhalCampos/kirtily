import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";
import { useState } from "react";
import Form from "../../components/Form";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";
import animationDark from "../../resources/files/animationDark.mp4";
import animationLight from "../../resources/files/animationLight.mp4";

export const Login = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formValues) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await login(formValues);
      console.log(response);

      // Redirect to feed page
      window.location.href = "/feed";

    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-screen h-screen`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-black"} font-opensans text-sm md:text-lg w-[95%] h-[80%] md:h-[75%] p-8 flex flex-col md:flex-row justify-center items-center shadow`}>
        <div className="h-1/5 md:h-full md:w-1/2 flex flex-col justify-center items-center md:justify-start">
          <video src={theme === 'dark' ? animationDark : animationLight} autoPlay loop className="h-4/5 md:w-1/2 md:h-2/3" />
          <p className="md:w-9/12 text-center italic">{t.sloganRegister}</p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-3">
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-lg md:text-2xl text-center font-bold font-poppins mb-4`}>{t.login}</h1>
          {/* Loading spinner */}
          {loading && (
            <p className="text-center text-sm md:text-base text-gray-500">
              {t.loading}...
            </p>
          )}

          {/* Error message */}
          {errorMessage && (
            <p className="text-center text-sm md:text-base text-red-500">
              {errorMessage}
            </p>
          )}
          <Form formType="login" onSubmit={handleSubmit} />
          <p className="text-xs md:text-base mt-4 text-center">{t.forgotPassword} <Link to="/forgot-password" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.toForgot}</Link></p>
          <p className="text-xs md:text-base mt-4 text-center">{t.notHaveAccount} <Link to="/register" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.toRegister}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;