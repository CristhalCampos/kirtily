import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import { useRole } from '../contexts/useRole';
import logoDark from '../resources/files/logoDark.png';
import logoLight from '../resources/files/logoLight.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faSun, faMoon, faUser, faBell, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const { role } = useRole();

  const links = [
    { name: `${t.feed}`, icon: <FontAwesomeIcon icon={faHouse} />, route: '/feed', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.notifications}`, icon: <FontAwesomeIcon icon={faBell} />, route: '/notifications', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.create}`, icon: <FontAwesomeIcon icon={faPlus} />, route: '/create', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.messages}`, icon: <FontAwesomeIcon icon={faMessage} />, route: '/messages', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.admin}`, icon: <FontAwesomeIcon icon={faUser} />, route: '/admin', roles: ['admin'] },
    { name: `${t.profile}`, icon: <FontAwesomeIcon icon={faUser} />, route: '/profile', roles: ['user', 'userpremium', 'admin'] },
  ];

  const linkSearch = { icon: <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5 md:h-6 md:w-6" />, route: '/search', roles: ['user', 'userpremium', 'admin'] };

  return (
    <nav className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'} font-poppins flex flex-col fixed top-0 left-0 w-full`}>
      {/* First Row */}
      <div className="flex justify-between items-center p-4 h-11 md:h-14">
        <div className="h-10">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Logo" className="h-9 md:h-10" />
        </div>
        <div className="flex gap-4 items-center">
          {linkSearch.roles.includes(role) && (
            <NavLink
              to={linkSearch.route}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md w-full ${theme === 'dark' ? 'text-[#FFD27F] hover:bg-[#2C2C2C]' : 'text-[#3B8AD9] hover:bg-gray-300'} ${isActive ? '' : ''}`
              }
            >
              {linkSearch.icon}
            </NavLink>
          )}
          <button
            onClick={toggleTheme}
            className={`${theme === 'dark' ? 'text-[#FFD27F] hover:bg-[#2C2C2C]' : 'text-[#3B8AD9] hover:bg-gray-300'} p-2 rounded-md`}
          >
            {theme === 'dark' ? <FontAwesomeIcon icon={faMoon} className="h-5 w-5 md:h-6 md:w-6" /> : <FontAwesomeIcon icon={faSun} className="h-5 w-5 md:h-6 md:w-6" />}
          </button>
        </div>
      </div>

      {/* Second Row */}
      {role && (
        <div className="flex justify-center items-center p-2 gap-4 h-8 md:flex-col md:justify-between md:items-start md:w-[18%] md:h-screen">
          {links.map((link) =>
            link.roles.includes(role) && (
              <NavLink
                to={link.route}
                key={link.name}
                className={({ isActive }) =>
                  `flex flex-col md:flex-row md:justify-start items-center justify-center gap-2 p-2 rounded-md w-full ${theme === 'dark' ? 'text-[#FFD27F] hover:bg-[#2C2C2C]' : 'text-[#3B8AD9] hover:bg-gray-300'} ${isActive ? theme === 'dark' ? 'bg-[#2C2C2C]' : 'bg-gray-300' : ''}`
                }
              >
                <div className="flex items-center justify-center h-5 w-5 md:h-6 md:w-6">{link.icon}</div>
                <span className={`hidden md:block md:ml-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.name}</span>
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;