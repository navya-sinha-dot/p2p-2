import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

const Success = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Set up the countdown and redirect
    const timer = setTimeout(() => {
      // Redirect to home page
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
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <div className="bg-purple-500 rounded-full p-3">
              <Check className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your payment.</p>

        {/* Redirect Notice */}
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-gray-700">
            Redirecting to home page in{" "}
            <span className="font-bold text-purple-600">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
