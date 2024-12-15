import NavBar from "./NavBar";
import Footer from "./Footer";
import propTypes from "prop-types";


export const Layout = ({children}) => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout;