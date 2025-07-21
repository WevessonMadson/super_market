import "./ModalClearProducts.css";
import { useLists } from "../../contexts/ListsContext";

const ModalClearProducts = () => {
  const { listOfLists } = useLists();

  return (
    <div className="fade-zeramento">
      <div className="modal-zeramento">
        <p className="modal-zeramento__info">
          Selecione quais os campos deseja zerar da lista{" "}
          <strong>{listOfLists[0].nome}</strong>:
        </p>

        <label htmlFor="zera-quantidades">
          <input
            type="checkbox"
            name="zera-quantidades"
            id="zera-quantidades"
          />
          Zerar quantidades
        </label>

        <label htmlFor="zera-precos">
          <input type="checkbox" name="zera-precos" id="zera-precos" />
          Zerar preços
        </label>

        <div className="modal-zeramento__botoes">
          <button className="modal-zeramento__botao modal-zeramento__botao__active">
            Confirmar
          </button>
          <button className="modal-zeramento__botao">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalClearProducts;
