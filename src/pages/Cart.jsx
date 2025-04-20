import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize with packages from location state, or empty array if none
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  
  useEffect(() => {
    // Check if we have items passed from the premium ads page
    if (location.state?.selectedPackages) {
      const packages = location.state.selectedPackages;
      setCartItems(packages);
      
      // Initialize quantities (default to 1 for each item)
      const initialQuantities = {};
      packages.forEach(pkg => {
        initialQuantities[pkg.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [location.state]);

  const handleQuantityChange = (id, amount) => {
    setQuantities(prev => {
      const newQuantity = (prev[id] || 1) + amount;
      if (newQuantity < 1) return prev;
      return { ...prev, [id]: newQuantity };
    });
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 1));
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.originalPrice * (quantities[item.id] || 1);
      const discountedPrice = item.price * (quantities[item.id] || 1);
      return total + (originalPrice - discountedPrice);
    }, 0);
  };

  const handlePayment = () => {
    // In a real app, this would redirect to payment gateway
    alert("Redirecting to payment gateway...");
    // navigate("/payment-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-purple-50 min-h-screen py-12 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Your cart is empty</h1>
        <p className="text-purple-700 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <button 
          onClick={() => navigate("/premium-ads")}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Browse Premium Ads
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-purple-50 min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-purple-900 mb-8 text-center">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="p-6 border-b border-purple-100 relative">
              <div className="absolute top-6 left-0 bg-purple-600 text-xs font-bold px-2 py-1 text-white">
                -{item.discount}%
              </div>
              
              <div className="pl-12 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-bold text-purple-900">
                    {item.ads} {item.type} {item.days ? `(${item.days} days)` : ""} Ads
                  </h2>
                  <p className="text-purple-600 text-sm">
                    {item.type === 'Auto-Boost' ? 'Automatically boosted to top positions' : 
                      item.type === 'Featured' ? `Featured placement for ${item.days} days` :
                      'Premium combo with Auto-Boost and Featured benefits'}
                  </p>
                  
                  <div className="mt-2">
                    <p className="text-xl font-bold text-purple-900">₹ {item.price.toLocaleString()}</p>
                    <p className="text-purple-400 line-through text-sm">₹ {item.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center border border-purple-200 rounded-md mr-4">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-3 py-1 text-purple-700 hover:bg-purple-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 border-x border-purple-200">{quantities[item.id] || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 text-purple-700 hover:bg-purple-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-purple-700 hover:text-purple-900 hover:bg-purple-100 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-6">
            <h3 className="font-bold text-purple-900 mb-4 border-b border-purple-100 pb-2">PRICE DETAILS</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹ {(calculateSubtotal() + calculateTotalDiscount()).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹ {calculateTotalDiscount().toLocaleString()}</span>
              </div>
              <div className="border-t border-purple-100 pt-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹ {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="pt-2 text-green-600 text-sm">
                <p>You will save ₹ {calculateTotalDiscount().toLocaleString()} on this order</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handlePayment}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-md font-medium text-lg shadow-md transition-colors duration-200"
        >
          Pay ₹ {calculateSubtotal().toLocaleString()}
        </button>
      </div>
    </motion.div>
  );
};

export default CartPage;