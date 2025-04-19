import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetails";
import Chat from "./pages/Chat";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Calendar from "./pages/Calender";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </AnimatePresence>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
