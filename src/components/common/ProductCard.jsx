import React from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWishlist } from "../../hooks/useWishlist";

const ProductCard = ({
  id,
  name,
  price,
  image,
  location,
  description,
  category,
  onAddToWishlist,
  onRent,
}) => {
  const wishlist = useWishlist();
  const isInWishlist = wishlist.find((item) => item.id === id);

  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden p-4"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Wishlist Button */}
      <button
        onClick={() => onAddToWishlist(id)}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-purple-100 transition-colors duration-200"
      >
        {isInWishlist ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart
            className="text-gray-600 text-xl"
            onClick={() => onAddToWishlist(id)}
          />
        )}
      </button>

      <div className="mt-4">
        <p className="text-sm text-gray-500">{location}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-700 mt-1 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-purple-600 font-bold text-lg">
            ₹{price}/day
          </span>
          <button
            onClick={() => onRent(id)}
            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
          >
            Rent Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
