import React from "react";

function Sidebar() {
  const categories = [
    "Books",
    "Tools & Equipment",
    "Electronics & Gadgets",
    "Tech Accessories",
    "Apparel & Fashion",
    "Fitness & Sports Gear",
    "Event & Party Supplies",
    "Travel & Lifestyle Gear",
    "Furniture",
  ];

  return (
    <div className="w-48 bg-amber-50 shadow-md">
      <h3 className="px-4 py-3 font-bold text-sm">CATEGORIES</h3>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`px-4 py-3 cursor-pointer text-sm transition-colors hover:bg-[#FBE4D6]
              ${
                category === "Event & Party Supplies"
                  ? "bg-pink-200 font-bold"
                  : ""
              }`}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
