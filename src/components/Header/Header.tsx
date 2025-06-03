import "./Header.css";
import SelectListName from "../SelectList/SelectList";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useMenu } from "../../contexts/MenuContext";

import IconMenu from "../../assets/icons/menu_icon.svg";
import IconCloseMenu from "../../assets/icons/close_icon.svg";
import IconSubMenu from "../../assets/icons/submenu_icon.svg";
import IconBackPage from "../../assets/icons/arrow_back_icon.svg";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export default function Header({ isMenuOpen, toggleMenu }: Props) {
  const { title } = usePageTitle();

  const { toggleSubMenu } = useMenu();

  const voltar = () => window.history.back();

  return (
    <>
      <header id="header">
        <div>
          <span id="menuIcon" onClick={toggleMenu}>
            {<img src={isMenuOpen ? IconCloseMenu : IconMenu} />}
          </span>
        </div>
        {title === "Home" ? (
          <>
            <div id="listSelected">
              Lista: <SelectListName />
            </div>
            <div onClick={toggleSubMenu}>
              <span id="action-option-list">
                <img src={IconSubMenu} />
              </span>
            </div>
          </>
        ) : (
          <>
            <div id="currentScreen">{title}</div>
            <div onClick={voltar}>
              <span id="action-option-list">
                {title !== "Configurações" && <img src={IconBackPage} />}
              </span>
            </div>
          </>
        )}
      </header>
    </>
  );
}
