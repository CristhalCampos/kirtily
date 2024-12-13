import { useTheme } from "../contexts/useTheme";
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import logoDark from '../resources/img/logoDark.png';
import logoLight from '../resources/img/logoLight.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faSun, faMoon, faUser, faBell, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <nav className={`${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-[#F0F0F0] text-black'}`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="">
          <img src={`${theme === 'dark' ? logoDark : logoLight}`} alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center">
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6" />
          </button>
          {/* Dark mode toggle */}
          <button onClick={toggleTheme}>
            {theme === 'dark' ? (
              <FontAwesomeIcon icon={faSun} className="h-6" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Only for protected routes */}
      <div className="flex justify-around items-center">
        <button className="">
          <FontAwesomeIcon icon={faHouse} className="h-6" />
          <span className="text-sm">{t.feed}</span>
        </button>
        <button className="">
          <FontAwesomeIcon icon={faBell} className="h-6" />
          <span className="text-sm">{t.notifications}</span>
        </button>
        <button className="">
          <FontAwesomeIcon icon={faPlus} className="h-6" />
          <span className="text-sm">{t.create}</span>
        </button>
        <button className="">
          <FontAwesomeIcon icon={faMessage} className="h-6" />
          <span className="text-sm">{t.messages}</span>
        </button>
        <button className="">
          <FontAwesomeIcon icon={faUser} className="h-6" />
          <span className="text-sm">{t.profile}</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;