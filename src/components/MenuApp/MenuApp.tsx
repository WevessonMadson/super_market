import { useLocation, useNavigate } from "react-router-dom";
import "./MenuApp.css";

import IconHomeMenu from "../../assets/icons/home_icon_menu.svg";
import IconSettingMenu from "../../assets/icons/settings_icon_menu.svg";
import IconShareMenu from "../../assets/icons/share_icon_menu.svg";
import IconAboutMenu from "../../assets/icons/info_icon_menu.svg";
import IconSugestionMenu from "../../assets/icons/sugestion_icon_menu.svg";
import { useSettings } from "../../contexts/SetingsContext";

type MenuProps = {
  onClose: () => void;
};

export default function MenuApp({ onClose }: MenuProps) {
  const { compareSettings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  function goToPage(path: string) {
    onClose();

    if (path === location.pathname) return;

    const autorizado = compareSettings();

    if (autorizado) navigate(path);
  }

  return (
    <>
      <div id="optionsMenu">
        <div className="fade" onClick={onClose} />
        <div id="actionList">
          <ul id="menu-list">
            <li
              id="homeList"
              className="li-menu-item"
              onClick={() => goToPage("/")}
            >
              <img src={IconHomeMenu} />
              <span className="descr-list">Home</span>
            </li>
            <li
              id="settings"
              className="li-menu-item"
              onClick={() => goToPage("/settings")}
            >
              <img src={IconSettingMenu} />
              <span className="descr-list">Configurações</span>
            </li>

            <li
              id="shareMenu"
              className="li-menu-item"
              onClick={() => goToPage("/share")}
            >
              <img src={IconShareMenu} />
              <span className="descr-list">Compartilhar App</span>
            </li>
            <li
              id="aboutMenu"
              className="li-menu-item"
              onClick={() => goToPage("/about")}
            >
              <img src={IconAboutMenu} />
              <span className="descr-list">Sobre</span>
            </li>
            <li
              id="sugestionMenu"
              className="li-menu-item"
              onClick={() => goToPage("/sugestion")}
            >
              <img src={IconSugestionMenu} />
              <span className="descr-list">Melhoria / Problema</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
