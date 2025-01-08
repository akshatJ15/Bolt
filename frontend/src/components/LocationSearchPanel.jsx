import React from "react";
import { IoLocation } from "react-icons/io5";

const LocationSearchPanel = ({ suggestions, onSelect }) => {
  return (
    <div className="py-10">
      {suggestions.pickup.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => onSelect("pickup", elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <IoLocation />
          </h2>
          <h4 className="font-medium">{elem.description}</h4> {/* Render elem.description */}
        </div>
      ))}
      {suggestions.destination.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => onSelect("destination", elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <IoLocation />
          </h2>
          <h4 className="font-medium">{elem.description}</h4> {/* Render elem.description */}
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
