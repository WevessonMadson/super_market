import { createContext, useContext, useEffect, useState } from "react";
import type { ProductType } from "../pages/Home/Home";

export type ListType = {
  nome: string;
  selected: boolean;
};

type ListsContextType = {
  listOfLists: ListType[];
  selectList: (index: number) => void;
  listNameExists: (nome: string) => boolean;
  addList: (nome: string) => void;
  deleteList: () => void;
  editList: (nome: string) => void;
  importList: (listImport: listImportType) => void;
};

type listImportType = {
  listName: string;
  listProducts: ProductType[];
};

const initialList = [
  {
    nome: "superMarket",
    selected: true,
  },
];

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listOfLists, setListOfLists] = useState<ListType[]>(initialList);

  function getListOnLocalStorage(): ListType[] {
    const listOnLocalStorage: string = localStorage.getItem("listOfList") || "";
    if (listOnLocalStorage) return JSON.parse(listOnLocalStorage);

    return initialList;
  }

  function saveListOnLocalStorage(listOfLists: ListType[]) {
    localStorage.setItem("listOfList", JSON.stringify(listOfLists));
  }

  const listNameExists = (nome: string): boolean => {
    return (
      listOfLists.filter(
        (list) =>
          list.nome.trim().toLowerCase() === nome.trim().toLocaleLowerCase()
      ).length > 0
    );
  };

  const addList = (nome: string) => {
    const newListOfList = listOfLists.map((list) => ({
      ...list,
      selected: false,
    }));

    newListOfList.unshift({
      nome,
      selected: true,
    });

    setListOfLists(newListOfList);
    saveListOnLocalStorage(newListOfList);
  };

  const deleteList = () => {
    localStorage.removeItem(listOfLists[0].nome);

    const newListOfList = listOfLists.filter((list, index) => {
      if (index !== 0) {
        if (index === 1) {
          list.selected = true;
        }

        return list;
      }
    });

    if (newListOfList.length !== 0) {
      setListOfLists(newListOfList);
      saveListOnLocalStorage(newListOfList);
    } else {
      setListOfLists(initialList);
      saveListOnLocalStorage(initialList);
    }
  };

  const editList = (nome: string) => {
    const dataList = localStorage.getItem(listOfLists[0].nome) || "[]";
    if (JSON.parse(dataList).length !== 0) {
      localStorage.removeItem(listOfLists[0].nome);

      localStorage.setItem(nome.trim(), dataList);
    }

    const newListOfList = listOfLists.map((list, index) => {
      if (index === 0) {
        list.nome = nome.trim();
      }

      return list;
    });

    setListOfLists(newListOfList);
    saveListOnLocalStorage(newListOfList);
  };

  const importList = (listImport: listImportType) => {
    const { listName, listProducts } = listImport;
    console.log("chegou");
    if (listNameExists(listName)) {
      if (
        !confirm(
          "Já existe uma lista com o mesmo nome.\n\nContinuar irá substituir a lista atual.\n\nDeseja continuar?"
        )
      ) {
        return;
      }

      const newListOfList = listOfLists
        .filter((list) => list.nome.trim() !== listName.trim())
        .map((list) => ({
          ...list,
          selected: false,
        }));

      newListOfList.unshift({
        nome: listName,
        selected: true,
      });

      localStorage.setItem(listName, JSON.stringify(listProducts));

      setListOfLists(newListOfList);
      saveListOnLocalStorage(newListOfList);
    } else {
      localStorage.setItem(listName, JSON.stringify(listProducts));
      addList(listName);
    }
  };

  const selectList = (index: number): void => {
    const newListOfList = listOfLists.map((list) => {
      return { ...list, selected: false };
    });

    const selectedList = newListOfList.splice(index, 1)[0];
    newListOfList.unshift({ ...selectedList, selected: true });

    setListOfLists(newListOfList);
    saveListOnLocalStorage(newListOfList);
  };

  useEffect(() => {
    const list = getListOnLocalStorage();
    if (list.length) {
      setListOfLists(list);
      saveListOnLocalStorage(list);
    }
  }, []);

  return (
    <ListsContext.Provider
      value={{
        listOfLists,
        listNameExists,
        addList,
        deleteList,
        editList,
        selectList,
        importList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export function useLists() {
  const ctx = useContext(ListsContext);
  if (!ctx) throw new Error("useLists deve ser usado dentro de Lists");

  return ctx;
}
