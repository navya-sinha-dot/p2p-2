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

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-purple-50 pb-10 flex space-x-4 mt-2 sm:mt-0">
        {/* Profile Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Info */}
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-32 h-32 border-2 border-purple-300 rounded-full overflow-hidden">
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {user?.name}
                  </h1>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>USER VERIFIED WITH</span>
                    <div className="flex items-center gap-2">
                      <div className="w-15 h-15 rounded-full overflow-hidden">
                        <img
                          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                          alt="Google"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
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

                  <div className="mt-4 flex gap-4">
                    <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                      EDIT PROFILE
                    </button>
                    <button
                      className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => logout()}>
                      LOG OUT
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Charts */}
              <div className="md:ml-auto w-full md:w-96 bg-white rounded-lg p-4 shadow-sm">
                <div className="mb-4">
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
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border border-gray-200 rounded-lg overflow-hidden">
            <button className="py-3 px-4 bg-gray-100 text-purple-700 font-medium hover:bg-gray-200 transition-colors">
              MY LISTINGS
            </button>
            <button className="py-3 px-4 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors">
              MY RENTALS
            </button>
            <button className="py-3 px-4 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors">
              BUY BUSINESS PACKAGES
            </button>
            <button className="py-3 px-4 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors">
              RATINGS AND REVIEWS
            </button>
            <button className="py-3 px-4 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors">
              HELP
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 mb-4">
              <img
                src="https://thumbs.dreamstime.com/b/confused-man-sitting-desk-computer-shopping-cart-flat-vector-illustration-beard-looks-puzzled-typing-his-365405750.jpg"
                alt="No listings"
                className="w-full h-full object-contain rounded-3xl"
              />
            </div>
            <p className="text-gray-600 mb-6">
              YOU HAVEN'T LISTED ANYTHING YET
            </p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              START SELLING
            </button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ProfilePage;
