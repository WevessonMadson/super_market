import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./Share.css";

export default function Share() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Compartilhe");
  }, [setTitle]);
  return (
    <>
      <div id="share">
        <img src="./assets/qr-code.svg" alt="QR-Code que vai para o app." />
        <div className="icon-share" id="share-button">
          <span className="material-symbols-outlined">share</span>
          <p>Share</p>
        </div>
        <div className="icon-share" id="copy-button">
          <span className="material-symbols-outlined">content_copy</span>
          <p>Copy</p>
        </div>
      </div>
    </>
  );
}
