import React from "react";
import { Heart } from "lucide-react";

function ProductCard({ title, price, term, location, image, hasImage }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md h-72">
      {hasImage ? (
        <>
          <div className="h-48 relative">
            <img
              src={image}
              alt="Product"
              className="w-full h-full object-cover"
            />
            <button className="absolute top-3 right-3 bg-transparent border-none cursor-pointer text-gray-700">
              <Heart size={20} />
            </button>
          </div>
          <div className="p-3">
            <h3 className="text-sm text-center mb-2">{title}</h3>
            <div className="flex items-center mb-1">
              <span className="font-bold text-base mr-1">{price}</span>
              <span className="text-xs text-gray-500">{term}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">{location}</div>
            <button className="bg-[#261FB3] border-none rounded-full px-4 py-1 text-sm font-bold cursor-pointer mx-auto block w-24">
              RENT
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gray-100 rounded-xl"></div>
      )}
    </div>
  );
}

export default ProductCard;
