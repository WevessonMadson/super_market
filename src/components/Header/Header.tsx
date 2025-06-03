import "./Header.css";
import SelectListName from "../SelectList/SelectList";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useMenu } from "../../contexts/MenuContext";

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
          <span
            id="menuIcon"
            className="material-symbols-outlined"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "close" : "menu"}
          </span>
        </div>
        {title === "Home" ? (
          <>
            <div id="listSelected">
              Lista: <SelectListName />
            </div>
            <div onClick={toggleSubMenu}>
              <span
                className="material-symbols-outlined"
                id="action-option-list"
              >
                more_vert
              </span>
            </div>
          </>
        ) : (
          <>
            <div id="currentScreen">{title}</div>
            <div onClick={voltar}>
              <span
                className="material-symbols-outlined"
                id="action-option-list"
              >
                {title !== "Configurações" && "arrow_back"}
              </span>
            </div>
          </>
        )}
      </header>
    </>
  );
}
