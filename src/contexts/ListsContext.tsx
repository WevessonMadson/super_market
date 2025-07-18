import { createContext, useContext, useEffect, useState } from "react";

export type ListType = {
  id: number;
  nome: string;
  selected: boolean;
};

type ListsContextType = {
  listOfLists: ListType[];
  selectList: (index: number) => void;
  listNameExists: (nome: string) => boolean;
  addList: (nome: string) => void;
  deleteList: () => void;
};

const initialList = [
  {
    id: 1,
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
    const newListOfList = listOfLists
      .map((list) => ({
        ...list,
        selected: false,
      }))
      .sort((a, b) => a.id - b.id);

    newListOfList.unshift({
      id: newListOfList[newListOfList.length - 1].id,
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
        selectList,
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
