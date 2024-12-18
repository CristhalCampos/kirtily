import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";
import { useState } from "react";
import Form from "../../components/Form";
import { forgotPassword } from "../../services/authService";
import animationDark from "../../resources/files/animationDark.mp4";
import animationLight from "../../resources/files/animationLight.mp4";

/**
 * @description Forgot password page
 * @route /forgot-password
 * @access public
 * @function ForgotPassword
 * @returns {JSX.Element}
 */
export const ForgotPassword = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formValues) => {
      try {
        setLoading(true);
        setErrorMessage(null);
  
        const response = await forgotPassword(formValues);
        console.log(response);
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-screen h-screen`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-black"} font-opensans text-sm md:text-lg w-[95%] h-[80%] md:h-[75%] p-8 flex flex-col md:flex-row justify-center items-center shadow`}>
        <div className="flex flex-col md:flex-row justify-around items-center h-1/5 w-full md:h-full md:w-1/2">
          <div className="flex flex-col justify-center items-center md:justify-start h-3/4">
            <video src={theme === 'dark' ? animationDark : animationLight} autoPlay loop className="h-full md:w-1/2 md:h-2/3" />
          </div>
          <div className={`${theme === 'dark' ? 'bg-[#5FA8F5]' : 'bg-[#FFD27F]'} md:w-[2px] w-4/5 md:h-full h-[2px] animate-pulse`}></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-3">
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-lg md:text-2xl text-center font-bold font-poppins mb-4`}>{t.titles.forgot}</h1>
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
          <p className="text-center text-sm md:text-base w-9/12 mb-2">{t.instruction}</p>
          <Form formType="forgotPassword" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;