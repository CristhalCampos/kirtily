import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import { useTheme } from '../contexts/useTheme';

export const Footer = () => {
  const { theme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  return (
    <footer className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'} fixed bottom-0 w-full font-opensans text-xs md:text-base`}>
      <div className="flex justify-center items-center">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className={`border ${theme === 'dark' ? 'bg-[#1E1E1E] text-white border-white' : 'bg-[#F0F0F0] text-black border-black'} rounded-md py-1 px-3 md:px-4 m-2 appearance-none outline-none`}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <p>
          &copy; {new Date().getFullYear()} KIRTILY. {t.footer}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;