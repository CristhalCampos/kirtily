import { useTheme } from "../contexts/useTheme";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const authRoutes = ['/', '/register', '/forgot-password', '/reset-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <nav className={`bg-${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="">
          <img src={`${theme === 'dark' ? '../resources/img/logo_dark' : '../resources/img/logo_light'}`} alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center">
          {!isAuthRoute && (
            <button className="">
              <img src={`${theme === 'dark' ? '../resources/icons/search_dark' : '../resources/icons/search_light'}`} alt="Search" />
            </button>
          )}
            {/* Dark mode toggle */}
            <button onClick={toggleTheme}>
              <img src={`${theme === 'dark' ? '../resources/icons/mode_dark' : '../resources/icons/mode_light'}`} alt="Toggle Dark Mode" className="h-6" />
            </button>
        </div>
      </div>

      {/* Only for protected routes */}
      {!isAuthRoute && (
        <div className="flex justify-around items-center">
          <a href="/feed">
            <button className="">
              <img src={`${theme === 'dark' ? '../resources/icons/feed_dark' : '../resources/icons/feed_light'}`} alt="Feed" className="h-6" />
            </button>
          </a>
          <a href="/notifications">
            <button className="">
              <img src={`${theme === 'dark' ? '../resources/icons/notifications_dark' : '../resources/icons/notifications_light'}`} alt="Notifications" className="h-6" />
            </button>
          </a>
          <a href="/create-publication">
            <button className="">
              <img src={`${theme === 'dark' ? '../resources/icons/create_dark' : '../resources/icons/create_light'}`} alt="Create publication" className="h-6" />
            </button>
          </a>
          <a href="/messages">
            <button className="">
            <img src={`${theme === 'dark' ? '../resources/icons/messages_dark' : '../resources/icons/messages_light'}`} alt="Messages" className="h-6" />
            </button>
          </a>
          {isAdminRoute && (
            <a href="/admin">
              <button className="">
                <img src={`${theme === 'dark' ? '../resources/icons/admin_dark' : '../resources/icons/admin_light'}`} alt="Admin" className="h-6" />
              </button>
            </a>
          )}
          <a href="/my-profile">
            <button className="">
              <img src={`${theme === 'dark' ? '../resources/icons/profile_dark' : '../resources/icons/profile_light'}`} alt="My profile" className="h-6" />
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;