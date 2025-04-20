import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const Failure = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Set up the redirect
    const timer = setTimeout(() => {
      // Redirect to products page
      window.location.href = "/home"; // Or use your routing method
    }, 5000);

    // Set up the countdown display
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Clean up timers when component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 text-center">
        {/* Failure Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <div className="bg-red-500 rounded-full p-3">
              <X className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Failure Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again.
        </p>

        {/* Redirect Notice */}
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-gray-700">
            Redirecting to products page in{" "}
            <span className="font-bold text-purple-600">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Failure;
