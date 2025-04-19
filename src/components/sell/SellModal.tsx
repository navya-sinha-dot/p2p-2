import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Upload } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25 } },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden">
        <motion.div
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-medium">List an item for rent</h3>
            <button
              onClick={closeSellModal}
              className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
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
                      <motion.button
                        key={category.id}
                        type="button"
                        className={`py-2 px-3 rounded-md border text-left transition-colors ${
                          sellFormData.category === category.id
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          updateSellFormData({ category: category.id })
                        }>
                        {category.name}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="text-sm text-purple-600 hover:text-purple-800">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={sellFormData.itemName}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      value={sellFormData.description}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={sellFormData.age}
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
                  <h4 className="font-medium text-gray-700">
                    Pricing & Images
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rental price (₹ per week)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={sellFormData.price || ""}
                        onChange={(e) =>
                          updateSellFormData({
                            price: parseInt(e.target.value),
                          })
                        }
                        placeholder="e.g. 499"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Security deposit (₹)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={sellFormData.deposit || ""}
                        onChange={(e) =>
                          updateSellFormData({
                            deposit: parseInt(e.target.value),
                          })
                        }
                        placeholder="e.g. 2000"
                      />
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
                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md text-sm">
                            <Camera size={16} className="mr-2" />
                            Take photos
                          </button>

                          <button
                            type="button"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return policy
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={2}
                      value={sellFormData.returnPolicy}
                      onChange={(e) =>
                        updateSellFormData({ returnPolicy: e.target.value })
                      }
                      placeholder="Describe your return policy, conditions, etc."></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md">
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeSellModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md">
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                  List item
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SellModal;
