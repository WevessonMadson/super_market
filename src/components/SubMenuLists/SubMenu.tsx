import "./SubMenu.css";

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
          <span className="material-symbols-outlined">add</span>
          <span className="descr-list">Nova Lista</span>
        </li>

        <li id="exportList" className="li-sub-menu" onClick={exportList}>
          <span className="material-symbols-outlined">share</span>
          <span className="descr-list">Exportar Lista</span>
        </li>

        <li id="importList" className="li-sub-menu" onClick={importList}>
          <span className="material-symbols-outlined">ios_share</span>
          <span className="descr-list">Importar Lista</span>
        </li>

        <li id="editList" className="li-sub-menu" onClick={editList}>
          <span className="material-symbols-outlined">edit</span>
          <span className="descr-list">Editar Nome</span>
        </li>

        <li id="deleteList" className="li-sub-menu" onClick={deleteList}>
          <span className="material-symbols-outlined">delete</span>
          <span className="descr-list">Deletar Lista</span>
        </li>

        <li id="resetList" className="li-sub-menu" onClick={resetList}>
          <span className="material-symbols-outlined">restart_alt</span>
          <span className="descr-list">Zerar preço/quantidade</span>
        </li>

        <li id="duplicateList" className="li-sub-menu" onClick={duplicateList}>
          <span className="material-symbols-outlined">file_copy</span>
          <span className="descr-list">Duplicar lista</span>
        </li>
      </ul>
    </div>
  );
}
