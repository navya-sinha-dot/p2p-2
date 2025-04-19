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

// New interface for donate form data
interface DonateFormData {
  category: string;
  itemName: string;
  description: string;
  hasImages: boolean;
  image?: string;
}

interface UIContextType {
  // Existing sell modal properties
  isSellModalOpen: boolean;
  openSellModal: () => void;
  closeSellModal: () => void;
  sellFormData: SellFormData;
  updateSellFormData: (data: Partial<SellFormData>) => void;
  resetSellFormData: () => void;
  
  // New donate modal properties
  isDonateModalOpen: boolean;
  openDonateModal: () => void;
  closeDonateModal: () => void;
  donateFormData: DonateFormData;
  updateDonateFormData: (data: Partial<DonateFormData>) => void;
  resetDonateFormData: () => void;
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

// Initialize default donate form data
const initialDonateFormData: DonateFormData = {
  category: "",
  itemName: "",
  description: "",
  hasImages: false,
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
  // Existing sell modal state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellFormData, setSellFormData] =
    useState<SellFormData>(initialSellFormData);

  // New donate modal state
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [donateFormData, setDonateFormData] = 
    useState<DonateFormData>(initialDonateFormData);

  // Existing sell modal functions
  const openSellModal = () => setIsSellModalOpen(true);
  const closeSellModal = () => setIsSellModalOpen(false);

  const updateSellFormData = (data: Partial<SellFormData>) => {
    setSellFormData((prev) => ({ ...prev, ...data }));
  };

  const resetSellFormData = () => {
    setSellFormData(initialSellFormData);
  };

  // New donate modal functions
  const openDonateModal = () => setIsDonateModalOpen(true);
  const closeDonateModal = () => setIsDonateModalOpen(false);

  const updateDonateFormData = (data: Partial<DonateFormData>) => {
    setDonateFormData((prev) => ({ ...prev, ...data }));
  };

  const resetDonateFormData = () => {
    setDonateFormData(initialDonateFormData);
  };

  return (
    <UIContext.Provider
      value={{
        // Existing sell modal values
        isSellModalOpen,
        openSellModal,
        closeSellModal,
        sellFormData,
        updateSellFormData,
        resetSellFormData,
        
        // New donate modal values
        isDonateModalOpen,
        openDonateModal,
        closeDonateModal,
        donateFormData,
        updateDonateFormData,
        resetDonateFormData,
      }}>
      {children}
    </UIContext.Provider>
  );
};