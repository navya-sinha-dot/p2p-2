import React from "react";
import { motion } from "framer-motion";

const categories = [
  { id: "books", name: "Books" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "electronics", name: "Electronics & Gadgets" },
  { id: "tech-accessories", name: "Tech Accessories" },
  { id: "apparel", name: "Apparel & Fashion" },
  { id: "fitness", name: "Fitness & Sports Gear" },
  { id: "event", name: "Event & Party Supplies" },
  { id: "travel", name: "Travel & Lifestyle Gear" },
  { id: "furniture", name: "Furniture" },
];

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <motion.div
      className="bg-gradient-to-b from-yellow-100 to-pink-200 p-4 min-h-screen w-56"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-lg font-bold mb-6 text-center">CATEGORIES</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <motion.li
            key={category.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? "bg-pink-300 font-medium"
                  : "hover:bg-pink-100"
              }`}>
              {category.name}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
