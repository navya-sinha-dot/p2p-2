import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function DonationPopup({ onClose }) {
  //const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Clothing",
    "Food",
    "Books",
    "Toys",
    "Electronics",
    "Furniture",
  ];

  const handleOpenPopup = () => {
    //setIsOpen(true);
    setCurrentStep(0);
    setSelectedCategory("");
    setProductName("");
    setProductDescription("");
    setSubmitted(false);
  };

  const handleClosePopup = () => {
    onClose();
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form logic would go here
      setSubmitted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    if (submitted) {
      return (
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="bg-purple-100 p-8 rounded-full mb-4">
            <Heart size={64} className="text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">Thank You!</h2>
          <p className="text-center mb-4">
            Your donation information has been submitted successfully. Your
            generosity will make a difference in someone's life.
          </p>
          <p className="text-center text-sm text-gray-600">
            You will receive a confirmation email with details about your
            donation and next steps.
          </p>
          <button
            onClick={handleClosePopup}
            className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-md font-medium hover:bg-purple-600 transition-colors">
            Close
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Why We Donate</h2>
            <p className="mb-3">
              Your donations help make a real difference in our community. We
              believe in giving back and ensuring that useful items find new
              homes rather than being discarded.
            </p>
            <h3 className="text-lg font-semibold mb-2">Our NGO Partners</h3>
            <p className="mb-3">
              We work with several reputable organizations including:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-1">
                Hope Foundation - supporting homeless families
              </li>
              <li className="mb-1">
                Kids First - providing essentials for children in need
              </li>
              <li className="mb-1">
                Community Care - helping elderly and disabled individuals
              </li>
            </ul>
            <p>
              100% of your donations go directly to people in need, and you'll
              receive updates about the impact of your contribution.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Select a Category</h2>
            <p className="mb-4">
              Please select the category that best describes your donation:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`p-3 border rounded-md ${
                    selectedCategory === category
                      ? "bg-purple-200 border-purple-500"
                      : "border-gray-300 hover:bg-purple-50"
                  }`}
                  onClick={() => setSelectedCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            {!selectedCategory && (
              <p className="text-red-500 mt-3 text-sm">
                Please select a category to continue
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2 font-medium">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productDescription"
                className="block mb-2 font-medium">
                Product Description
              </label>
              <textarea
                id="productDescription"
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Provide details about condition, size, age, etc."
              />
            </div>
            {(!productName || !productDescription) && (
              <p className="text-red-500 text-sm">
                Please complete all fields to continue
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !selectedCategory) return true;
    if (currentStep === 2 && (!productName || !productDescription)) return true;
    return false;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-purple-100 rounded-lg">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-purple-100 rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-200">
            <div className="flex items-center">
              <span className="font-bold text-lg">Donation Process</span>
              {!submitted && (
                <span className="ml-3 text-gray-500 text-sm">
                  Step {currentStep + 1} of 3
                </span>
              )}
            </div>
            <button
              onClick={handleClosePopup}
              className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* Step indicator */}
          {!submitted && (
            <div className="flex justify-between px-6 pt-4">
              {[0, 1, 2].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep
                        ? "bg-purple-500 text-white"
                        : "bg-purple-200 text-purple-600"
                    }`}>
                    {step + 1}
                  </div>
                  <span className="text-xs mt-1">
                    {step === 0
                      ? "Why We Donate"
                      : step === 1
                      ? "Category"
                      : "Details"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="min-h-64">{renderStepContent()}</div>

          {/* Footer */}
          {!submitted && (
            <div className="flex justify-between p-4 border-t border-purple-200">
              <button
                onClick={handlePrevStep}
                className={`px-4 py-2 flex items-center ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-purple-500 hover:text-purple-700"
                }`}
                disabled={currentStep === 0}>
                <ChevronLeft size={16} className="mr-1" />
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={isNextDisabled()}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isNextDisabled()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}>
                {currentStep === 2 ? "Submit" : "Next"}
                {currentStep !== 2 && (
                  <ChevronRight size={16} className="ml-1" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
