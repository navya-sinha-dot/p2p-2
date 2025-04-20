import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  SlidersHorizontal,
  Map,
  Award,
  Star,
  Search,
  Heart,
  ChevronDown,
} from "lucide-react";
import Layout from "../components/layout/Layout";

const bookSubcategories = [
  "Reference Books (11-12th Std)",
  "College Books",
  "Fictional Books",
  "Non-Fictional Books",
  "Encyclopedias",
  "Research Books",
  "Mangas",
  "Magazines",
  "Children's Books",
  "Self-Help Books",
  "Biographies",
  "Poetry",
];

const booksData = [
  {
    id: "b1",
    name: "The Psychology of Money by Morgan Housel",
    price: 35,
    image: "/OIP (1).jpg",
    location: "Andheri, Mumbai",
    category: "Books",
    subcategory: "Non-Fictional Books",
    featured: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "b2",
    name: "Complete Reference for Computer Science (12th Std)",
    price: 49,
    image: "/OIP (2).jpg",
    location: "Bandra, Mumbai",
    category: "Books",
    subcategory: "Reference Books (11-12th Std)",
    bestseller: true,
    rating: 4.6,
    reviews: 87,
  },
  // ... add other book entries here
];

const BooksCategoryPage = () => {
  const navigate = useNavigate();
  const [showRentalFilter, setShowRentalFilter] = useState(false);
  const [showSubcategoryFilter, setShowSubcategoryFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showSortByFilter, setShowSortByFilter] = useState(false);
  const [rentalDuration, setRentalDuration] = useState("1 WEEK");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentFilter, setCurrentFilter] = useState(null);

  const closeAllFilters = () => {
    setShowRentalFilter(false);
    setShowSubcategoryFilter(false);
    setShowLocationFilter(false);
    setShowSortByFilter(false);
    setCurrentFilter(null);
  };

  const toggleFilter = (filterName) => {
    closeAllFilters();
    switch (filterName) {
      case "rental":
        setShowRentalFilter(!showRentalFilter);
        setCurrentFilter(showRentalFilter ? null : "rental");
        break;
      case "subcategory":
        setShowSubcategoryFilter(!showSubcategoryFilter);
        setCurrentFilter(showSubcategoryFilter ? null : "subcategory");
        break;
      case "location":
        setShowLocationFilter(!showLocationFilter);
        setCurrentFilter(showLocationFilter ? null : "location");
        break;
      case "sortby":
        setShowSortByFilter(!showSortByFilter);
        setCurrentFilter(showSortByFilter ? null : "sortby");
        break;
      default:
        break;
    }
  };

  const handlePriceRangeChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(event.target.value, 10);
    setPriceRange(newRange);
  };

  const handleSubcategoryToggle = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((item) => item !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const FilterButton = ({ label, isActive, onClick, icon }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
        isActive
          ? "bg-purple-100 text-purple-700 border border-purple-300"
          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      {label}
      <ChevronDown size={14} className="ml-1" />
    </button>
  );

  const BookCard = ({ book }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="relative">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-48 object-cover"
        />
        {book.featured && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs py-1 px-2 rounded-full">
            Featured
          </div>
        )}
        {book.bestseller && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Award size={12} className="mr-1" />
            Bestseller
          </div>
        )}
        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
          <Heart size={16} className="text-gray-500 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-medium text-base cursor-pointer hover:text-purple-600 line-clamp-2"
            onClick={() => navigate(`/product/${book.id}`)}
          >
            {book.name}
          </h3>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold text-purple-600">
            ₹{book.price}
          </span>
          <span className="text-gray-500 text-xs ml-1">per week</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-500 text-xs flex items-center">
            <Map size={12} className="mr-1" />
            {book.location}
          </p>
          <div className="flex items-center">
            <Star size={12} className="text-amber-500 mr-1" />
            <span className="text-xs font-medium">{book.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-3 py-1 px-2 bg-gray-50 rounded-md">
          {book.subcategory}
        </div>
        <div className="mt-auto pt-2">
          <motion.button
            onClick={() => navigate(`/product/${book.id}`)}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md text-sm font-medium flex justify-center items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Rent Now
            <ArrowRight size={14} className="ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout showSidebar={true}>
      <div className="flex-1 px-4 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Books</h1>
          <div className="text-sm text-gray-500">
            Find and rent a wide range of books from educational to
            entertainment
          </div>
        </div>

        {/* Filters UI */}
        <div className="sticky top-0 z-20 bg-gray-50 p-3 rounded-lg mb-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <SlidersHorizontal size={16} className="mr-1" /> FILTERS
          </div>
          <div className="flex flex-wrap gap-2 relative">
            <FilterButton
              label="RENTAL TYPE"
              isActive={currentFilter === "rental"}
              onClick={() => toggleFilter("rental")}
              icon={<Star size={14} className="mr-1" />}
            />
            <FilterButton
              label="SUB CATEGORY"
              isActive={currentFilter === "subcategory"}
              onClick={() => toggleFilter("subcategory")}
              icon={<Search size={14} className="mr-1" />}
            />
            <FilterButton
              label="LOCATION"
              isActive={currentFilter === "location"}
              onClick={() => toggleFilter("location")}
              icon={<Map size={14} className="mr-1" />}
            />
            <FilterButton
              label="TOP SELLERS"
              isActive={false}
              onClick={() => navigate("/books/top-sellers")}
              icon={<Award size={14} className="mr-1" />}
            />
            <FilterButton
              label="SORT BY"
              isActive={currentFilter === "sortby"}
              onClick={() => toggleFilter("sortby")}
              icon={<SlidersHorizontal size={14} className="mr-1" />}
            />
            {/* Filters dropdowns can be included here as needed */}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {booksData.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BooksCategoryPage;
