import React, { useState } from "react";
import { X, Camera, Upload, Plus } from "lucide-react";
import { useUI } from "../../context/UIContext";

const categories = [
  { id: "books", name: "Books" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "electronics", name: "Electronics & Gadgets" },
  { id: "tech", name: "Tech Accessories" },
  { id: "apparel", name: "Apparel & Fashion" },
  { id: "fitness", name: "Fitness & Sports Gear" },
  { id: "event", name: "Event & Party Supplies" },
  { id: "travel", name: "Travel & Lifestyle Gear" },
  { id: "furniture", name: "Furniture" },
];

const SellModal = () => {
  const {
    closeSellModal,
    sellFormData,
    updateSellFormData,
    resetSellFormData,
  } = useUI();
  const [step, setStep] = useState(1);
  const [imageCount, setImageCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", sellFormData);
    resetSellFormData();
    closeSellModal();
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const addImage = () => {
    // Simply increment the counter as a placeholder for real image upload
    setImageCount(imageCount + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center border-b p-4 bg-pink-600 text-white">
          <h3 className="text-lg font-medium">List an item for rent</h3>
          <button
            onClick={closeSellModal}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1">
            <X size={20} />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-600 h-2 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span className={step >= 1 ? "text-pink-600 font-medium" : ""}>
              Category
            </span>
            <span className={step >= 2 ? "text-pink-600 font-medium" : ""}>
              Details
            </span>
            <span className={step >= 3 ? "text-pink-600 font-medium" : ""}>
              Pricing & Images
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">
                  What category is your item?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`py-2 px-3 rounded-md border text-left transition-colors ${
                        sellFormData.category === category.id
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        updateSellFormData({ category: category.id })
                      }>
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    className="text-sm text-pink-600 hover:text-pink-800 flex items-center">
                    <Plus size={16} className="mr-1" />
                    Request to add a new category
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Item details</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    value={sellFormData.itemName || ""}
                    onChange={(e) =>
                      updateSellFormData({ itemName: e.target.value })
                    }
                    placeholder="e.g. Professional DSLR Camera Kit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    rows={3}
                    value={sellFormData.description || ""}
                    onChange={(e) =>
                      updateSellFormData({ description: e.target.value })
                    }
                    placeholder="Describe your item, include details about condition, specifications, etc."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How old is this item?
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    value={sellFormData.age || ""}
                    onChange={(e) =>
                      updateSellFormData({ age: e.target.value })
                    }>
                    <option value="">Select age</option>
                    <option value="less-than-1">Less than 1 month</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="1-2">1-2 years</option>
                    <option value="more-than-2">More than 2 years</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Pricing & Images</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rental price (₹ per week)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        value={sellFormData.price || ""}
                        onChange={(e) =>
                          updateSellFormData({
                            price: e.target.value
                              ? parseInt(e.target.value)
                              : "",
                          })
                        }
                        placeholder="e.g. 499"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Security deposit (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        value={sellFormData.deposit || ""}
                        onChange={(e) =>
                          updateSellFormData({
                            deposit: e.target.value
                              ? parseInt(e.target.value)
                              : "",
                          })
                        }
                        placeholder="e.g. 2000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload images
                  </label>

                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex space-x-3">
                        <button
                          type="button"
                          onClick={addImage}
                          className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md text-sm">
                          <Camera size={16} className="mr-2" />
                          Take photos
                        </button>

                        <button
                          type="button"
                          onClick={addImage}
                          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm">
                          <Upload size={16} className="mr-2" />
                          Upload
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Drag and drop images here or use the buttons above
                      </p>
                    </div>
                  </div>

                  {/* Simple image counter instead of previews */}
                  {imageCount > 0 && (
                    <div className="mt-4">
                      <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                        <p className="font-medium flex items-center">
                          <Check size={16} className="mr-2" />
                          {imageCount} {imageCount === 1 ? "image" : "images"}{" "}
                          added successfully
                        </p>
                        <p className="text-sm mt-1">
                          Your images will be reviewed and attached to your
                          listing
                        </p>
                        <button
                          onClick={addImage}
                          className="mt-2 text-sm flex items-center text-pink-600 hover:text-pink-800">
                          <Plus size={14} className="mr-1" />
                          Add more images
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return policy
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    rows={2}
                    value={sellFormData.returnPolicy || ""}
                    onChange={(e) =>
                      updateSellFormData({ returnPolicy: e.target.value })
                    }
                    placeholder="Describe your return policy, conditions, etc."></textarea>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4 flex justify-between bg-gray-50">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={closeSellModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                List item
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellModal;

// Don't forget to add this component
function Check(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
