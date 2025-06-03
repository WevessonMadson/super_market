import { createContext, useContext, useState } from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  isSubMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleSubMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const toggleSubMenu = (): void => {
    setIsSubMenuOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        closeMenu,
        isSubMenuOpen,
        toggleSubMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
