import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GoogleLoginButton = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  const loginWithGoogle = () => {
    window.open("https://auth/google", "_self");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <button
      className="flex items-center justify-center w-full bg-white text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={() => loginWithGoogle()}>
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5 mr-3"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
