import { useState } from "react";

export default function SelectListName() {
  const [listName, setListName] = useState("superMarket");

  const updateListName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e) updateListName(e.target.value);
  };
  return (
    <select id="listName" onChange={() => updateListName(e.target.value)}>
      <option>{listName}</option>
    </select>
  );
}
