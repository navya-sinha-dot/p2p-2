import React from "react";
import { motion } from "framer-motion";

const categories = [
  { id: "popular", name: "POPULAR SEARCHES" },
  { id: "cameras", name: "CAMERAS" },
  { id: "party", name: "PARTY DRESS" },
  { id: "printer", name: "PRINTER" },
  { id: "novels", name: "NOVELS" },
  { id: "rucksack", name: "RUCKSACK" },
];

const PopularCategories = () => {
  return (
    <div className="flex overflow-x-auto py-4 px-6 gap-4 bg-white">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          className={`whitespace-nowrap px-4 py-1 rounded-full ${
            index === 0
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default PopularCategories;
