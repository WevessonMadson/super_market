import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./Suggestion.css";

export default function Suggestion() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Sugerir / Reportar");
  }, [setTitle]);

  const sugerir = () => {
    console.log("teste");
  };

  return (
    <>
      <div id="sugestion">
        <p className="info-texts">
          Se você encontrou um erro no app...
          <br />
          Ou tem sugestões de melhorias...
          <br />
          <br />
          Está no lugar certo.
        </p>
        <div id="form-sugestion">
          <p>O que você quer fazer?</p>
          <div id="escolha">
            <label htmlFor="melhoria">
              <input
                type="radio"
                name="opcao"
                id="melhoria"
                value="sugerir melhoria"
                checked
              />
              Sugerir melhoria
            </label>
            <label htmlFor="reportar">
              <input
                type="radio"
                name="opcao"
                id="reportar"
                value="reportar bug"
              />
              Reportar problema
            </label>
          </div>
          <textarea
            id="input-sugestion"
            placeholder="Detalhe aqui sua sugestão..."
          ></textarea>
          <button
            id="send-sugestion"
            className="btnAction btnActionSave"
            onClick={sugerir}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
