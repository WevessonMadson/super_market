import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { useEffect } from "react";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useSettings } from "../../contexts/SetingsContext";

export default function Settings() {
  const { setTitle } = usePageTitle();
  const {
    configState,
    setConfigState,
    saveConfig,
    compareSettings,
    getConfigOnLocalStorage,
  } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Configurações");
  }, [setTitle]);

  const sair = () => {
    if (compareSettings()) {
      if (confirm("As alterações não foram salvas. Deseja realmente sair?")) {
        setConfigState(getConfigOnLocalStorage());
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const salvar = () => {
    saveConfig(configState);
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
