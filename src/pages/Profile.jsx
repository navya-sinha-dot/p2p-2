"use client";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfilePage = () => {
  // Activity data for charts
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rental Activity",
        data: [3, 5, 2, 8, 6, 7],
        borderColor: "#8b5cf6", // purple-500
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: ["Listed", "Rented", "Returned", "Reviewed"],
    datasets: [
      {
        label: "Item Status",
        data: [12, 8, 6, 4],
        backgroundColor: "#6d28d9", // purple-700
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Activity Overview",
        color: "#6d28d9",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const { user, logout } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-purple-50 pb-12 flex flex-col mt-2 sm:mt-0"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="bg-white shadow-md rounded-lg mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Info */}
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 border-4 border-purple-300 rounded-full overflow-hidden shadow-md"
                >
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {user?.name}
                  </h1>

                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-purple-50 px-4 py-2 rounded-lg">
                    <span className="font-medium">USER VERIFIED WITH</span>
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        className="w-16 h-6 overflow-hidden"
                      >
                        <img
                          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                          alt="Google"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="px-6 py-2 border-2 border-purple-400 rounded-full text-purple-700 font-medium hover:bg-purple-100 transition-colors shadow-sm"
                    >
                      EDIT PROFILE
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="px-6 py-2 border-2 border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm"
                      onClick={() => logout()}
                    >
                      LOG OUT
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Activity Charts */}
              <motion.div
                variants={itemVariants}
                className="md:ml-auto w-full md:w-96 bg-white rounded-xl p-5 shadow-md border border-purple-100"
              >
                <div className="mb-6">
                  <Line
                    data={lineChartData}
                    options={chartOptions}
                    height={100}
                  />
                </div>
                <div>
                  <Bar
                    data={barChartData}
                    options={chartOptions}
                    height={100}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Profile Navigation */}
        <motion.div
          variants={itemVariants}
          className="mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl mt-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 border-2 border-purple-200 rounded-xl overflow-hidden shadow-md">
            <motion.button
              whileHover={{ backgroundColor: "#EDE9FE" }}
              className="py-4 px-4 bg-purple-100 text-purple-700 font-semibold transition-colors"
            >
              MY LISTINGS
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#EDE9FE" }}
              className="py-4 px-4 bg-white text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
            >
              MY RENTALS
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#EDE9FE" }}
              className="py-4 px-4 bg-white text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
            >
              BUY BUSINESS PACKAGES
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#EDE9FE" }}
              className="py-4 px-4 bg-white text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
            >
              RATINGS AND REVIEWS
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#EDE9FE" }}
              className="py-4 px-4 bg-white text-gray-700 font-semibold hover:bg-purple-50 transition-colors"
            >
              HELP
            </motion.button>
          </div>
        </motion.div>

        {/* Empty State */}
        <motion.div
          variants={itemVariants}
          className="mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl mt-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md border border-purple-100"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 mb-6 bg-purple-100 p-4 rounded-full"
            >
              <img
                src="https://thumbs.dreamstime.com/b/confused-man-sitting-desk-computer-shopping-cart-flat-vector-illustration-beard-looks-puzzled-typing-his-365405750.jpg"
                alt="No listings"
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>
            <p className="text-gray-600 mb-8 mx-4 font-medium">
              YOU HAVEN'T LISTED ANYTHING YET
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/home")}
              className="px-8 py-3 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors shadow-lg"
            >
              START SELLING
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ProfilePage;
