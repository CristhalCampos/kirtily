import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations/translations';
import { useAuth } from "../contexts/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faBell, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * @description Component that renders the sidebar of the application
 * @returns {JSX.Element}
 */
export const SideBar = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const { role } = useAuth();

  const links = [
    { name: `${t.feed}`, icon: <FontAwesomeIcon icon={faHouse} />, route: '/feed', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.notifications}`, icon: <FontAwesomeIcon icon={faBell} />, route: '/notifications', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.create}`, icon: <FontAwesomeIcon icon={faPlus} />, route: '/create', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.messages}`, icon: <FontAwesomeIcon icon={faMessage} />, route: '/messages', roles: ['user', 'userpremium', 'admin'] },
    { name: `${t.admin}`, icon: <FontAwesomeIcon icon={faUser} />, route: '/admin', roles: ['admin'] },
  ];
  const profileLink = { name: `${t.profile}`, icon: <FontAwesomeIcon icon={faUser} />, route: '/profile', roles: ['user', 'userpremium', 'admin'] };
  
  return (
    role && (
      <div className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'} grid grid-cols-[1fr_15%] md:flex md:flex-col md:justify-around md:w-[20%] w-full fixed mt-14 md:left-0 md:h-[calc(100vh-24px)] h-12 p-4 z-10`}>
        <div className="flex justify-center items-center md:flex-col md:justify-center md:items-start">
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
        <NavLink
          to={profileLink.route}
          key={profileLink.name}
          className={({ isActive }) =>
            `flex flex-col md:flex-row md:justify-start items-center justify-center gap-2 p-2 rounded-md w-full ${theme === 'dark' ? 'text-[#FFD27F] hover:bg-[#2C2C2C]' : 'text-[#3B8AD9] hover:bg-gray-300'} ${isActive ? theme === 'dark' ? 'bg-[#2C2C2C]' : 'bg-gray-300' : ''}`
          }
        >
          <div className="flex items-center justify-center h-5 w-5 md:h-6 md:w-6">{profileLink.icon}</div>
          <span className={`hidden md:block md:ml-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{profileLink.name}</span>
        </NavLink>
      </div>
    )
  );
}

export default SideBar;