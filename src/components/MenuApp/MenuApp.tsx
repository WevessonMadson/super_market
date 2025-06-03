import { Link } from "react-router-dom";
import "./MenuApp.css";

import IconHomeMenu from "../../assets/icons/home_icon_menu.svg";
import IconSettingMenu from "../../assets/icons/settings_icon_menu.svg";
import IconShareMenu from "../../assets/icons/share_icon_menu.svg";
import IconAboutMenu from "../../assets/icons/info_icon_menu.svg";
import IconSugestionMenu from "../../assets/icons/sugestion_icon_menu.svg";

type MenuProps = {
  onClose: () => void;
};

export default function MenuApp({ onClose }: MenuProps) {
  return (
    <>
      <div id="optionsMenu">
        <div className="fade" onClick={onClose} />
        <div id="actionList">
          <ul id="menu-list">
            <Link to="/" onClick={onClose}>
              <li id="homeList" className="li-menu-item">
                <img src={IconHomeMenu} />
                <span className="descr-list">Home</span>
              </li>
            </Link>
            <Link to="/settings" onClick={onClose}>
              <li id="settings" className="li-menu-item">
                <img src={IconSettingMenu} />
                <span className="descr-list">Configurações</span>
              </li>
            </Link>
            <Link to="/share" onClick={onClose}>
              <li id="shareMenu" className="li-menu-item">
                <img src={IconShareMenu} />
                <span className="descr-list">Compartilhar App</span>
              </li>
            </Link>
            <Link to="/about" onClick={onClose}>
              <li id="aboutMenu" className="li-menu-item">
                <img src={IconAboutMenu} />
                <span className="descr-list">Sobre</span>
              </li>
            </Link>
            <Link to="/sugestion" onClick={onClose}>
              <li id="sugestionMenu" className="li-menu-item">
                <img src={IconSugestionMenu} />
                <span className="descr-list">Melhoria / Problema</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
