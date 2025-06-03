import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";

export default function Lists() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  return (
    <>
      <div id="adm-listas">
        <div id="listasContent">
          <p className="info-texts">Olá, estamos em constantes melhorias.</p>
          <p className="info-texts">
            Em breve você poderá administrar suas listas de forma prática.
          </p>
          <p className="info-texts">
            Será possível fazer exclusão de várias listas de uma única vez.
          </p>
          <p className="info-texts">Aguarde! ;D</p>
        </div>
      </div>
    </>
  );
}
