import { createContext, useContext, useEffect, useState } from "react";

export type SettingsType = {
  sumOnlyChecked: boolean;
};

type SettingsContextType = {
  configState: SettingsType;
  saveConfig: (config: SettingsType) => void;
  getConfigOnLocalStorage: () => SettingsType;
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

  function setConfigOnLocalStorage(config: SettingsType) {
    localStorage.setItem("configSuperMarket", JSON.stringify(config));
  }

  function getConfigOnLocalStorage(): SettingsType {
    const configLocalStorage: string =
      localStorage.getItem("configSuperMarket") || "";
    if (configLocalStorage) return JSON.parse(configLocalStorage);

    return initialConfig;
  }

  function saveConfig() {
    setConfigOnLocalStorage(configState);
  }

  function compareSettings() {
    const configOnLocalStorage = getConfigOnLocalStorage();
    return configState.sumOnlyChecked !== configOnLocalStorage.sumOnlyChecked;
  }

  useEffect(() => {
    const config = getConfigOnLocalStorage();
    if (config.sumOnlyChecked !== configState.sumOnlyChecked) {
      setConfigState(config);
      return;
    }

    setConfigOnLocalStorage(config);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        configState,
        setConfigState,
        saveConfig,
        getConfigOnLocalStorage,
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
