import React from "react";
import {
  Camera,
  Drill,
  Box,
  Bike,
  BookOpen,
  Shirt,
  BookMarked,
  Package,
} from "lucide-react";

const ItemsIllustration = () => {
  const items = [
    { Icon: Camera, position: "top-0 right-0", size: "w-16 h-16" },
    { Icon: Drill, position: "top-16 left-8", size: "w-14 h-14" },
    { Icon: BookOpen, position: "top-24 left-0", size: "w-12 h-12" },
    { Icon: Bike, position: "bottom-0 left-20", size: "w-20 h-20" },
    { Icon: Shirt, position: "top-4 right-20", size: "w-12 h-12" },
    { Icon: Box, position: "bottom-28 left-0", size: "w-16 h-16" },
    { Icon: BookMarked, position: "bottom-40 right-12", size: "w-14 h-14" },
    { Icon: Package, position: "bottom-8 right-8", size: "w-16 h-16" },
  ];

  // Create a custom chair icon since Lucide doesn't have a perfect match
  const ChairIcon = () => (
    <div className="relative w-16 h-16">
      <div className="absolute inset-x-4 top-3 bottom-8 rounded-t-3xl border-2 border-[#8977c7]"></div>
      <div className="absolute inset-2 bottom-3 rounded-md border-2 border-[#8977c7]"></div>
      <div className="absolute left-3 right-3 bottom-1 h-2 rounded-md border-2 border-[#8977c7]"></div>
    </div>
  );

  // Create a custom backpack icon
  const BackpackIcon = () => (
    <div className="relative w-16 h-16">
      <div className="absolute inset-x-4 top-1 h-3 rounded-md border-2 border-[#8977c7]"></div>
      <div className="absolute inset-2 top-4 bottom-1 rounded-md border-2 border-[#8977c7]"></div>
      <div className="absolute left-0 top-6 w-2 h-6 rounded-md border-2 border-[#8977c7]"></div>
      <div className="absolute right-0 top-6 w-2 h-6 rounded-md border-2 border-[#8977c7]"></div>
    </div>
  );

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} ${item.size} flex items-center justify-center`}
        >
          <item.Icon className="text-[#8977c7] stroke-[1.5]" />
        </div>
      ))}

      <div className="absolute bottom-16 left-28">
        <ChairIcon />
      </div>

      <div className="absolute top-40 right-0">
        <BackpackIcon />
      </div>
    </div>
  );
};

export default ItemsIllustration;
