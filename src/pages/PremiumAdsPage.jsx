import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
//import { UIContext } from "../components/";
import Layout from "../components/layout/Layout";

const PremiumAdsPage = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handlePackageSelect = (packageInfo) => {
    // Check if package is already selected
    const isSelected = selectedPackages.some(pkg => pkg.id === packageInfo.id);
    
    if (isSelected) {
      // Remove package if already selected
      setSelectedPackages(selectedPackages.filter(pkg => pkg.id !== packageInfo.id));
    } else {
      // Add package if not selected
      setSelectedPackages([...selectedPackages, packageInfo]);
    }
    
    // Show cart button if at least one package is selected
    if (!isSelected || selectedPackages.length > 1) {
      setShowCart(true);
    } else if (selectedPackages.length === 1 && isSelected) {
      setShowCart(false);
    }
  };

  // Calculate total cost of selected packages
  const totalCost = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);

  return (
    <Layout showSidebar={false}>
    <motion.div
      className="bg-purple-50 min-h-screen pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto pt-8 px-4">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-10 mb-12 text-center shadow-md">
          <div className="mx-auto w-20 h-20 mb-4">
            <div className="relative">
              <div className="bg-purple-300 w-16 h-20 rounded-md shadow-md transform rotate-6 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-800">%</span>
              </div>
              <div className="absolute top-0 w-full flex justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-purple-500 -mt-2"></div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-purple-900 mb-2">Premium Advertising Packages</h1>
        </div>

        {/* AUTO BOOST SECTION */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">BOOST YOUR ADS TO THE TOP</h2>
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>Get your ads automatically boosted to the top of search results</p>
            </div>
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>All packages valid for 30 days</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-purple-800 my-4">Weekly Auto-Boost</h3>
          <div className="flex items-center mb-2">
            <Check size={18} className="text-purple-500 mr-2" />
            <p>Your ads get boosted automatically every 7 days</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {[
              { id: 'boost-50', ads: 50, price: 18290, originalPrice: 121933, discount: 85, type: 'Auto-Boost' },
              { id: 'boost-10', ads: 10, price: 6999, originalPrice: 18418, discount: 62, type: 'Auto-Boost' },
              { id: 'boost-5', ads: 5, price: 5499, originalPrice: 13093, discount: 58, type: 'Auto-Boost' },
              { id: 'boost-3', ads: 3, price: 4199, originalPrice: 8569, discount: 51, type: 'Auto-Boost' }
            ].map((pkg) => (
              <div key={pkg.id} className="border border-purple-200 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="border-b border-purple-200 p-4 flex items-center bg-purple-50">
                  <input
                    type="checkbox"
                    id={pkg.id}
                    className="w-5 h-5 text-purple-600 rounded-md mr-3"
                    checked={selectedPackages.some(item => item.id === pkg.id)}
                    onChange={() => handlePackageSelect(pkg)}
                  />
                  <label htmlFor={pkg.id} className="font-medium text-purple-900">{pkg.ads} Ads</label>
                </div>
                <div className="p-4 relative">
                  <div className="absolute top-2 left-0 bg-purple-200 text-black text-xs font-bold px-2 py-1">
                    -{pkg.discount}%
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-purple-900">₹ {pkg.price.toLocaleString()}</p>
                    <p className="text-purple-400 line-through text-sm">₹ {pkg.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE SECTION */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">GET FEATURED PLACEMENT</h2>
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>Your ads appear with a 'FEATURED' tag in premium positions</p>
            </div>
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>Significantly higher visibility and response rate</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-purple-800 my-4">30-Day Featured Placement</h3>
          <div className="flex items-center mb-2">
            <Check size={18} className="text-purple-500 mr-2" />
            <p>Get up to 10X more responses than standard ads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {[
              { id: 'feature-30-10', ads: 10, price: 9599, originalPrice: 17453, discount: 45, days: 30, type: 'Featured' },
              { id: 'feature-30-5', ads: 5, price: 8049, originalPrice: 13415, discount: 40, days: 30, type: 'Featured' },
              { id: 'feature-30-3', ads: 3, price: 5949, originalPrice: 9152, discount: 35, days: 30, type: 'Featured' },
              { id: 'feature-30-1', ads: 1, price: 2999, originalPrice: 4998, discount: 40, days: 30, type: 'Featured' }
            ].map((pkg) => (
              <div key={pkg.id} className="border border-purple-200 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="border-b border-purple-200 p-4 flex items-center bg-purple-50">
                  <input
                    type="checkbox"
                    id={pkg.id}
                    className="w-5 h-5 text-purple-00 rounded-md mr-3"
                    checked={selectedPackages.some(item => item.id === pkg.id)}
                    onChange={() => handlePackageSelect(pkg)}
                  />
                  <label htmlFor={pkg.id} className="font-medium text-purple-900">{pkg.ads} Ads</label>
                </div>
                <div className="p-4 relative">
                  <div className="absolute top-2 left-0 bg-purple-200 text-black text-xs font-bold px-2 py-1">
                    -{pkg.discount}%
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-purple-900">₹ {pkg.price.toLocaleString()}</p>
                    <p className="text-purple-400 line-through text-sm">₹ {pkg.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold text-purple-800 my-4">7-Day Featured Placement</h3>
          <div className="flex items-center mb-2">
            <Check size={18} className="text-purple-500 mr-2" />
            <p>Get up to 5X more responses than standard ads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {[
              { id: 'feature-7-10', ads: 10, price: 7199, originalPrice: 11998, discount: 40, days: 7, type: 'Featured' },
              { id: 'feature-7-5', ads: 5, price: 6349, originalPrice: 9768, discount: 35, days: 7, type: 'Featured' },
              { id: 'feature-7-3', ads: 3, price: 4599, originalPrice: 6570, discount: 30, days: 7, type: 'Featured' },
              { id: 'feature-7-1', ads: 1, price: 1999, originalPrice: 2856, discount: 30, days: 7, type: 'Featured' }
            ].map((pkg) => (
              <div key={pkg.id} className="border border-purple-200 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="border-b border-purple-200 p-4 flex items-center bg-purple-50">
                  <input
                    type="checkbox"
                    id={pkg.id}
                    className="w-5 h-5 text-purple-600 rounded-md mr-3"
                    checked={selectedPackages.some(item => item.id === pkg.id)}
                    onChange={() => handlePackageSelect(pkg)}
                  />
                  <label htmlFor={pkg.id} className="font-medium text-purple-900">{pkg.ads} Ads</label>
                </div>
                <div className="p-4 relative">
                  <div className="absolute top-2 left-0 bg-purple-200 text-black text-xs font-bold px-2 py-1">
                    -{pkg.discount}%
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-purple-900">₹ {pkg.price.toLocaleString()}</p>
                    <p className="text-purple-400 line-through text-sm">₹ {pkg.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM COMBO DEALS */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">PREMIUM COMBO DEALS</h2>
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>Get both Auto-Boost and Featured benefits at a special price</p>
            </div>
            <div className="flex items-center">
              <Check size={18} className="text-purple-500 mr-2" />
              <p>Our most effective advertising solution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { id: 'combo-premium-10', ads: 10, price: 12999, originalPrice: 25999, discount: 50, days: 30, type: 'Premium Combo' },
              { id: 'combo-premium-5', ads: 5, price: 9999, originalPrice: 19998, discount: 50, days: 30, type: 'Premium Combo' },
              { id: 'combo-premium-3', ads: 3, price: 7999, originalPrice: 15998, discount: 50, days: 30, type: 'Premium Combo' }
            ].map((pkg) => (
              <div key={pkg.id} className="border-2 border-purple-300 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="border-b border-purple-200 p-4 flex items-center bg-purple-100">
                  <input
                    type="checkbox"
                    id={pkg.id}
                    className="w-5 h-5 text-purple-600 rounded-md mr-3"
                    checked={selectedPackages.some(item => item.id === pkg.id)}
                    onChange={() => handlePackageSelect(pkg)}
                  />
                  <label htmlFor={pkg.id} className="font-medium text-purple-900">{pkg.ads} Premium Ads</label>
                </div>
                <div className="p-4 relative">
                  <div className="absolute top-2 left-0 bg-purple-300 text-black text-xs font-bold px-2 py-1">
                    -{pkg.discount}%
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-purple-900">₹ {pkg.price.toLocaleString()}</p>
                    <p className="text-purple-400 line-through text-sm">₹ {pkg.originalPrice.toLocaleString()}</p>
                  </div>
                  <div className="mt-4 text-sm text-purple-700">
                    <p>• Featured for 30 days</p>
                    <p>• Auto-Boost every week</p>
                    <p>• Priority customer support</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showCart && (
          <motion.div 
            className="fixed bottom-6 right-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link 
              to={{
                pathname: "/cart",
                // In a real app, you would pass this data through context or state management
                // This is just to illustrate the concept
              }}
              state={{ selectedPackages }}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-lg transition-all duration-200"
            >
              <ShoppingCart size={20} className="mr-2" />
              <span>View Cart ({selectedPackages.length}) - ₹{totalCost.toLocaleString()}</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
    </Layout>
  );
};

export default PremiumAdsPage;