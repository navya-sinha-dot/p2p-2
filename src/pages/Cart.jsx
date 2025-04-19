import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Calendar, ShoppingBag } from "lucide-react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, getTotalPrice, getTotalDeposit } = useCart();
  const [rentalDuration, setRentalDuration] = useState({});
  const [showItems, setShowItems] = useState(false);
  const itemsRef = useRef(null);

  // Sample items to display when Browse Items is clicked
  const availableItems = [
    {
      id: "item1",
      name: "DSLR Camera",
      price: 799,
      image: "/api/placeholder/100/100",
      deposit: 2000,
    },
    {
      id: "item2",
      name: "Camping Tent",
      price: 350,
      image: "/api/placeholder/100/100",
      deposit: 1000,
    },
    {
      id: "item3",
      name: "Mountain Bike",
      price: 599,
      image: "/api/placeholder/100/100",
      deposit: 1500,
    },
    {
      id: "item4",
      name: "Drone",
      price: 899,
      image: "/api/placeholder/100/100",
      deposit: 2500,
    },
  ];

  const updateDuration = (itemId, duration) => {
    setRentalDuration((prev) => ({ ...prev, [itemId]: duration }));
  };

  const handleCheckout = () => {
    // In a real app, this would initiate the payment process
    alert("Payment gateway would open here!");
  };

  const handleBrowseItems = () => {
    setShowItems(true);
    // Use setTimeout to ensure the state is updated before scrolling
    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleListYourItem = () => {
    // This would navigate to the sell/list page, similar to what "sell" button does
    navigate("/sell");
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
            <div className="space-y-4">
              <button
                onClick={handleBrowseItems}
                className="px-6 py-2 bg-purple-600 text-white rounded-md font-medium">
                Browse Items
              </button>
              <div className="mt-4">
                <button
                  onClick={handleListYourItem}
                  className="px-6 py-2 border border-purple-600 text-purple-600 rounded-md font-medium">
                  List Your Item
                </button>
              </div>
            </div>
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
                className="w-full py-3 bg-purple-600 text-white rounded-md font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                Proceed to Payment
              </motion.button>

              <button
                onClick={() => navigate("/home")}
                className="w-full text-center mt-4 text-sm text-gray-600 hover:text-purple-600">
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}

        {/* Available Items Section - shown when Browse Items is clicked */}
        {showItems && (
          <motion.div
            ref={itemsRef}
            className="mt-16 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <ShoppingBag size={20} className="mr-2" />
              Available Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    ₹ {item.price} per week
                  </p>
                  <p className="text-gray-500 text-xs">
                    Deposit: ₹ {item.deposit}
                  </p>
                  <button className="mt-3 w-full py-2 bg-purple-600 text-white rounded-md text-sm font-medium">
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
