import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";

export const Register = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#5FA8F5] via-[#3B8AD9] to-[#2C6EA3]' : 'from-[#FFD27F] via-[#FF9E4D] to-[#F5765F]'} flex justify-center items-center w-full h-full`}>
      <div className={`rounded-xl ${theme === 'dark' ? "bg-[#1E1E1E] text-white" : "bg-[#F0F0F0] text-black"} w-[90%] h-[90%] p-8 flex flex-col md:flex-row justify-center items-center`}>
        <div>
          <p>{t.sloganRegister}</p>
        </div>
        <div>
          <h1 className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'} text-2xl text-center font-bold mb-4`}>{t.register}</h1>
          <input type="text" className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full p-2 mb-2 rounded outline-none`} />
          <input type="text" className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full p-2 mb-2 rounded outline-none`} />
          <input type="email" className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full p-2 mb-2 rounded outline-none`} />
          <input type="password" className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full p-2 mb-2 rounded outline-none`} />
          <input type="password" className={`${theme === 'dark' ? 'bg-[#2C2C2C] text-white' : 'bg-gray-300 text-black'} w-full p-2 mb-2 rounded outline-none`} />
          <button className={`${theme === 'dark' ? 'bg-[#3B8AD9]' : 'bg-[#FF9E4D]'} w-full rounded-2xl py-2 px-4`}>{t.btnRegister}</button>
          <p className="text-sm mt-4 text-center">{t.haveAccount} <a href="/login" className={`${theme === 'dark' ? 'text-[#FFD27F]' : 'text-[#3B8AD9]'}`}>{t.toLogin}</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;