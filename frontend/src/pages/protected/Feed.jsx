import { useTheme } from "../../contexts/useTheme";
import { useLanguage } from "../../contexts/useLanguage";
import { translations } from "../../translations/translations";

export const Feed = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'} w-full h-full flex justify-center items-center`}>
      <p>{t.feed}</p>
    </div>
  );
}

export default Feed