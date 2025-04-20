import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import PopularCategories from "../components/home/PopularCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {
  return (
    <div className="text-lg font-bold mb-2 sm:mb-0">
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <PopularCategories />
          <FeaturedProducts />
        </motion.div>
      </Layout>
    </div>
  );
};

export default Home;
