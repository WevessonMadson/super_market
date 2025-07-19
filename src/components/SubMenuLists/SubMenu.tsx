import "./SubMenu.css";

import IconAddList from "../../assets/icons/add_icon_submenu.svg";
import IconShareList from "../../assets/icons/share_24px_submenu.svg";
import IconIosShareList from "../../assets/icons/ios_share_24_submenu.svg";
import IconEditList from "../../assets/icons/edit_24_submenu.svg";
import IconDeleteList from "../../assets/icons/delete_icon.svg";
import IconZeraLista from "../../assets/icons/restart_alt_24_submenu.svg";
import IconDuplicateLista from "../../assets/icons/file_copy_submenu.svg";
import { useLists } from "../../contexts/ListsContext";

type SubMenuProps = {
  onClose: () => void;
};

export default function SubMenu({ onClose }: SubMenuProps) {
  const { addList, listNameExists, listOfLists, deleteList, editList } =
    useLists();

  const addHandle = async () => {
    // pegar o nome da lista no prompt e retorna se não for passado
    let nameList = prompt("Como você quer chamar a nova lista?");
    if (!nameList || !nameList.trim()) return;

    // ver se não tem nenhuma com o nome
    const nomeJaExiste = listNameExists(nameList);

    // se tiver avisa e retorna
    if (nomeJaExiste) {
      alert("Já existe uma lista com esse nome, selecione ela.");
      return;
    }

    // adiciona a nova lista como selected true
    addList(nameList);
  };

  const exportList = () => {
    // pega os dados da lista
    // monta o json e chama o envio para whatsapp
  };
  const importList = () => {
    // pede o json
    // faz a inserção da lista e dos produtos
  };
  const editHandle = () => {
    // Abre a caixa com o nome atual da lista
    const newNameForList = prompt(
      `Digite o novo nome para a lista "${listOfLists[0].nome}":`
    );
    if (!newNameForList || !newNameForList.trim()) return;

    // ver se não tem nenhuma com o nome
    const nomeJaExiste = listNameExists(newNameForList);

    // se tiver avisa e retorna
    if (nomeJaExiste) {
      alert("Já existe uma lista com esse nome, selecione ela.");
      return;
    }

    // Salvar novo nome
    editList(newNameForList);
  };
  const deleteHandle = () => {
    // pergunta se deseja realmente deletar e o nome da
    if (!confirm(`Confirma a exclusão da lista "${listOfLists[0].nome}"?`))
      return;

    // removemos a lista e salvamos
    deleteList();
  };
  const resetList = () => {
    // zerar preço e/ou quantidade
    // obs.: aqui vou precisar abrir um modal
  };
  const duplicateList = () => {
    // criar uma nova lista com o nome fornecido
    // salvar uma lista de produtos no local storage com o nome da lista
  };

  return (
    <div className="fade sub-menu" onClick={onClose}>
      <ul id="sub-menu">
        <li id="addList" className="li-sub-menu" onClick={addHandle}>
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

        <li id="editList" className="li-sub-menu" onClick={editHandle}>
          <img src={IconEditList} />
          <span className="descr-list">Editar Nome</span>
        </li>

        <li id="deleteList" className="li-sub-menu" onClick={deleteHandle}>
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
