import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./About.css";

export default function About() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Sobre");
  }, [setTitle]);

  return (
    <>
      <div id="about">
        <div id="aboutContent">
          <p className="info-texts">Olá, eu sou o superMarket!</p>
          <p className="info-texts">
            Fui desenvolvido por Wevesson Madson, para ser um aplicativo de
            criação de listas de compras fácil e prático.
          </p>
          <p className="info-texts">
            Ao usar minhas ferramentas, será possível fazer a criação e
            administração de listas de compras, que você poderá
            exportar/importar também.
          </p>
          <p className="info-texts">
            Depois da criação da lista e adição dos produtos, a minha função
            mais importante é registrar os produtos que você vai colocando no
            carrinho, e com base nas quantidades e valor unitário, vou mostrando
            em tempo real o valor das suas compras.
          </p>
          <p className="info-texts">
            Então me use e não seja surpreendido na hora de passar suas compras
            no caixa.
          </p>
        </div>
        <div id="redes">
          <a
            href="https://www.linkedin.com/in/wevesson-madson-9a5a4615a/"
            target="_blank"
          >
            <img src="./assets/linkedin-icon.png" />
          </a>
          <a href="https://github.com/WevessonMadson" target="_blank">
            <img src="./assets/github-icon.png" />
          </a>
        </div>
        <p id="copy">&copy;WevessonMadson</p>
      </div>
    </>
  );
}
