import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, SlidersHorizontal, Map, Award, Star, Search, Heart, ChevronDown } from "lucide-react";
import Layout from "../components/layout/Layout";

// Book subcategories
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
  "Poetry"
];

// Sample book data
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
  {
    id: "b3",
    name: "Harry Potter Complete Collection (7 Books)",
    price: 75,
    image: "/download (1).jpg",
    location: "Dadar, Mumbai",
    category: "Books",
    subcategory: "Fictional Books",
    bestseller: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "b4",
    name: "Introduction to Business Management (BBA)",
    price: 40,
    image: "/OIP (3).jpg",
    location: "Powai, Mumbai",
    category: "Books",
    subcategory: "College Books",
    rating: 4.2,
    reviews: 45,
  },
  {
    id: "b5",
    name: "Naruto Complete Manga Collection (Vol 1-20)",
    price: 85,
    image: "/OIP (4).jpg",
    location: "Juhu, Mumbai",
    category: "Books",
    subcategory: "Mangas",
    rating: 4.7,
    reviews: 92,
  },
  {
    id: "b6",
    name: "Oxford English Dictionary (Latest Edition)",
    price: 55,
    image: "/download.jpg",
    location: "Colaba, Mumbai",
    category: "Books",
    subcategory: "Reference Books",
    rating: 4.3,
    reviews: 36,
  },
  {
    id: "b7",
    name: "National Geographic Magazine Collection (2023)",
    price: 60,
    image: "/OIP (5).jpg",
    location: "Malad, Mumbai",
    category: "Books",
    subcategory: "Magazines",
    rating: 4.4,
    reviews: 28,
  },
  {
    id: "b8",
    name: "Machine Learning & AI Research Papers Compilation",
    price: 70,
    image: "/OIP (6).jpg",
    location: "Worli, Mumbai",
    category: "Books",
    subcategory: "Research Books",
    bestseller: true,
    rating: 4.8,
    reviews: 64,
  },
  {
    id: "b9",
    name: "Complete NEET Guide (PCB) with Previous Year Papers",
    price: 65,
    image: "https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg",
    location: "Versova, Mumbai",
    category: "Books",
    subcategory: "Reference Books (11-12th Std)",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "b10",
    name: "World Encyclopedia Set (5 Volumes)",
    price: 120,
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg",
    location: "Lower Parel, Mumbai",
    category: "Books",
    subcategory: "Encyclopedias",
    featured: true,
    rating: 4.7,
    reviews: 43,
  },
  {
    id: "b11",
    name: "Atomic Habits by James Clear",
    price: 30,
    image: "https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg",
    location: "Bandra, Mumbai",
    category: "Books",
    subcategory: "Self-Help Books",
    bestseller: true,
    rating: 4.9,
    reviews: 278,
  },
  {
    id: "b12",
    name: "The Alchemist by Paulo Coelho",
    price: 25,
    image: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg",
    location: "Goregaon, Mumbai",
    category: "Books",
    subcategory: "Fictional Books",
    rating: 4.6,
    reviews: 198,
  },
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
    
    switch(filterName) {
      case 'rental':
        setShowRentalFilter(!showRentalFilter);
        setCurrentFilter(showRentalFilter ? null : 'rental');
        break;
      case 'subcategory':
        setShowSubcategoryFilter(!showSubcategoryFilter);
        setCurrentFilter(showSubcategoryFilter ? null : 'subcategory');
        break;
      case 'location':
        setShowLocationFilter(!showLocationFilter);
        setCurrentFilter(showLocationFilter ? null : 'location');
        break;
      case 'sortby':
        setShowSortByFilter(!showSortByFilter);
        setCurrentFilter(showSortByFilter ? null : 'sortby');
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
      setSelectedSubcategories(selectedSubcategories.filter(item => item !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const BookCard = ({ book }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
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
            <Award size={12} className="mr-1" /> Bestseller
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
            onClick={() => navigate(`/product/${book.id}`)}>
            {book.name}
          </h3>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold text-purple-600">₹{book.price}</span>
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
            whileTap={{ scale: 0.98 }}>
            Rent Now
            <ArrowRight size={14} className="ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const FilterButton = ({ label, isActive, onClick, icon }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
        isActive ? 'bg-purple-100 text-purple-700 border border-purple-300' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}>
      {icon}
      {label}
      <ChevronDown size={14} className="ml-1" />
    </button>
  );

  return (
    <Layout showSidebar={true}>
      <div className="flex-1 px-4 py-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Books</h1>
          <div className="text-sm text-gray-500">
            Find and rent a wide range of books from educational to entertainment
          </div>
        </div>

        {/* Filter row */}
        <div className="sticky top-0 z-20 bg-gray-50 p-3 rounded-lg mb-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <SlidersHorizontal size={16} className="mr-1" />
            FILTERS
          </div>
          <div className="flex flex-wrap gap-2 relative">
            <FilterButton 
              label="RENTAL TYPE" 
              isActive={currentFilter === 'rental'}
              onClick={() => toggleFilter('rental')}
              icon={<Star size={14} className="mr-1" />}
            />
            
            <FilterButton 
              label="SUB CATEGORY" 
              isActive={currentFilter === 'subcategory'}
              onClick={() => toggleFilter('subcategory')}
              icon={<Search size={14} className="mr-1" />}
            />
            
            <FilterButton 
              label="LOCATION" 
              isActive={currentFilter === 'location'}
              onClick={() => toggleFilter('location')}
              icon={<Map size={14} className="mr-1" />}
            />
            
            <FilterButton 
              label="TOP SELLERS" 
              isActive={false}
              onClick={() => navigate('/books/top-sellers')}
              icon={<Award size={14} className="mr-1" />}
            />
            
            <FilterButton 
              label="SORT BY" 
              isActive={currentFilter === 'sortby'}
              onClick={() => toggleFilter('sortby')}
              icon={<SlidersHorizontal size={14} className="mr-1" />}
            />
            
            {/* Rental Type Filter Dropdown */}
            {showRentalFilter && (
              <div className="absolute top-12 left-0 z-30 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-64">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">DURATION</label>
                  <div className="flex gap-2">
                    {["1 WEEK", "2 WEEK", "MONTH"].map((duration) => (
                      <button
                        key={duration}
                        className={`px-3 py-1 text-xs rounded-full ${
                          rentalDuration === duration
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setRentalDuration(duration)}>
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">DATE</label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm w-full"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="mx-2">-</span>
                    <input
                      type="date"
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm w-full"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PRICE RANGE</label>
                  <div className="mb-2 flex justify-between text-xs text-gray-500">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full accent-purple-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full accent-purple-600"
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  <button 
                    className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm"
                    onClick={() => closeAllFilters()}>
                    Apply
                  </button>
                </div>
              </div>
            )}
            
            {/* Subcategory Filter Dropdown */}
            {showSubcategoryFilter && (
              <div className="absolute top-12 left-0 z-30 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-72">
                <h3 className="font-medium text-sm mb-2">Select Subcategories</h3>
                <div className="max-h-60 overflow-y-auto">
                  {bookSubcategories.map((subcategory) => (
                    <div key={subcategory} className="mb-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-purple-600"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => handleSubcategoryToggle(subcategory)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{subcategory}</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button 
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => setSelectedSubcategories([])}>
                    Clear All
                  </button>
                  <button 
                    className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm"
                    onClick={() => closeAllFilters()}>
                    Apply
                  </button>
                </div>
              </div>
            )}
            
            {/* Location Filter Dropdown */}
            {showLocationFilter && (
              <div className="absolute top-12 left-0 z-30 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-64">
                <h3 className="font-medium text-sm mb-2">Select Location</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {["Andheri", "Bandra", "Colaba", "Dadar", "Juhu", "Lower Parel", "Malad", "Powai", "Versova", "Worli"].map((location) => (
                    <div key={location} className="mb-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="location"
                          className="form-radio h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{location}, Mumbai</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button 
                    className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm"
                    onClick={() => closeAllFilters()}>
                    Apply
                  </button>
                </div>
              </div>
            )}
            
            {/* Sort By Filter Dropdown */}
            {showSortByFilter && (
              <div className="absolute top-12 right-0 z-30 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-56">
                <h3 className="font-medium text-sm mb-2">Sort By</h3>
                {["Recommended", "Price: Low to High", "Price: High to Low", "Newest First", "Rating", "Distance"].map((sortOption) => (
                  <div key={sortOption} className="mb-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        className="form-radio h-4 w-4 text-purple-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sortOption}</span>
                    </label>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <button 
                    className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm"
                    onClick={() => closeAllFilters()}>
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {booksData.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Prev</button>
            <button className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm">1</button>
            <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">2</button>
            <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Next</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BooksCategoryPage;