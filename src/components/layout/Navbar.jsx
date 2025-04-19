import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  Calendar,
  MessageCircle,
  User,
  Plus,
} from "lucide-react";
import { useUI } from "../../context/UIContext";
import Logo from "../common/Logo";

const Navbar = () => {
  const { openSellModal } = useUI();

  const iconVariants = {
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-200 via-purple-50 to-indigo-50  p-6  shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="max-w-10xl mx-auto  flex items-center ">
        <div className="flex items-center space-x-15 mr-20">
          <Link to="/home" className="flex items-center">
            <Logo />
          </Link>

          <motion.button
            onClick={openSellModal}
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-1 rounded-lg font-medium flex items-center shadow-md transition-all duration-200"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.97 }}>
            <Plus size={18} className="mr-1 mx-auto" />
            <span>SELL</span>
          </motion.button>
        </div>

        <div className="flex-1 max-w-xl mx-6 mr-30">
          <div className="relative group">
            <input
              type="text"
              placeholder="What are you searching for?"
              className="w-full py-2.5 px-5 pr-12 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm transition-all duration-200 bg-white"
            />
            <motion.button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-100 p-1.5 rounded-full text-purple-700 hover:bg-purple-200 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={18} />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <motion.div 
            className="relative"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
    
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/chat" className="p-2 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center mr-10">
              <MessageCircle size={22} />
            </Link>
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/wishlist" className="p-2 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center mr-10">
              <Heart size={22} />
                          </Link>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/calendar" className="p-2 rounded-full text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center mr-10">
              <Calendar size={22} />
            </Link>
          </motion.div>
          
          <motion.div 
            className="ml-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/profile" className="flex items-center bg-purple-200 hover:bg-purple-300 p-1 pr-3 rounded-full transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center mr-2 border-2 border-white">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-purple-900 hidden md:block">Profile</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;