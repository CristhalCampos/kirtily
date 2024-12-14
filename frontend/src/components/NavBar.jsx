import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import { useRole } from '../contexts/useRole';
import logoDark from '../resources/img/logoDark.png';
import logoLight from '../resources/img/logoLight.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faSun, faMoon, faUser, faBell, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const { role } = useRole();

  if (!role) {
    console.error("The 'role' context is not defined");
    return null;
  }

  const links = [
    { name: `${t.feed}`, icon: <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />, route: '/feed', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.notifications}`, icon: <FontAwesomeIcon icon={faBell} className="h-6 w-6" />, route: '/notifications', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.create}`, icon: <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />, route: '/create', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.messages}`, icon: <FontAwesomeIcon icon={faMessage} className="h-6 w-6" />, route: '/messages', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.admin}`, icon: <FontAwesomeIcon icon={faUser} className="h-6 w-6" />, route: '/admin', roles: ['admin'] },
    { name: `${t.profile}`, icon: <FontAwesomeIcon icon={faUser} className="h-6 w-6" />, route: '/profile', roles: ['user', 'userpremium', 'admin'] },
  ];

  const linkSearch = { icon: <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6" />, route: '/search', roles: ['user', 'userpremium', 'admin'] };

  return (
    <nav className={`${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-[#F0F0F0] text-black'} flex flex-col`}>
      {/* First Row */}
      <div className="flex justify-between items-center p-4 h-10">
        <div className="h-10">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Logo" className="h-8" />
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
            {theme === 'dark' ? <FontAwesomeIcon icon={faMoon} className="h-6 w-6" /> : <FontAwesomeIcon icon={faSun} className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex justify-center items-center p-2 gap-4 h-8 md:flex-col md:justify-between md:items-start md:w-[15%] md:h-screen">
        {links.map((link) =>
          link.roles.includes(role) && (
            <NavLink
              to={link.route}
              key={link.name}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md w-full ${theme === 'dark' ? 'text-[#FFD27F] hover:bg-[#2C2C2C]' : 'text-[#3B8AD9] hover:bg-gray-300'} ${isActive ? theme === 'dark' ? 'bg-[#2C2C2C]' : 'bg-gray-300' : ''}`
              }
            >
              {link.icon}
              <span className={`hidden md:block ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.name}</span>
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;