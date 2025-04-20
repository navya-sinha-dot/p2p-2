import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Map,
  Calendar,
  Star,
  Clock,
  Heart,
  Share2,
  Award,
  X,
  Bookmark,
  User,
  AlertCircle,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// This function would typically fetch data based on the product ID
const getBookById = (id) => {
  // This is sample data - in a real application, you would fetch this from your API
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
      condition: "Like New",
      age: "6 months old",
      owner: "Rahul Sharma",
      ownerRating: 4.9,
      description:
        "Timeless lessons on wealth, greed, and happiness. The Psychology of Money explores how money moves around in an economy and how people's behavior impacts everything. Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
      additionalImages: ["/OIP (1)_1.jpg", "/OIP (1)_2.jpg", "/OIP (1)_3.jpg"],
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
      condition: "Good",
      age: "1 year old",
      owner: "Priya Patel",
      ownerRating: 4.7,
      description:
        "The ultimate reference guide for 12th standard Computer Science students. Covers all topics in the curriculum with detailed explanations, diagrams, and practice problems. Includes sections on programming in C++, data structures, database management systems, and computer networks.",
      additionalImages: ["/OIP (2)_1.jpg", "/OIP (2)_2.jpg"],
    },
    {
      id: "b3",
      name: "Harry Potter Complete Collection (7 Books)",
      price: 75,
      image: "/OIP (7).jpg",
      location: "Dadar, Mumbai",
      category: "Books",
      subcategory: "Fictional Books",
      bestseller: true,
      rating: 4.9,
      reviews: 312,
      condition: "Very Good",
      age: "3 years old",
      owner: "Aditya Mehta",
      ownerRating: 4.8,
      description:
        "The complete magical journey of Harry Potter in this 7-book collection by J.K. Rowling. Follow Harry from his first days at Hogwarts School of Witchcraft and Wizardry to his final battle with Lord Voldemort. This collection includes all seven books in the series: Philosopher's Stone, Chamber of Secrets, Prisoner of Azkaban, Goblet of Fire, Order of the Phoenix, Half-Blood Prince, and Deathly Hallows.",
    },
    // Add other book data here...
  ];

  return booksData.find((book) => book.id === id) || null;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBookById(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState(
    Math.floor(book?.price * 0.8) || 0
  );
  const [rentalDuration, setRentalDuration] = useState("1 Week");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If book not found
  if (!book) {
    return (
      <Layout showSidebar={true}>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AlertCircle size={48} className="text-purple-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <button
            onClick={() => navigate("/books")}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Books
          </button>
        </div>
      </Layout>
    );
  }

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? book.additionalImages?.length || 0 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === (book.additionalImages?.length || 0) ? 0 : prev + 1
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const openOfferModal = () => {
    setShowOfferModal(true);
  };

  const closeOfferModal = () => {
    setShowOfferModal(false);
  };

  const handleSubmitOffer = () => {
    // Handle the submission of the offer
    alert(
      `Offer of ₹${offerPrice} for ${rentalDuration} submitted successfully!`
    );
    closeOfferModal();
  };

  const allImages = [book.image, ...(book.additionalImages || [])];

  return (
    <Layout showSidebar={true}>
      <div className="flex-1 p-4 md:p-6 bg-gray-50">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button
            onClick={() => navigate("/books")}
            className="flex items-center hover:text-purple-600"
          >
            <ArrowLeft size={14} className="mr-1" />
            Back to Books
          </button>
          <span className="mx-2">/</span>
          <span>{book.subcategory}</span>
          <span className="mx-2">/</span>
          <span className="text-purple-600">{book.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Product Images */}
            <div className="w-full lg:w-2/5">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <motion.img
                  key={selectedImage}
                  src={allImages[selectedImage]}
                  alt={book.name}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}

                {book.featured && (
                  <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs py-1 px-3 rounded-full">
                    Featured
                  </div>
                )}
                {book.bestseller && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs py-1 px-3 rounded-full flex items-center">
                    <Award size={12} className="mr-1" /> Bestseller
                  </div>
                )}
              </div>

              {/* Thumbnail gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                        selectedImage === index
                          ? "border-purple-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${book.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Product Info */}
            <div className="w-full lg:w-3/5">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {book.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={toggleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isWishlisted
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Star size={16} className="text-amber-500 mr-1" />
                <span className="font-medium mr-1">{book.rating}</span>
                <span className="text-gray-500 text-sm">
                  ({book.reviews} reviews)
                </span>
              </div>

              <div className="text-2xl font-bold text-purple-600 mb-4">
                ₹{book.price}{" "}
                <span className="text-sm font-normal text-gray-500">
                  per week
                </span>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-purple-700 mb-2">
                  About this item
                </h3>
                <p className="text-gray-700 mb-4">{book.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Age</div>
                      <div className="font-medium">{book.age}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Bookmark size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Condition</div>
                      <div className="font-medium">{book.condition}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Map size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-medium">{book.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Calendar size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Category</div>
                      <div className="font-medium">{book.subcategory}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner info */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                  <User size={24} className="text-purple-700" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Rented by {book.owner}
                  </div>
                  <div className="flex items-center text-sm">
                    <Star size={14} className="text-amber-500 mr-1" />
                    <span>{book.ownerRating}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">Trusted Renter</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md text-base font-medium flex justify-center items-center"
                  onClick={async () => {
                    const res = await fetch(
                      "http://localhost:3001/create-checkout-session",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      }
                    );

                    const data = await res.json();
                    const stripe = await stripePromise;
                    await stripe.redirectToCheckout({ sessionId: data.id });
                  }}
                >
                  Rent Now
                  <ArrowRight size={18} className="ml-2" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-md text-base font-medium hover:bg-purple-50"
                  onClick={openOfferModal}
                >
                  Make an Offer
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Make an Offer Modal */}
        <AnimatePresence>
          {showOfferModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-md"
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-bold text-lg">Make an Offer</h3>
                  <button
                    onClick={closeOfferModal}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Offer Price (per week)
                    </label>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>₹{Math.floor(book.price * 0.5)}</span>
                        <span>₹{book.price}</span>
                      </div>
                      <input
                        type="range"
                        min={Math.floor(book.price * 0.5)}
                        max={book.price}
                        value={offerPrice}
                        onChange={(e) =>
                          setOfferPrice(parseInt(e.target.value))
                        }
                        className="w-full accent-purple-600"
                      />
                    </div>
                    <div className="text-center text-xl font-bold text-purple-600">
                      ₹{offerPrice}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Duration
                    </label>
                    <div className="flex gap-2">
                      {["1 Week", "2 Weeks", "1 Month"].map((duration) => (
                        <button
                          key={duration}
                          className={`flex-1 py-2 px-3 text-sm rounded-md ${
                            rentalDuration === duration
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => setRentalDuration(duration)}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Price per week</span>
                      <span className="font-medium">₹{offerPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{rentalDuration}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-purple-200 mt-2">
                      <span className="font-medium">Total amount</span>
                      <span className="font-bold text-purple-600">
                        ₹
                        {offerPrice *
                          (rentalDuration === "1 Week"
                            ? 1
                            : rentalDuration === "2 Weeks"
                            ? 2
                            : 4)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={closeOfferModal}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitOffer}
                      className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md hover:from-purple-700 hover:to-purple-800"
                    >
                      Submit Offer
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
