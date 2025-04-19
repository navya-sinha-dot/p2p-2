import React from "react";
import ProductCard from "./ProductCard";

function ProductSection() {
  const popularSearches = [
    "POPULAR SERCHES",
    "CAMERSAS",
    "PARTY DRESS",
    "PRINTER",
    "NOVELS",
    "RUCKSACK",
  ];

  const productData = {
    title: "Kids Party Setup for Birthday, (golden & blue)",
    price: "₹ 49",
    term: "PER WEEK",
    location: "Versova, Mumbai",
    image: "/api/placeholder/400/320",
  };

  return (
    <div className="flex-1 p-5 bg-white">
      <div className="flex gap-5 mb-5 overflow-x-auto pb-2">
        {popularSearches.map((item, index) => (
          <span
            key={index}
            className="whitespace-nowrap text-sm text-gray-700 cursor-pointer hover:text-black hover:underline">
            {item}
          </span>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-5">FRESH RECOMMENDATIONS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProductCard
          title={productData.title}
          price={productData.price}
          term={productData.term}
          location={productData.location}
          image={productData.image}
          hasImage={true}
        />
        <ProductCard hasImage={false} />
        <ProductCard hasImage={false} />
      </div>
    </div>
  );
}

export default ProductSection;
