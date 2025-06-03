import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import "./Share.css";

import IconShareBlack from "../../assets/icons/share_icon_black.svg";
import IconCopyContent from "../../assets/icons/content_copy_icon.svg";

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
          <img src={IconShareBlack} />
          <p>Share</p>
        </div>
        <div className="icon-share" id="copy-button">
          <img src={IconCopyContent} />
          <p>Copy</p>
        </div>
      </div>
    </>
  );
}
