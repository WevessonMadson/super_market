import "./SubMenu.css";

import IconAddList from "../../assets/icons/add_icon_submenu.svg";
import IconShareList from "../../assets/icons/share_24px_submenu.svg";
import IconIosShareList from "../../assets/icons/ios_share_24_submenu.svg";
import IconEditList from "../../assets/icons/edit_24_submenu.svg";
import IconDeleteList from "../../assets/icons/delete_icon.svg";
import IconZeraLista from "../../assets/icons/restart_alt_24_submenu.svg";
import IconDuplicateLista from "../../assets/icons/file_copy_submenu.svg";

type SubMenuProps = {
  onClose: () => void;
};

export default function SubMenu({ onClose }: SubMenuProps) {
  const addList = () => null;
  const exportList = () => null;
  const importList = () => null;
  const editList = () => null;
  const deleteList = () => null;
  const resetList = () => null;
  const duplicateList = () => null;

  return (
    <div className="fade sub-menu" onClick={onClose}>
      <ul id="sub-menu">
        <li id="addList" className="li-sub-menu" onClick={addList}>
          <img src={IconAddList} />
          <span className="descr-list">Nova Lista</span>
        </li>

        <li id="exportList" className="li-sub-menu" onClick={exportList}>
          <img src={IconShareList} />
          <span className="descr-list">Exportar Lista</span>
        </li>

        <li id="importList" className="li-sub-menu" onClick={importList}>
          <img src={IconIosShareList} />
          <span className="descr-list">Importar Lista</span>
        </li>

        <li id="editList" className="li-sub-menu" onClick={editList}>
          <img src={IconEditList} />
          <span className="descr-list">Editar Nome</span>
        </li>

        <li id="deleteList" className="li-sub-menu" onClick={deleteList}>
          <img src={IconDeleteList} />
          <span className="descr-list">Deletar Lista</span>
        </li>

        <li id="resetList" className="li-sub-menu" onClick={resetList}>
          <img src={IconZeraLista} />
          <span className="descr-list">Zerar preço/quantidade</span>
        </li>

        <li id="duplicateList" className="li-sub-menu" onClick={duplicateList}>
          <img src={IconDuplicateLista} />
          <span className="descr-list">Duplicar lista</span>
        </li>
      </ul>
    </div>
  );
}
