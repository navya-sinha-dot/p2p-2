import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ProductCard = ({
  id,
  name,
  price,
  image,
  location,
  onAddToWishlist,
  onRent,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button
          onClick={onAddToWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-pink-50">
          <Heart size={20} className="text-gray-600 hover:text-pink-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate mb-1">{name}</h3>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-lg font-bold">
              ₹ {price} <span className="text-xs text-gray-500">PER WEEK</span>
            </p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>

          <motion.button
            onClick={onRent}
            className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            RENT
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
