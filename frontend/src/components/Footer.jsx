import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import { useTheme } from '../contexts/useTheme';

export const Footer = () => {
  const { theme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  return (
    <footer className={`${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-[#F0F0F0] text-black'}`}>
      <div className="flex justify-center items-center">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} KIRTILY. {t.footer}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;