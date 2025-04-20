import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../common/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { user } = useAuth();

  const handleRent = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(
        `http://localhost:3001/wishlist/${user.id}/${productId}`
      );
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <div className="py-10 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">
            FRESH RECOMMENDATIONS
          </h2>
          <p className="text-purple-600 mt-1">
            Discover the latest items available for rent
          </p>
        </div>
        <button className="text-purple-700 hover:text-purple-900 flex items-center font-medium">
          View all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products?.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              location={product.location}
              description={product.description}
              category={product.category}
              onAddToWishlist={() => handleAddToWishlist(product.id)}
              onRent={() => handleRent(product)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;
