import React, { createContext, useState, useContext, ReactNode } from "react";

interface SellFormData {
  category: string;
  subcategory: string;
  itemName: string;
  description: string;
  age: string;
  price: number;
  deposit: number;
  returnPolicy: string;
  images: string[];
}

interface UIContextType {
  isSellModalOpen: boolean;
  openSellModal: () => void;
  closeSellModal: () => void;
  sellFormData: SellFormData;
  updateSellFormData: (data: Partial<SellFormData>) => void;
  resetSellFormData: () => void;
}

const initialSellFormData: SellFormData = {
  category: "",
  subcategory: "",
  itemName: "",
  description: "",
  age: "",
  price: 0,
  deposit: 0,
  returnPolicy: "",
  images: [],
};

const UIContext = createContext<UIContextType | null>(null);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellFormData, setSellFormData] =
    useState<SellFormData>(initialSellFormData);

  const openSellModal = () => setIsSellModalOpen(true);
  const closeSellModal = () => setIsSellModalOpen(false);

  const updateSellFormData = (data: Partial<SellFormData>) => {
    setSellFormData((prev) => ({ ...prev, ...data }));
  };

  const resetSellFormData = () => {
    setSellFormData(initialSellFormData);
  };

  return (
    <UIContext.Provider
      value={{
        isSellModalOpen,
        openSellModal,
        closeSellModal,
        sellFormData,
        updateSellFormData,
        resetSellFormData,
      }}>
      {children}
    </UIContext.Provider>
  );
};
