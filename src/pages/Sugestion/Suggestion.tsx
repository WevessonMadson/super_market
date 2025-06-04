import { useEffect, useRef, useState } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./Suggestion.css";

export default function Suggestion() {
  const { setTitle } = usePageTitle();
  const [tipo, setTipo] = useState<"sugerir melhoria" | "reportar bug">(
    "sugerir melhoria"
  );
  const [mensagem, setMensagem] = useState("");
  const mensagemRef = useRef<HTMLTextAreaElement>(null);

  const sugerir = () => {
    if (mensagem.trim().length < 50) {
      alert("Mensagem muito curta, descreva mais detalhes, por favor.");
      mensagemRef.current?.focus();
      return;
    }

    const textSend = `Olá, gostaria de *${tipo}* no app *superMarket*. *Mensagem:* ${mensagem}`;

    setTipo("sugerir melhoria");
    setMensagem("");

    window.open(
      `https://api.whatsapp.com/send?phone=5581973161634&text=${textSend}`,
      "_blank"
    );
  };

  useEffect(() => {
    setTitle("Sugerir / Reportar");
  }, [setTitle]);

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
                checked={tipo === "sugerir melhoria"}
                onChange={() => setTipo("sugerir melhoria")}
              />
              Sugerir melhoria
            </label>
            <label htmlFor="reportar">
              <input
                type="radio"
                name="opcao"
                id="reportar"
                checked={tipo === "reportar bug"}
                onChange={() => setTipo("reportar bug")}
              />
              Reportar problema
            </label>
          </div>
          <textarea
            id="input-sugestion"
            placeholder="Detalhe aqui sua sugestão..."
            ref={mensagemRef}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
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
