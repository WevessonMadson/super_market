import { Outlet } from "react-router-dom";
import { useMenu } from "../../contexts/MenuContext";
import Header from "../Header/Header";
import MenuApp from "../MenuApp/MenuApp";

const Layout = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {isMenuOpen && <MenuApp onClose={closeMenu} />}
      <>
        <Outlet />
      </>
    </>
  );
};

export default Layout;
