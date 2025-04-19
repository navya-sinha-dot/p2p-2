import React from "react";
import { useNavigate } from "react-router-dom";

import { Search, MessageSquare, Bell, Heart, User, Plus } from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-amber-50 to-pink-200 shadow-md">
      {/* Left Section: Logo or Title */}
      <div className="text-2xl font-semibold text-gray-700"></div>

      {/* Right Section: Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center bg-black text-white px-4 py-2 rounded font-bold text-sm gap-1 hover:bg-gray-800 transition">
          <Plus size={16} />
          <span>DONATE</span>
        </button>

        <button className="flex items-center bg-black text-white px-4 py-2 rounded font-bold text-sm gap-1 hover:bg-gray-800 transition">
          <Plus size={16} />
          <span>SELL</span>
        </button>
      </div>

      <div className="flex-1 max-w-lg mx-5">
        <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
          <input
            type="text"
            placeholder="What are you searching for?"
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="px-4">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <MessageSquare size={20} />
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Bell size={20} />
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Heart size={20} />
        </div>

        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <User size={20} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
