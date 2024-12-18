import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import propTypes from "prop-types";

/**
 * @description Layout component
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 */
export const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main>
        {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout;