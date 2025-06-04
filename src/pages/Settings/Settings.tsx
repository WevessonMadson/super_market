import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useSettings } from "../../contexts/SetingsContext";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { setTitle } = usePageTitle();
  const { configState, setConfigState, saveConfig, compareSettings } =
    useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Configurações");
  }, [setTitle]);

  const sair = () => {
    const autorizado = compareSettings();

    if (autorizado) navigate("/");
  };

  const salvar = () => {
    saveConfig();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <>
      <div id="globalSettings">
        <div id="settingsContent">
          <div>
            <label htmlFor="sumOnlyChecked">
              Somar apenas produtos marcados?
            </label>{" "}
            <input
              type="checkbox"
              name="sumOnlyChecked"
              id="sumOnlyChecked"
              checked={configState.sumOnlyChecked}
              onChange={() =>
                setConfigState({
                  ...configState,
                  sumOnlyChecked: !configState.sumOnlyChecked,
                })
              }
            />
          </div>
        </div>
        <div id="actionsSettings">
          <button
            id="saveSettings"
            className="btnAction btnActionSave"
            onClick={salvar}
          >
            Salvar
          </button>
          <button id="exitSettings" className="btnAction" onClick={sair}>
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
