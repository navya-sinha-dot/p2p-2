import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Layout from "../components/layout/Layout";

// Mock wishlist data
const wishlistItems = [
  {
    id: "1",
    name: "Kids Party Setup for Birthday (golden & blue)",
    price: 49,
    image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
    location: "Versova, Mumbai",
  },
  {
    id: "2",
    name: "Professional DSLR Camera Kit",
    price: 299,
    image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
    location: "Andheri, Mumbai",
  },
];

const Wishlist = () => {
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (id) => {
    console.log("Removing from wishlist:", id);
    // Would implement actual wishlist functionality here
  };

  return (
    <Layout showSidebar={false}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          Your Wishlist
        </motion.h1>

        {wishlistItems.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="text-gray-500 mb-6">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-2 bg-pink-600 text-white rounded-md font-medium">
              Browse Items
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between mb-2">
                    <h3
                      className="font-medium text-lg cursor-pointer hover:text-pink-600"
                      onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </h3>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm mb-2">
                    ₹ {item.price} per week
                  </p>
                  <p className="text-gray-500 text-xs">{item.location}</p>

                  <div className="mt-auto pt-2">
                    <motion.button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="w-full py-2 bg-pink-600 text-white rounded-md text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
