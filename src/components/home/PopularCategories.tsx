import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { 
    id: "popular", 
    name: "POPULAR SEARCHES",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ) 
  },
  { 
    id: "cameras", 
    name: "CAMERAS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: "party", 
    name: "PARTY DRESS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 5a1 1 0 011 1v1h6V6a1 1 0 112 0v1h.5A2.5 2.5 0 0119 9.5v2A4.5 4.5 0 0114.5 16h-9A4.5 4.5 0 011 11.5v-2A2.5 2.5 0 013.5 7H4V6a1 1 0 011-1z" />
        <path d="M14.5 16A4.5 4.5 0 0019 11.5v-7A2.5 2.5 0 0016.5 2h-13A2.5 2.5 0 001 4.5v7A4.5 4.5 0 005.5 16h9zM4 5.5a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
      </svg>
    )
  },
  { 
    id: "printer", 
    name: "PRINTER",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    id: "novels", 
    name: "NOVELS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    )
  },
  { 
    id: "rucksack", 
    name: "RUCKSACK",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
      </svg>
    )
  },
];

const PopularCategories = () => {
  const [activeCategory, setActiveCategory] = useState("popular");

  return (
    <div className="py-5 px-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">Explore Categories</h3>
      
      <div className="flex overflow-x-auto py-2 gap-3 scrollbar-hide">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`flex items-center whitespace-nowrap px-4 py-2 rounded-lg border transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-purple-100 border-purple-200 text-purple-800 font-medium"
                : "bg-white border-gray-100 text-gray-700 hover:bg-purple-50 hover:border-purple-100"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className={`mr-2 ${activeCategory === category.id ? "text-purple-700" : "text-gray-500"}`}>
              {category.icon}
            </span>
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;