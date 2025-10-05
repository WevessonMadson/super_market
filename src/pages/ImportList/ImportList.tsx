import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLists } from "../../contexts/ListsContext";
import { usePageTitle } from "../../contexts/PageTitleContext";

import "./ImportList.css";

function ImportList() {
  const { setTitle } = usePageTitle();
  const {
      addList,
      listNameExists,
      listOfLists,
      selectList,
    } = useLists();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const importHandle = (listImport: string) => {
    // pede o json
    // const listImport = prompt("Cole aqui a lista...");

    // verifica se tem texto no campo
    if (!listImport || !listImport.trim()) return;

    // faz a inserção da lista e dos produtos
    try {
      const objListImport = JSON.parse(listImport);

      const { listName, listProducts } = objListImport;

      if (!listNameExists(listName)) {
        localStorage.setItem(listName, JSON.stringify(listProducts));
        addList(listName);
      } else {
        if (
          !confirm(
            "Já existe uma lista com o mesmo nome.\n\nContinuar irá substituir a lista atual.\n\nDeseja continuar?"
          )
        )
          return;

        localStorage.setItem(listName, JSON.stringify(listProducts));
        const indexListExists = listOfLists.findIndex(
          (list) => list.nome.trim() == listName.trim()
        );
        selectList(indexListExists);
      }
    } catch (error) {
      alert(
        "Houve um erro na importação, tente copiar e colar aqui novamente."
      );
    }
  };

  async function carregarLista(id: string) {
    const res = await fetch(`/api/fetch?id=${id}`);
    if (!res.ok) throw new Error('Erro ao carregar a lista');
    const data = await res.json();
    return data.record;
  }

  useEffect(() => {
    setTitle("Importando lista...");
  }, [setTitle]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id)  {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const lista = await carregarLista(id);
        importHandle(JSON.stringify(lista));
        alert("Lista importada com sucesso!");
      } catch (err) {
        console.error(err);
        alert("Erro ao importar lista 😞");
      } finally {
        navigate("/");
      }
    })();
  }, []);

  return <p id="load">Carregando...</p>;
}

export default ImportList;

