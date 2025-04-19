import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/common/Logo";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-purple-300 py-3 px-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <motion.div
        className="text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}>
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          Share. Rent. Save.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}>
          Rent anything from your neighbors or share what you don't use daily.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}>
        <p className="text-sm text-gray-500">
          Redirecting to home page in a few seconds...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
