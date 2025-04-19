import React from "react";
import {
  Search,
  MessageSquare,
  Bell,
  Heart,
  ShoppingCart,
  User,
  Plus,
} from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-amber-50 to-pink-200 shadow-md">
      <div className="flex items-center">
        <div className="text-2xl mr-4 "></div>
        <button className="flex items-center bg-black text-white px-4 py-2 rounded font-bold text-sm gap-1">
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
          <ShoppingCart size={20} />
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <User size={20} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
