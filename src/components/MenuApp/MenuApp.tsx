import { Link } from "react-router-dom";
import "./MenuApp.css";

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
                <span className="material-symbols-outlined">home</span>
                <span className="descr-list">Home</span>
              </li>
            </Link>
            <Link to="/settings" onClick={onClose}>
              <li id="settings" className="li-menu-item">
                <span className="material-symbols-outlined">settings</span>
                <span className="descr-list">Configurações</span>
              </li>
            </Link>
            <Link to="/share" onClick={onClose}>
              <li id="shareMenu" className="li-menu-item">
                <span className="material-symbols-outlined">share</span>
                <span className="descr-list">Compartilhar App</span>
              </li>
            </Link>
            <Link to="/about" onClick={onClose}>
              <li id="aboutMenu" className="li-menu-item">
                <span className="material-symbols-outlined">info</span>
                <span className="descr-list">Sobre</span>
              </li>
            </Link>
            <Link to="/sugestion" onClick={onClose}>
              <li id="sugestionMenu" className="li-menu-item">
                <span className="material-symbols-outlined">
                  prompt_suggestion
                </span>
                <span className="descr-list">Melhoria / Problema</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
