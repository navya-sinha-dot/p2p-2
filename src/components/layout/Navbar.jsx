import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  Calendar,
  MessageCircle,
  User,
} from "lucide-react";
import { useUI } from "../../context/UIContext";
import Logo from "../common/Logo";

const Navbar = () => {
  const { openSellModal } = useUI();

  return (
    <motion.nav
      className="bg-gradient-to-r from-yellow-100 via-pink-100 to-pink-200 py-4 px-6 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center">
            <Logo />
          </Link>

          <motion.button
            onClick={openSellModal}
            className="bg-black text-white px-4 py-2 rounded-full font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            + SELL
          </motion.button>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you searching for?"
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/chat" className="p-2 rounded-full hover:bg-pink-100">
            <MessageCircle size={24} />
          </Link>
          <Link to="/wishlist" className="p-2 rounded-full hover:bg-pink-100">
            <Heart size={24} />
          </Link>
          <Link to="/cart" className="p-2 rounded-full hover:bg-pink-100">
            <ShoppingCart size={24} />
          </Link>
          <Link to="/calendar" className="p-2 rounded-full hover:bg-pink-100">
            <Calendar size={24} />
          </Link>
          <Link to="/profile" className="p-2 rounded-full hover:bg-pink-100">
            <User size={24} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
