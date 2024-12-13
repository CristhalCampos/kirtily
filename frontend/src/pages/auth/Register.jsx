import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";

export const Register = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className={`w-full h-full bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'}`}>
      <div className={`w-[90%] h-[90%] rounded-xl ${theme === 'dark' ? "bg-[#1E1E1E] text-white" : "bg-[#F0F0F0]"} text-black`}>
        <div>
          <p>{t.sloganRegister}</p>
        </div>
        <div>
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-xl font-bol'`}>{t.register}</h1>
          <input type="text" />
          <input type="text" />
          <input type="email" />
          <input type="password" />
          <input type="password" />
          <button className={`${theme === 'dark' ? 'bg-[#3B8AD9]' : 'bg-[#FF9E4D]'}`}>{t.btnRegister}</button>
          <p>{t.haveAccount} <a href="/login">{t.toLogin}</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;