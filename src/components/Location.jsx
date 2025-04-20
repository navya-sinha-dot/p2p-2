import React, { useState } from "react";
import { toast } from "react-toastify";

const cityCountryList = [
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Hyderabad, India",
  "Chennai, India",
  "Kolkata, India",
  "Pune, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Lucknow, India",
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "Beijing, China",
  "Dubai, UAE",
  "Singapore, Singapore",
  "Los Angeles, USA",
  "Chicago, USA",
  "Toronto, Canada",
  "Berlin, Germany",
  "Rome, Italy",
  "Barcelona, Spain",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Cape Town, South Africa",
  "Rio de Janeiro, Brazil",
  "Moscow, Russia",
  "Bangkok, Thailand",
  "Istanbul, Turkey",
  "Seoul, South Korea",
  "Amsterdam, Netherlands",
  "San Francisco, USA",
  "Vancouver, Canada",
  "Madrid, Spain",
  "Lisbon, Portugal",
  "Doha, Qatar",
  "Cairo, Egypt",
  "Kuala Lumpur, Malaysia",
  "Jakarta, Indonesia",
  "Manila, Philippines",
  "Brussels, Belgium",
  "Warsaw, Poland",
  "Vienna, Austria",
  "Oslo, Norway",
  "Zurich, Switzerland",
  "Helsinki, Finland",
  "Stockholm, Sweden",
  "Prague, Czech Republic",
  "Athens, Greece",
];

export default function LocationDropdown() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const filteredList = cityCountryList.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (location) => {
    setSelectedCity(location);
    setQuery(location);
    setIsFocused(false);
  };

  return (
    <div className="relative w-80 mx-auto mt-10">
      <input
        type="text"
        placeholder="Enter your location"
        className="w-full border-2 border-purple-500 p-3 mb-8 rounded-md bg-purple-100 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={query}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFocused && (
        <ul className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border border-purple-200 rounded-md shadow-md mt-1">
          {filteredList.length > 0 ? (
            filteredList.map((location, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-purple-200 cursor-pointer text-purple-700"
                onClick={() => {
                  handleSelect(location);
                  toast.success("Location selected!");
                }}
              >
                {location}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-purple-500">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
}
