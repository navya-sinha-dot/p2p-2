import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout/Layout";
import PopularCategories from "../components/home/PopularCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";

const Home = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <PopularCategories />
        <FeaturedProducts />
      </motion.div>
    </Layout>
  );
};

export default Home;
