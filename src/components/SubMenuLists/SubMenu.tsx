import "./SubMenu.css";

import IconAddList from "../../assets/icons/add_icon_submenu.svg";
import IconShareList from "../../assets/icons/share_24px_submenu.svg";
import IconEditList from "../../assets/icons/edit_24_submenu.svg";
import IconDeleteList from "../../assets/icons/delete_icon.svg";
import IconZeraLista from "../../assets/icons/restart_alt_24_submenu.svg";
import IconDuplicateLista from "../../assets/icons/file_copy_submenu.svg";
import IconDividerList from "../../assets/icons/divider_icon_submenu.svg";
import { useLists } from "../../contexts/ListsContext";
import type { ProductType } from "../../pages/Home/Home";
import { useLoading } from "../../contexts/LoadingContext";

type SubMenuProps = {
  onClose: () => void;
  openModalClear: () => void;
};

export default function SubMenu({ onClose, openModalClear }: SubMenuProps) {
  const {
    addList,
    listNameExists,
    listOfLists,
    deleteList,
    editList,
  } = useLists();

  const { setIsLoading } = useLoading();

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

  const exportHandle = async () => {
    setIsLoading(true);

    // pega os dados da lista
    const listProducts = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    // validar se existe lista
    if (!listProducts || !listProducts.length) {
      alert("Não é possível exportar uma lista vazia.");
      return;
    }

    // monta o json e chama o envio para whatsapp
    const objectListExport = {
      listName: listOfLists[0].nome,
      listProducts,
    };

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objectListExport),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || JSON.stringify(data));

      const id = data.id;
      const link = `${window.location.origin}/import?id=${encodeURIComponent(id)}`;
      const text = `Minha lista de compras: ${link}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } catch (err) {
      alert("Erro ao exportar." );
    } finally {
      setIsLoading(false);
    }
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

  const duplicateHandle = () => {
    const newNameList = prompt("Informe um nome para a lista que será criada:");

    if (!newNameList || !newNameList.trim()) return;

    if (listNameExists(newNameList)) {
      alert("Já existe uma lista com esse nome, tente outro.");

      return;
    }

    const listProducts = localStorage.getItem(listOfLists[0].nome) || "[]";

    localStorage.setItem(newNameList, listProducts);

    addList(newNameList);

    if (
      JSON.parse(listProducts).length &&
      confirm(
        "Quer realizar o zeramento de quantidades e/ou preços dessa nova lista?"
      )
    ) {
      openModalClear();
    }
  };

  const dividerHandle = (): void => {
    const listProducts = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    ) as ProductType[];

    if (
      listProducts.length === 0 ||
      listProducts.filter((product) => product.checked === false).length === 0
    ) {
      alert("Não existe produtos não marcados na lista. operação cancelada.");
      return;
    }

    if (
      confirm(
        "Será criada uma nova lista com os produtos que não estão marcados. Deseja continuar?"
      )
    ) {
      const newNameList = prompt(
        "Informe um nome para a lista que será criada:"
      );

      if (!newNameList || !newNameList.trim()) return;

      if (listNameExists(newNameList)) {
        alert("Já existe uma lista com esse nome, tente outro.");

        return;
      }

      localStorage.setItem(
        newNameList,
        JSON.stringify(
          listProducts.filter((produto) => produto.checked === false)
        )
      );

      localStorage.setItem(
        listOfLists[0].nome,
        JSON.stringify(
          listProducts.filter((produto) => produto.checked)
        )
      );

      addList(newNameList);
    }
  };

  return (
    <div className="fade sub-menu" onClick={onClose}>
      <ul id="sub-menu">
        <li id="addList" className="li-sub-menu" onClick={addHandle}>
          <img src={IconAddList} />
          <span className="descr-list">Nova Lista</span>
        </li>

        <li id="exportList" className="li-sub-menu" onClick={exportHandle}>
          <img src={IconShareList} />
          <span className="descr-list">Exportar Lista</span>
        </li>

        {/* <li id="importList" className="li-sub-menu" onClick={importHandle}>
          <img src={IconIosShareList} />
          <span className="descr-list">Importar Lista</span>
        </li> */}

        <li id="editList" className="li-sub-menu" onClick={editHandle}>
          <img src={IconEditList} />
          <span className="descr-list">Editar Nome</span>
        </li>

        <li id="deleteList" className="li-sub-menu" onClick={deleteHandle}>
          <img src={IconDeleteList} />
          <span className="descr-list">Deletar Lista</span>
        </li>

        <li id="resetList" className="li-sub-menu" onClick={openModalClear}>
          <img src={IconZeraLista} />
          <span className="descr-list">Zerar preço/quantidade</span>
        </li>

        <li
          id="duplicateList"
          className="li-sub-menu"
          onClick={duplicateHandle}
        >
          <img src={IconDuplicateLista} />
          <span className="descr-list">Duplicar lista</span>
        </li>

        <li id="dividerList" className="li-sub-menu" onClick={dividerHandle}>
          <img src={IconDividerList} />
          <span className="descr-list">Dividir lista</span>
        </li>
      </ul>
    </div>
  );
}
