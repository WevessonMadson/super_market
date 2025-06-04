import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./Share.css";

import IconShareBlack from "../../assets/icons/share_icon_black.svg";
import IconCopyContent from "../../assets/icons/content_copy_icon.svg";

export default function Share() {
  const { setTitle } = usePageTitle();

  const shareContent = {
    title: "SuperMaket",
    message:
      "Ei, baixa o melhor app de listas de compras do mundo!\nÉ muito útil. E grátis.",
    url: "https://wevessonmadson.github.io/superMarket",
  };

  useEffect(() => {
    setTitle("Compartilhe");
  }, [setTitle]);

  function shareApp() {
    const { title, message, url } = shareContent;
    if (!navigator.share) {
      return;
    }

    navigator
      .share({ title, text: message, url })
      .then(() => {
        console.log("The content was shared successfully");
      })
      .catch((error) => {
        console.error("Error sharing the content", error);
      });
  }

  async function copyShareMessage() {
    const { message, url } = shareContent;
    let textContent = `${message}\n${url}`;

    if (!navigator.clipboard) {
      alert("Erro ao tentar usar area de transferência.");
      return;
    }

    await navigator.clipboard.writeText(textContent);

    alert("Copiado com sucesso!");
  }

  return (
    <>
      <div id="share">
        <img src="./assets/qr-code.svg" alt="QR-Code que vai para o app." />
        <div className="icon-share" id="share-button" onClick={shareApp}>
          <img src={IconShareBlack} />
          <p>Share</p>
        </div>
        <div className="icon-share" id="copy-button" onClick={copyShareMessage}>
          <img src={IconCopyContent} />
          <p>Copy</p>
        </div>
      </div>
    </>
  );
}
