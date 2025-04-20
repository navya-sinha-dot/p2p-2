import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2,
  Heart,
  ChevronRight,
  ArrowRight,
  Gift,
  Clock,
  Tag,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useWishlist } from "../hooks/useWishlist";
import ProductCard from "../components/common/ProductCard";

// Recommended products based on wishlist categories
const recommendedProducts = [
  {
    id: "5",
    name: "Mini Projector for Home Cinema",
    price: 199,
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg",
    location: "Malad, Mumbai",
    category: "electronics",
    featured: true,
  },
  {
    id: "6",
    name: "Event Lighting Pack - RGB LED Bars",
    price: 89,
    image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    location: "Juhu, Mumbai",
    category: "event",
    limited: true,
  },
  {
    id: "7",
    name: "Ergonomic Desk Chair - Premium",
    price: 110,
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg",
    location: "Andheri, Mumbai",
    category: "furniture",
  },
  {
    id: "8",
    name: "Trek Mountain Bicycle - Full Suspension",
    price: 175,
    image: "https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg",
    location: "Khar, Mumbai",
    category: "fitness",
    discount: "20% OFF",
  },
];

// Trending Now products
const trendingProducts = [
  {
    id: "11",
    name: "DJ Equipment Complete Set",
    price: 250,
    image: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg",
    location: "Worli, Mumbai",
    category: "music",
  },
  {
    id: "12",
    name: "Premium Coffee Machine - Barista Grade",
    price: 135,
    image: "https://images.pexels.com/photos/4350063/pexels-photo-4350063.jpeg",
    location: "Dadar, Mumbai",
    category: "kitchen",
    featured: true,
  },
  {
    id: "13",
    name: "Drone with 4K Camera - DJI Mini",
    price: 199,
    image: "https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg",
    location: "Bandra, Mumbai",
    category: "electronics",
    limited: true,
  },
  {
    id: "14",
    name: "Professional Karaoke Set with Speakers",
    price: 115,
    image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg",
    location: "Lower Parel, Mumbai",
    category: "entertainment",
  },
];

const categoryColors = {
  event: "bg-pink-600",
  electronics: "bg-blue-600",
  fitness: "bg-green-600",
  furniture: "bg-amber-600",
  outdoor: "bg-teal-600",
  music: "bg-purple-700",
  kitchen: "bg-orange-600",
  entertainment: "bg-indigo-600",
};

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlist = useWishlist();

  const handleRemoveFromWishlist = (id) => {};

  const ItemCard = ({ item, isWishlist = false }) => (
    <motion.div
      key={item.id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex space-x-4 mt-2 sm:mt-0 flex-col h-full "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
      <div className="relative flex space-x-4 mt-2 sm:mt-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {item.category && (
          <div
            className={`absolute top-2 left-2 ${
              categoryColors[item.category] || "bg-gray-700"
            } text-white text-xs py-1 px-2 rounded-full`}>
            {item.category}
          </div>
        )}
        {item.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-1 px-2 rounded-full">
            {item.discount}
          </div>
        )}
        {item.featured && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Tag size={12} className="mr-1" /> Featured
          </div>
        )}
        {item.limited && (
          <div className="absolute bottom-2 right-2 bg-purple-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Clock size={12} className="mr-1" /> Limited
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between mb-2">
          <h3
            className="font-medium text-lg cursor-pointer hover:text-purple-600 line-clamp-2"
            onClick={() => navigate(`/product/${item.id}`)}>
            {item.name}
          </h3>
          {isWishlist ? (
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="text-gray-400 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          ) : (
            <button className="text-gray-400 hover:text-red-500">
              <Heart size={18} />
            </button>
          )}
        </div>

        <p className="text-gray-500 text-sm mb-2">₹ {item.price} per week</p>
        <p className="text-gray-500 text-xs flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {item.location}
        </p>

        <div className="mt-auto pt-4 flex space-x-4 md-2 sm:md-0">
          <motion.button
            onClick={() => navigate(`/product/${item.id}`)}
            className={`w-full py-2 ${
              isWishlist
                ? "bg-purple-600"
                : "bg-gradient-to-r from-purple-600 to-indigo-500"
            } text-white rounded-md text-sm font-medium flex justify-center items-center`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            View Details
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const SectionHeader = ({ title, actionText, onClick, color = "purple" }) => (
    <div className="flex justify-between items-center mb-6">
      <h2
        className={`text-xl font-semibold text-${color}-700 flex items-center`}>
        <span
          className={`w-2 h-6 bg-${color}-500 rounded mr-2 inline-block`}></span>
        {title}
      </h2>
      {actionText && (
        <button
          onClick={onClick}
          className={`text-${color}-600 hover:text-${color}-800 text-sm font-medium flex items-center`}>
          {actionText}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );

  return (
    <Layout showSidebar={false}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-300 bg-clip-text text-transparent">
            Your Wishlist
          </h1>
          <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            {wishlist.length} items
          </span>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <img
              src="https://images.pexels.com/photos/7957739/pexels-photo-7957739.jpeg"
              alt="Empty wishlist"
              className="mx-auto w-48 h-48 object-cover rounded-full mb-6 opacity-70"
            />
            <p className="text-gray-500 mb-6">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-gradient-to-r from-purple-300 to-indigo-400 text-white rounded-md font-medium hover:from-purple-700 hover:to-indigo-600 transition-colors">
              Browse Items
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}>
              {wishlist.map((item) => (
                <ProductCard key={item.id} item={item} isWishlist={true} />
              ))}
            </motion.div>

            <div className="flex justify-center mt-6">
              <motion.button
                className="flex items-center text-purple-600 font-medium hover:text-purple-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}>
                <Gift size={16} className="mr-1" />
                Save items for later
              </motion.button>
            </div>
          </>
        )}

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Discover More
            </span>
          </div>
        </div>

        {/* Recommended Products Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <SectionHeader
            title="Recommended for you"
            actionText="View all"
            onClick={() => navigate("/home")}
            color="purple"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ItemCard key={product.id} item={product} isWishlist={false} />
            ))}
          </div>
        </motion.div>

        {/* Trending Now Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <SectionHeader
            title="Trending Now"
            actionText="Explore all"
            onClick={() => navigate("/trending")}
            color="pink"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ItemCard key={product.id} item={product} isWishlist={false} />
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-3">
              Looking for something specific?
            </h3>
            <p className="text-gray-600 mb-6">
              We can help you find the perfect rental items for your needs and
              budget. Browse our extensive collection organized by categories.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/home")}
                className="px-6 py-3 bg-gradient-to-r from-purple-300 to-indigo-300 text-white rounded-md font-medium hover:from-purple-700 hover:to-purple-800 transition-colors">
                Browse Categories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Wishlist;
