import React, { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  
  // Example package - in a real app, this would come from context/state
  const packageDetails = {
    name: "10 Premium plus Ad with 30 days Featured",
    location: "Package applicable for Cars in Mumbai",
    price: 17453,
    discount: 7854,
    total: 9599,
    discountPercent: 45
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlePayment = () => {
    // In a real app, this would redirect to payment gateway
    alert("Redirecting to payment gateway...");
    // navigate("/payment-success");
  };

  return (
    <motion.div 
      className="bg-purple-50 min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-teal-900 mb-8 text-center">View Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 relative">
            <div className="absolute top-6 left-0 bg-yellow-300 text-xs font-bold px-2 py-1">
              -{packageDetails.discountPercent}%
            </div>
            
            <div className="pl-12">
              <h2 className="text-lg font-bold text-teal-900">{packageDetails.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{packageDetails.location}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">₹ {packageDetails.total.toLocaleString()}</p>
                  <p className="text-gray-500 line-through text-sm">₹ {packageDetails.price.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-6">
            <h3 className="font-bold text-teal-900 mb-4">PRICE DETAILS</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹ {packageDetails.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount</span>
                <span>-₹ {packageDetails.discount.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹ {(packageDetails.total * quantity).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handlePayment}
          className="w-full bg-teal-800 hover:bg-teal-900 text-white py-4 rounded-md font-medium text-lg shadow-md transition-colors duration-200"
        >
          Pay ₹ {(packageDetails.total * quantity).toLocaleString()}
        </button>
      </div>
    </motion.div>
  );
};

export default CartPage;