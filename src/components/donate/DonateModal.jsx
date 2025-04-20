import React, { useState, useRef } from "react";
import { X, Leaf, Camera, Upload, Plus } from "lucide-react";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

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

const DonateModal = () => {
  const {
    closeDonateModal,
    donateFormData,
    updateDonateFormData,
    resetDonateFormData,
  } = useUI();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const { user } = useAuth();

  // Create refs for the input elements
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Include the image in the form data
    const formDataWithImage = {
      ...donateFormData,
      image: image,
    };

    if (!user) {
      console.error("User is not authenticated");
      // Handle the case when user is not logged in
      return;
    }

    console.log("Submitted donation form data:", formDataWithImage);
    try {
      await axios.post(`http://localhost:3001/donate/${user.id}`, {
        name: donateFormData.itemName,
        description: donateFormData.description,
        image: uploadedUrl,
        category: donateFormData.category,
      });
    } catch (error) {
      console.error("Error submitting donation form:", error);
    }
    resetDonateFormData();
    closeDonateModal();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    if (!image) return alert("No image selected");

    try {
      const res = await axios.post(`http://localhost:3001/upload`, {
        image: image,
      });
      setUploadedUrl(res.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!image) return alert("No image selected");

    try {
      const res = await axios.post(`http://localhost:3001/upload`, {
        image: image,
      });
      setUploadedUrl(res.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Process the captured image or uploaded file
  const processImage = (file) => {
    if (!file) return;
    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);
    // Set the image
    setImage({ file, url: imageUrl });
    // Update the form data to indicate we have an image
    updateDonateFormData({
      ...donateFormData,
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
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  // Remove the current image
  const removeImage = () => {
    if (image && image.url) {
      URL.revokeObjectURL(image.url); // Clean up the object URL
    }
    setImage(null);
    updateDonateFormData({
      ...donateFormData,
      hasImages: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center border-b p-4 bg-green-600 text-white">
          <h3 className="text-lg font-medium">Donate an item</h3>
          <button
            onClick={closeDonateModal}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span className={step >= 1 ? "text-green-600 font-medium" : ""}>
              About Donations
            </span>
            <span className={step >= 2 ? "text-green-600 font-medium" : ""}>
              Category
            </span>
            <span className={step >= 3 ? "text-green-600 font-medium" : ""}>
              Details & Image
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Leaf className="text-green-600" size={24} />
                    </div>
                    <h4 className="text-lg font-medium text-green-800">Our Donation Drive</h4>
                  </div>
                  
                  <p className="text-green-800 mb-3">
                    Thank you for considering donating your items! Your generosity helps us build a stronger community.
                  </p>
                  
                  <p className="text-green-700 mb-3">
                    Instead of letting unused items collect dust or throwing them away, your donations will find new homes through our NGO partnerships, helping those in need.
                  </p>
                  
                  <p className="text-green-700 mb-3">
                    We carefully collect these items and work with trusted NGOs to ensure they reach people who will truly benefit from them.
                  </p>
                  
                  <div className="bg-white p-3 rounded-md border border-green-200 mt-4">
                    <h5 className="font-medium text-green-800 mb-2">How it works:</h5>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      <li>You donate items you no longer need</li>
                      <li>We arrange pick-up at your convenience</li>
                      <li>Items are distributed through our NGO partners</li>
                      <li>You receive updates on the impact of your donation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">What category is your donation?</h4>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`py-2 px-3 rounded-md border text-left transition-colors ${
                        donateFormData.category === category.id
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        updateDonateFormData({ category: category.id })
                      }
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Request to add a new category
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Donation details</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    value={donateFormData.itemName || ""}
                    onChange={(e) =>
                      updateDonateFormData({ itemName: e.target.value })
                    }
                    placeholder="e.g. Winter Jacket"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    rows={3}
                    value={donateFormData.description || ""}
                    onChange={(e) =>
                      updateDonateFormData({ description: e.target.value })
                    }
                    placeholder="Describe your item, include details about condition, size, etc."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload image
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
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                          >
                            Capture Photo
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : uploadedUrl ? (
                    <div className="border-2 border-gray-300 p-4 rounded-md">
                      <div className="relative">
                        <img
                          src={uploadedUrl}
                          alt="Donation item"
                          className="w-full h-64 object-contain rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-green-600 mt-2 text-center">
                        Image uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 flex space-x-3">
                          <button
                            type="button"
                            onClick={handleCameraCapture}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md text-sm"
                          >
                            <Camera size={16} className="mr-2" />
                            Take photo
                          </button>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="flex items-center px-2 py-2 bg-gray-200 text-gray-700 rounded-md text-sm w-22"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Upload a single image of your donation item
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
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4 flex justify-between bg-gray-50">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={closeDonateModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Donate Item
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateModal;