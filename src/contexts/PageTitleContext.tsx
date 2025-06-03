import { createContext, useContext, useState } from "react";

type PageTitleContextType = {
  title: string;
  setTitle: (newTitle: string) => void;
};

const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState("Home");

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export function usePageTitle() {
  const ctx = useContext(PageTitleContext);
  if (!ctx)
    throw new Error("usePageTitle deve ser usado dentro de PageTitleProvider");

  return ctx;
}
