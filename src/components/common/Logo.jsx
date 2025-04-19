import React from "react";
import { Box } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img
        src="image-removebg-preview.png"
        alt="TradyR Logo"
        width='50px'
      />
      <span className="ml-0.001 font-bold text-3xl">Traydr</span>
    </div>
  );
};

export default Logo;
