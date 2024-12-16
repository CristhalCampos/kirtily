import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";
import { Link } from "react-router-dom";
import animationDark from "../../resources/files/animationDark.mp4";
import animationLight from "../../resources/files/animationLight.mp4";

export const Register = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-screen h-screen`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-black"} font-opensans text-sm md:text-lg w-[95%] h-[80%] md:h-[75%] p-8 flex flex-col md:flex-row justify-center items-center shadow`}>
        <div className="h-1/5 md:h-full md:w-1/2 flex flex-col justify-center items-center md:justify-start">
          <video src={theme === 'dark' ? animationDark : animationLight} autoPlay loop className="h-4/5 md:w-1/2 md:h-2/3" />
          <p className="md:w-9/12 text-center italic">{t.sloganRegister}</p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-3">
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-lg md:text-2xl text-center font-bold font-poppins mb-4`}>{t.register}</h1>
          <form method="post" action="">
            <input type="text" placeholder={t.fullName} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <input type="text" placeholder={t.username} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <input type="email" placeholder={t.email} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <input type="password" placeholder={t.password} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <input type="password" placeholder={t.confirmPassword} className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full py-2 px-4 mb-2 rounded outline-none`} />
            <button type="submit" className={`${theme === 'dark' ? 'bg-[#3B8AD9]' : 'bg-[#FF9E4D]'} font-poppins w-full rounded-2xl py-2 px-4 mt-2 shadow`}>{t.btnRegister}</button>
          </form>
          <p className="text-xs md:text-base mt-4 text-center">{t.haveAccount} <Link to="/login" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.login}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;