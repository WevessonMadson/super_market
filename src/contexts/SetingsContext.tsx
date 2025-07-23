import { createContext, useContext, useEffect, useState } from "react";

export type SettingsType = {
  sumOnlyChecked: boolean;
};

type SettingsContextType = {
  configState: SettingsType;
  originalConfig: SettingsType;
  saveConfig: () => void;
  setConfigState: (config: SettingsType) => void;
  compareSettings: () => boolean;
};

const initialConfig = {
  sumOnlyChecked: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [configState, setConfigState] = useState<SettingsType>(initialConfig);
  const [originalConfig, setOriginalConfig] =
    useState<SettingsType>(initialConfig);

  function getConfigOnLocalStorage(): SettingsType {
    const configLocalStorage: string =
      localStorage.getItem("configSuperMarket") || "";
    if (configLocalStorage) return JSON.parse(configLocalStorage);

    return initialConfig;
  }

  function saveConfig() {
    localStorage.setItem("configSuperMarket", JSON.stringify(configState));
    setOriginalConfig(configState);
  }

  function settingsIquals() {
    return configState.sumOnlyChecked === originalConfig.sumOnlyChecked;
  }

  function compareSettings() {
    if (settingsIquals()) {
      return true;
    } else {
      if (!confirm("As alterações não foram salvas. Deseja realmente sair?"))
        return false;
      else {
        closeWithoutSave();
        return true;
      }
    }
  }

  function closeWithoutSave() {
    setConfigState(originalConfig);
  }

  useEffect(() => {
    const config = getConfigOnLocalStorage();

    if (config.sumOnlyChecked !== originalConfig.sumOnlyChecked) {
      setConfigState(config);
      setOriginalConfig(config);
      return;
    } else {
      saveConfig();
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        configState,
        originalConfig,
        setConfigState,
        saveConfig,
        compareSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings deve ser usado dentro de Settings");

  return ctx;
}
