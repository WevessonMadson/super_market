import "./Header.css";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useMenu } from "../../contexts/MenuContext";

import IconMenu from "../../assets/icons/menu_icon.svg";
import IconCloseMenu from "../../assets/icons/close_icon.svg";
import IconSubMenu from "../../assets/icons/submenu_icon.svg";
import IconBackPage from "../../assets/icons/arrow_back_icon.svg";
import { useSettings } from "../../contexts/SetingsContext";
import { useLists } from "../../contexts/ListsContext";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export default function Header({ isMenuOpen, toggleMenu, closeMenu }: Props) {
  const { title } = usePageTitle();
  const { compareSettings } = useSettings();
  const { toggleSubMenu } = useMenu();
  const { listOfLists, selectList } = useLists();

  const voltar = () => {
    closeMenu();

    const autorizado = compareSettings();

    if (autorizado) window.history.back();
  };

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const index = event.target.value;
    selectList(Number(index));
  }

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
              Lista:
              <select
                id="listName"
                value={listOfLists[0].nome}
                onChange={handleSelectChange}
              >
                {listOfLists.map((list, index) => (
                  <option key={index} value={index}>
                    {list.nome}
                  </option>
                ))}
              </select>
            </div>
            <div onClick={toggleSubMenu}>
              <img src={IconSubMenu} />
            </div>
          </>
        ) : (
          <>
            <div id="currentScreen">{title}</div>
            <div onClick={voltar}>
              <img src={IconBackPage} />
            </div>
          </>
        )}
      </header>
    </>
  );
}
