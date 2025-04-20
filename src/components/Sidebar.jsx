import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const categories = [
    { name: "Books", path: "/books" },
    { name: "Tools & Equipment", path: "/tools" },
    { name: "Electronics & Gadgets", path: "/electronics" },
    { name: "Tech Accessories", path: "/tech" },
    { name: "Apparel & Fashion", path: "/apparel" },
    { name: "Fitness & Sports Gear", path: "/fitness" },
    { name: "Event & Party Supplies", path: "/events" },
    { name: "Travel & Lifestyle Gear", path: "/travel" },
    { name: "Furniture", path: "/furniture" },
  ];

  return (
    <div className="w-48 bg-white shadow-md h-screen">
      <h3 className="px-4 py-3 font-bold text-sm text-purple-700">
        CATEGORIES
      </h3>
      <ul>
        {categories.map((category) => (
          <li key={category.path}>
            <div
              onClick={() => navigate(category.path)}
              className={`block px-4 py-3 cursor-pointer text-sm transition-colors hover:bg-purple-100
                ${
                  location.pathname === category.path
                    ? "bg-purple-500 text-white font-bold"
                    : "text-gray-700"
                }`}
            >
              {category.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
