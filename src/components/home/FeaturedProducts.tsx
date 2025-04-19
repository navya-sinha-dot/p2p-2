import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../common/ProductCard";
import { useCart } from "../../context/CartContext";

// Mock data for products
const products = [
  {
    id: "1",
    name: "Kids Party Setup for Birthday (golden & blue)",
    price: 49,
    deposit: 500,
    image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
    location: "Versova, Mumbai",
    duration: 7,
    sellerId: "seller1",
    rating: 4.8,
    reviews: 24
  },
  {
    id: "2",
    name: "Professional DSLR Camera Kit",
    price: 299,
    deposit: 3000,
    image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
    location: "Andheri, Mumbai",
    duration: 3,
    sellerId: "seller2",
    rating: 4.5,
    reviews: 39
  },
  {
    id: "3",
    name: "Vintage Party Dress - Size M",
    price: 79,
    deposit: 1000,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg",
    location: "Bandra, Mumbai",
    duration: 4,
    sellerId: "seller3",
    rating: 4.7,
    reviews: 18
  },
];

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleRent = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToWishlist = (productId) => {
    console.log("Added to wishlist:", productId);
    // Would implement actual wishlist functionality here
  };

  return (
    <div className="py-10 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">FRESH RECOMMENDATIONS</h2>
          <p className="text-purple-600 mt-1">Discover the latest items available for rent</p>
        </div>
        <button className="text-purple-700 hover:text-purple-900 flex items-center font-medium">
          View all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              location={product.location}
              rating={product.rating}
              reviews={product.reviews}
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