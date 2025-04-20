import React, { use, useEffect, useState } from "react";
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
import { useProducts } from "../hooks/useProducts";

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
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { products, loading } = useProducts();

  useEffect(() => {
    if (loading && !products) return;
    let bookks = products?.filter((book) => book.category === "books");
    setBooks(bookks);
    setFilteredBooks(bookks);
    console.log(products);

    return () => {
      setBooks([]);
      setFilteredBooks([]);
    };
  }, [products, loading]);

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

  const handleLocationToggle = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(
        selectedLocations.filter((item) => item !== location)
      );
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option);
    closeAllFilters();
  };

  const handleRentalSelect = (option) => {
    setRentalDuration(option);
    closeAllFilters();
  };

  const applyFilters = () => {
    let filtered = [...books];

    // Filter by subcategory
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedSubcategories.includes(book.subcategory)
      );
    }

    // Filter by location
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((book) =>
        selectedLocations.includes(book.location)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Apply sorting
    switch (selectedSortOption) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Highest Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Most Popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "Newest First":
        // Assuming newer items are at the beginning of the array
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
    closeAllFilters();
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
          <span className="text-gray-500 text-xs ml-1">
            per {rentalDuration.toLowerCase()}
          </span>
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
        <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-200 via-purple-100 to-indigo-100 p-3 rounded-lg mb-6 shadow-sm">
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

            {/* Filter modal container */}
            {(showRentalFilter ||
              showSubcategoryFilter ||
              showLocationFilter ||
              showSortByFilter) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-30 p-4 border border-gray-200">
                {/* Rental Filter */}
                {showRentalFilter && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Select Rental Duration
                    </h3>
                    <div className="space-y-2 mb-4">
                      {rentalOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleRentalSelect(option)}
                          className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                            rentalDuration === option
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {option}
                          {rentalDuration === option && (
                            <Check size={16} className="text-purple-600" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Price Range
                      </h3>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(e, 0)}
                          className="w-20 p-2 border border-gray-300 rounded text-sm"
                          min="0"
                          max={priceRange[1]}
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceRangeChange(e, 1)}
                          className="w-20 p-2 border border-gray-300 rounded text-sm"
                          min={priceRange[0]}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={applyFilters}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                )}

                {/* Subcategory Filter */}
                {showSubcategoryFilter && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Book Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {bookSubcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subcategory-${subcategory}`}
                            className="mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            checked={selectedSubcategories.includes(
                              subcategory
                            )}
                            onChange={() =>
                              handleSubcategoryToggle(subcategory)
                            }
                          />
                          <label
                            htmlFor={`subcategory-${subcategory}`}
                            className="text-sm text-gray-700"
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={applyFilters}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}

                {/* Location Filter */}
                {showLocationFilter && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Select Locations
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`location-${location}`}
                            className="mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            checked={selectedLocations.includes(location)}
                            onChange={() => handleLocationToggle(location)}
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="text-sm text-gray-700"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={applyFilters}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}

                {/* Sort By Filter */}
                {showSortByFilter && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">
                      Sort Results By
                    </h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSortOptionSelect(option)}
                          className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                            selectedSortOption === option
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {option}
                          {selectedSortOption === option && (
                            <Check size={16} className="text-purple-600" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={applyFilters}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedSubcategories.length > 0 ||
          selectedLocations.length > 0 ||
          selectedSortOption ||
          priceRange[0] > 0 ||
          priceRange[1] < 200) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedSubcategories.map((cat) => (
              <div
                key={cat}
                className="bg-purple-100 text-purple-700 text-xs py-1 px-2 rounded-full flex items-center"
              >
                {cat}
                <button
                  onClick={() => handleSubcategoryToggle(cat)}
                  className="ml-1 text-purple-500 hover:text-purple-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {selectedLocations.map((loc) => (
              <div
                key={loc}
                className="bg-purple-100 text-purple-700 text-xs py-1 px-2 rounded-full flex items-center"
              >
                {loc}
                <button
                  onClick={() => handleLocationToggle(loc)}
                  className="ml-1 text-purple-500 hover:text-purple-700"
                >
                  ×
                </button>
              </div>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 200) && (
              <div className="bg-purple-100 text-purple-700 text-xs py-1 px-2 rounded-full flex items-center">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
            )}
            {selectedSortOption && (
              <div className="bg-purple-100 text-purple-700 text-xs py-1 px-2 rounded-full flex items-center">
                {selectedSortOption}
              </div>
            )}
            <button
              onClick={() => {
                setSelectedSubcategories([]);
                setSelectedLocations([]);
                setPriceRange([0, 200]);
                setSelectedSortOption("Newest First");
                setFilteredBooks(books);
              }}
              className="text-xs text-gray-600 hover:text-gray-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {booksData.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No books found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedSubcategories([]);
                  setSelectedLocations([]);
                  setPriceRange([0, 200]);
                  setSelectedSortOption("Newest First");
                  setFilteredBooks(books);
                }}
                className="mt-2 text-purple-600 hover:text-purple-800"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BooksCategoryPage;
