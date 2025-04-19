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
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleRent = (product: any) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log("Added to wishlist:", productId);
    // Would implement actual wishlist functionality here
  };

  return (
    <div className="py-8 px-6">
      <h2 className="text-xl font-bold mb-6">FRESH RECOMMENDATIONS</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            location={product.location}
            onAddToWishlist={() => handleAddToWishlist(product.id)}
            onRent={() => handleRent(product)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;
