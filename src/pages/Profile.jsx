import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Star,
  Package,
  History,
  CreditCard,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("rentals");

  // Mock rental history data
  const rentals = [
    {
      id: "1",
      type: "rented",
      name: "Professional DSLR Camera Kit",
      date: "2024-02-15",
      status: "active",
      image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
      price: 299,
      owner: "Rahul Verma",
    },
    {
      id: "2",
      type: "lent",
      name: "Kids Party Setup",
      date: "2024-02-10",
      status: "completed",
      image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
      price: 49,
      renter: "Priya Sharma",
    },
  ];

  // Mock reviews data
  const reviews = [
    {
      id: "r1",
      rating: 5,
      comment: "Great experience! The camera was in perfect condition.",
      from: "Arjun M.",
      date: "2024-02-18",
    },
    {
      id: "r2",
      rating: 4,
      comment: "Very professional and punctual with delivery.",
      from: "Neha K.",
      date: "2024-02-12",
    },
  ];

  return (
    <Layout showSidebar={false}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="flex items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mr-6">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-600">
                  {user?.name?.[0]}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
              <p className="text-gray-600 mb-2">{user?.email}</p>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span className="font-medium">4.8</span>
                <span className="text-gray-500 ml-1">(32 reviews)</span>
              </div>
            </div>

            <motion.button
              className="ml-auto flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Settings size={16} className="mr-2" />
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <button
              onClick={() => setActiveTab("rentals")}
              className={`w-full flex items-center p-3 rounded-md text-left ${
                activeTab === "rentals"
                  ? "bg-pink-50 text-purple-600"
                  : "hover:bg-gray-50"
              }`}>
              <Package size={20} className="mr-3" />
              <span>Rentals</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`w-full flex items-center p-3 rounded-md text-left ${
                activeTab === "history"
                  ? "bg-pink-50 text-purple-600"
                  : "hover:bg-gray-50"
              }`}>
              <History size={20} className="mr-3" />
              <span>History</span>
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center p-3 rounded-md text-left ${
                activeTab === "payments"
                  ? "bg-pink-50 text-purple-600"
                  : "hover:bg-gray-50"
              }`}>
              <CreditCard size={20} className="mr-3" />
              <span>Payments</span>
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center p-3 rounded-md text-left ${
                activeTab === "notifications"
                  ? "bg-pink-50 text-purple-600"
                  : "hover:bg-gray-50"
              }`}>
              <Bell size={20} className="mr-3" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center p-3 rounded-md text-left ${
                activeTab === "security"
                  ? "bg-pink-50 text-purple-600"
                  : "hover:bg-gray-50"
              }`}>
              <Shield size={20} className="mr-3" />
              <span>Security</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center p-3 rounded-md text-left text-red-600 hover:bg-red-50">
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            {activeTab === "rentals" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Active Rentals</h2>
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <motion.div
                      key={rental.id}
                      className="bg-white rounded-lg shadow-sm p-4 flex"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}>
                      <img
                        src={rental.image}
                        alt={rental.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{rental.name}</h3>
                            <p className="text-sm text-gray-500">
                              {rental.type === "rented"
                                ? `Rented from ${rental.owner}`
                                : `Lent to ${rental.renter}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              Started:{" "}
                              {new Date(rental.date).toLocaleDateString()}
                            </p>
                          </div>

                          <div
                            className={`px-3 py-1 rounded-full text-sm ${
                              rental.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {rental.status}
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                          <p className="font-medium">
                            ₹ {rental.price} per week
                          </p>
                          <motion.button
                            className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      className="bg-white rounded-lg shadow-sm p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          from {review.from}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Rental History</h2>
                {/* Add rental history content */}
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
                {/* Add payments content */}
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Notification Settings
                </h2>
                {/* Add notifications content */}
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                {/* Add security content */}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
