import { Outlet } from "react-router-dom";
import { useMenu } from "../../contexts/MenuContext";
import Header from "../Header/Header";
import MenuApp from "../MenuApp/MenuApp";
import { useLoading } from "../../contexts/LoadingContext";
import Loading from "../Loading/Loading";

const Layout = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      {isMenuOpen && <MenuApp onClose={closeMenu} />}
      <>
        <Outlet />
      </>
    </>
  );
};

export default Layout;
