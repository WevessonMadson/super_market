import type React from "react";
import { useLists } from "../../contexts/ListsContext";

export default function SelectListName() {
  const { listOfLists, selectList } = useLists();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.value;

    console.log(index);

    selectList(Number(index));
  };

  return (
    
  );
}
