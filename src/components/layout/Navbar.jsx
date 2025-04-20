import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  Calendar,
  MessageCircle,
  User,
  Plus,
  Leaf,
  DollarSign,
} from "lucide-react";
import { useUI } from "../../context/UIContext";
import Logo from "../common/Logo";
import DonationPopup from "../sell/Donationpopup";

const Navbar = () => {
  const { openSellModal, openDonateModal } = useUI();

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-200 via-purple-50 to-indigo-50 p-3 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="max-w-10xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/home" className="flex items-center mr-25">
            <Logo />
          </Link>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={openSellModal}
              className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-1 rounded-lg font-medium flex items-center shadow-md transition-all duration-200"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}>
              <Plus size={16} className="mr-1" />
              <span>SELL</span>
            </motion.button>

            <motion.button
              onClick={() => {
                <DonationPopup />;
              }}
              className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-1 rounded-lg font-medium flex items-center shadow-md transition-all duration-200"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}>
              <Plus size={16} className="mr-1" />
              <span>DONATE</span>
            </motion.button>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="What are you searching for?"
              className="w-full py-2 px-4 pr-10 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm transition-all duration-200 bg-white text-sm"
            />
            <motion.button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-100 p-1 rounded-full text-purple-700 hover:bg-purple-200 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <Search size={16} />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/premium-ads"
              className="p-1.5 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center">
              <DollarSign size={20} />
            </Link>
          </motion.div>

          <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/chat"
              className="p-1.5 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center">
              <MessageCircle size={20} />
            </Link>
          </motion.div>

          <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/wishlist"
              className="p-1.5 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center">
              <Heart size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"></motion.div>

          <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/calendar"
              className="p-1.5 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center">
              <Calendar size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="ml-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              className="flex items-center bg-purple-200 hover:bg-purple-300 p-1 pr-3 rounded-full transition-colors duration-200">
              <div className="w-7 h-7 rounded-full bg-purple-700 text-white flex items-center justify-center mr-1.5 border-2 border-white">
                <User size={14} />
              </div>
              <span className="text-xs font-medium text-purple-900 hidden md:block">
                Profile
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
