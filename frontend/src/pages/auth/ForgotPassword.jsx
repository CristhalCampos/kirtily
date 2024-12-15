import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";
import animationDark from "../../resources/files/animationDark.mp4";
import animationLight from "../../resources/files/animationLight.mp4";

export const ForgotPassword = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-screen h-screen`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-black"} font-opensans text-sm md:text-lg w-[95%] h-[80%] md:h-[75%] p-8 flex flex-col md:flex-row justify-center items-center shadow`}>
        <div className="h-1/5 md:h-full md:w-1/2 flex flex-col justify-center items-center md:justify-start">
          <video src={theme === 'dark' ? animationDark : animationLight} autoPlay loop className="h-4/5 md:w-1/2 md:h-2/3" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-3">
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-lg md:text-2xl text-center font-bold font-poppins mb-4`}>{t.forgot}</h1>
          <p>{t.instruction}</p>
          <form method="post" action="">
            <input type="email" placeholder={t.email} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <button type="submit" className={`${theme === 'dark' ? 'bg-[#3B8AD9]' : 'bg-[#FF9E4D]'} font-poppins w-full rounded-2xl py-2 px-4 mt-2 shadow`}>{t.btnForgot}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;