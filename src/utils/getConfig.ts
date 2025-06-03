export type ConfigType = {
  sumOnlyChecked: boolean;
};

export function getConfig() {
  const config = getConfigLocalStorage();
  if (!config) {
    const initialConfig = {
      sumOnlyChecked: false,
    };

    localStorage.setItem("configSuperMarket", JSON.stringify(initialConfig));

    return initialConfig;
  } else {
    return config;
  }
}

function getConfigLocalStorage() {
  return JSON.parse(localStorage.getItem("configSuperMarket") || "{}");
}
