
import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import ItemsIllustration from "../components/ItemsIllustration";
import { Handshake } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 bg-purple-100">
      <div className="w-full lg:w-1/2 max-w-md text-center mb-8 lg:mb-0">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-full">
            <Handshake className="h-12 w-12 text-[#2F2A56] stroke-[1.5]" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#2F2A56] mb-4">
          Rent anything <br /> with Traydr
        </h1>

        <p className="text-[#2F2A56] text-lg mb-8">
          Welcome back! Please login to your account to continue
        </p>

        <GoogleLoginButton />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <ItemsIllustration />
      </div>
    </div>
  );
};

export default LoginPage;
