import "./ModalClearProducts.css";
import { useLists } from "../../contexts/ListsContext";
import { useState } from "react";
import type { ProductType } from "../../pages/Home/Home";

type ModalClearProps = {
  onClose: () => void;
};

const ModalClearProducts = ({ onClose }: ModalClearProps) => {
  const { listOfLists, selectList } = useLists();
  const [clearQuantity, setClearQuantity] = useState(false);
  const [clearPrice, setClearPrice] = useState(false);

  const clearFieldsProducts = () => {
    const productsList: ProductType[] = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    if (!productsList || !productsList.length) {
      setClearQuantity(false);
      setClearPrice(false);
      onClose();
      return;
    }

    if (!clearQuantity && !clearPrice) {
      alert("Para prosseguir, por favor marque quais campos deseja zerar.");
      return;
    }

    let question = "Tem certeza que deseja zerar ";
    if (clearPrice && clearQuantity) {
      question += "as quantidades e os preços?";
    } else if (clearPrice) {
      question += "os preços?";
    } else {
      question += "as quantidades?";
    }

    if (confirm(question)) {
      const newProductList = productsList.map((product) => {
        if (clearQuantity) product.quantidade = 0;
        if (clearPrice) product.preco = 0;

        return product;
      });

      localStorage.setItem(listOfLists[0].nome, JSON.stringify(newProductList));

      setClearPrice(false);
      setClearQuantity(false);

      selectList(0);

      onClose();
    }
  };

  const cancelClear = () => {
    setClearPrice(false);
    setClearQuantity(false);
    onClose();
  };

  return (
    <div className="fade-zeramento">
      <div className="modal-zeramento">
        <p className="modal-zeramento__info">
          Selecione quais os campos deseja zerar da lista{" "}
          <strong>{listOfLists[0].nome}</strong>:
        </p>

        <label htmlFor="zera-quantidades">
          <input
            id="zera-quantidades"
            type="checkbox"
            checked={clearQuantity}
            onChange={() => setClearQuantity((prev) => !prev)}
          />{" "}
          Zerar quantidades
        </label>

        <label htmlFor="zera-precos">
          <input
            id="zera-precos"
            type="checkbox"
            checked={clearPrice}
            onChange={() => setClearPrice((prev) => !prev)}
          />{" "}
          Zerar preços
        </label>

        <div className="modal-zeramento__botoes">
          <button
            className="modal-zeramento__botao modal-zeramento__botao__active"
            onClick={clearFieldsProducts}
          >
            Confirmar
          </button>
          <button className="modal-zeramento__botao" onClick={cancelClear}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalClearProducts;
