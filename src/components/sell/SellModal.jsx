import React, { useState, useRef } from "react";
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
  const [images, setImages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  // Create refs for the input elements
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include the images in the form data
    const formDataWithImages = {
      ...sellFormData,
      images: images,
    };
    console.log("Submitted form data:", formDataWithImages);
    resetSellFormData();
    closeSellModal();
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // Function to start the camera
  const handleCameraCapture = () => {
    setShowCamera(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request camera access
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Store the stream reference to stop it later if needed
          streamRef.current = stream;

          // Display camera feed in the video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Camera access error:", error);
          alert(
            "Unable to access camera. Please check your device permissions."
          );
        });
    } else {
      alert("Your browser doesn't support camera access.");
    }
  };

  // Function to stop the camera when needed
  const stopCamera = () => {
    setShowCamera(false);
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Function to capture a photo from the video stream
  const capturePhoto = () => {
    if (videoRef.current && streamRef.current) {
      // Create a canvas element to capture the current frame
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        // Create a File object from the Blob
        const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        processImage(file);
        stopCamera();
      }, "image/jpeg");
    }
  };

  // Handle file upload
  const handleFileUpload = () => {
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Process the captured image or uploaded file
  const processImage = (file) => {
    if (!file) return;

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);

    // Add the new image to the images array
    setImages((prev) => [...prev, { file, url: imageUrl }]);

    // Increment the image count
    setImageCount((prevCount) => prevCount + 1);

    // Update the form data with these images
    updateSellFormData({
      ...sellFormData,
      hasImages: true,
    });
  };

  // Handle camera input change
  const handleCameraInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Process each file
      Array.from(e.target.files).forEach((file) => {
        processImage(file);
      });
    }
  };

  // Add more images function
  const addImage = () => {
    handleFileUpload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center border-b p-4 bg-purple-600 text-white">
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
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span className={step >= 1 ? "text-purple-600 font-medium" : ""}>
              Category
            </span>
            <span className={step >= 2 ? "text-purple-600 font-medium" : ""}>
              Details
            </span>
            <span className={step >= 3 ? "text-purple-600 font-medium" : ""}>
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
                          ? "border-purple-500 bg-purple-50 text-purple-700"
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
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
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
                        className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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

                  {showCamera ? (
                    <div className="border-2 border-gray-300 p-4 rounded-md">
                      <div className="relative">
                        <video
                          ref={videoRef}
                          className="w-full h-64 bg-black rounded-md"
                          autoPlay
                          playsInline
                        />
                        <div className="mt-3 flex justify-center space-x-3">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="px-4 py-2 bg-green-600 text-white rounded-md">
                            Capture Photo
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 flex space-x-3">
                          <button
                            type="button"
                            onClick={handleCameraCapture}
                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md text-sm">
                            <Camera size={16} className="mr-2" />
                            Take photos
                          </button>

                          <button
                            type="button"
                            onClick={handleFileUpload}
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
                  )}

                  {/* Hidden inputs for camera and file upload */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraInputChange}
                    className="hidden"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

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
                          type="button"
                          onClick={addImage}
                          className="mt-2 text-sm flex items-center text-purple-600 hover:text-purple-800">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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

            {step <= 3 ? (
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
      </div>
    </div>
  );
};

// Check component definition
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

export default SellModal;
