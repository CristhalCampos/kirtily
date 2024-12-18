import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import { useAuth } from "../contexts/useAuth";
import logoDark from '../resources/files/logoDark.png';
import logoLight from '../resources/files/logoLight.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

/**
 * @description Navigation bar component
 * @returns {JSX.Element}
 */
export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { role } = useAuth();

  const linkSearch = { icon: <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5 md:h-6 md:w-6" />, route: '/search', roles: ['user', 'userpremium', 'admin'] };

  return (
    <nav className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'} font-poppins w-full fixed top-0 z-10 px-4 py-2 flex justify-between items-center h-12`}>
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
          {theme === 'dark' ? <FontAwesomeIcon icon={faSun} className="h-5 w-5 md:h-6 md:w-6" /> : <FontAwesomeIcon icon={faMoon} className="h-5 w-5 md:h-6 md:w-6" />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;