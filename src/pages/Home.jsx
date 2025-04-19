import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import PopularCategories from "../components/home/PopularCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-purple-50"
      >
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
                  Rent Anything.<br />Save Money.
                </h1>
                <p className="text-lg text-purple-700 mb-6">
                  Find thousands of items for rent near you. 
                  Why buy when you can borrow?
                </p>
                <div className="flex space-x-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    Browse Items
                  </button>
                  <button className="border border-purple-600 text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    List Your Item
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg" 
                    alt="Featured rental item" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <motion.div 
                    className="absolute -bottom-4 -right-4 bg-purple-100 p-3 rounded-lg shadow-md"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="font-bold text-purple-800">Most Popular</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      
        {/* Search Bar */}
        <div className="bg-white px-6 py-5 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking to rent today?"
                className="w-full pl-12 pr-4 py-3 bg-purple-50 border border-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>

        <PopularCategories />
        <FeaturedProducts />
        
        {/* Trust Badges Section */}
        <div className="bg-white py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-center text-purple-900 mb-8">WHY CHOOSE TRAYDR</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Rental Process</h3>
                <p className="text-gray-600">Verified users, secure payments, and insurance protection for every rental.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Save Money</h3>
                <p className="text-gray-600">Why buy when you can rent for a fraction of the cost? Affordable pricing on everything.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Local Rentals</h3>
                <p className="text-gray-600">Find items to rent near you. Quick pickups and easy returns with local owners.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;