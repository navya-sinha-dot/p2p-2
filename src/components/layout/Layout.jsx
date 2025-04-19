import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SellModal from "../sell/SellModal";
import { useUI } from "../../context/UIContext";

const Layout = ({ children, showSidebar = true }) => {
  const { isSellModalOpen } = useUI();
  const [selectedCategory, setSelectedCategory] = React.useState("");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex">
        {showSidebar && (
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        <motion.main
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          {children}
        </motion.main>
      </div>

      {isSellModalOpen && <SellModal />}
    </div>
  );
};

export default Layout;
