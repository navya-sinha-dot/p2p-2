import React from "react";
import { Box } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Box size={24} className="text-purple-700" />
      <span className="ml-2 font-bold text-xl">Traydr</span>
    </div>
  );
};

export default Logo;
