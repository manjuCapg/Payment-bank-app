import { FaChevronDown } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

const DbSelection = ({ onDbChange }) => {
  const options = ["Selected Database", "Big Query DB", "Mongo DB"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    onDbChange(selected);
  }, [selected, onDbChange]); // Call onDbChange when selected changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        console.log("Clicked outside the dropdown");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative text-left w-68">
      {" "}
      {/* Set a fixed width */} {/* Set a fixed width */}
      <div className="m-1 text-sm font-medium text-gray-700">
        Select your Database
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 text-green-700 px-4 py-2 rounded flex justify-between items-center shadow"
      >
        <span>{selected}</span>
        <FaChevronDown />
      </button>
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DbSelection;
