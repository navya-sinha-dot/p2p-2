import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Calendar } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, getTotalPrice, getTotalDeposit } = useCart();
  const [rentalDuration, setRentalDuration] = useState({});

  const updateDuration = (itemId, duration) => {
    setRentalDuration((prev) => ({ ...prev, [itemId]: duration }));
  };

  const handleCheckout = () => {
    // In a real app, this would initiate the payment process
    alert("Payment gateway would open here!");
  };

  return (
    <Layout showSidebar={false}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-2 bg-pink-600 text-white rounded-md font-medium">
              Browse Items
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-2 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm mb-2">
                      ₹ {item.price} per week
                    </p>

                    <div className="flex items-center mt-2">
                      <label className="text-sm mr-2 flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Rental Duration:
                      </label>
                      <select
                        value={rentalDuration[item.id] || item.duration}
                        onChange={(e) =>
                          updateDuration(item.id, parseInt(e.target.value))
                        }
                        className="text-sm border border-gray-300 rounded-md px-2 py-1">
                        <option value={7}>1 week</option>
                        <option value={14}>2 weeks</option>
                        <option value={21}>3 weeks</option>
                        <option value={28}>4 weeks</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹ {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit</span>
                  <span>₹ {getTotalDeposit()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span>₹ {Math.round(getTotalPrice() * 0.05)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    ₹{" "}
                    {getTotalPrice() +
                      getTotalDeposit() +
                      Math.round(getTotalPrice() * 0.05)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Security deposit will be refunded after the rental period
                  ends.
                </p>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="w-full py-3 bg-pink-600 text-white rounded-md font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                Proceed to Payment
              </motion.button>

              <button
                onClick={() => navigate("/home")}
                className="w-full text-center mt-4 text-sm text-gray-600 hover:text-pink-600">
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
