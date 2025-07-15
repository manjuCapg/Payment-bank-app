import { FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";

const DbSelection = () => {
  const options = ["Selected Database", "Big Query DB", "Mongo DB"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative  text-left ">
      <div htmlFor="" className="m-1">
        Select your DataBase
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="border-white text-green-700 border-1  px-4 py-2 rounded inline-flex items-center gap-2 shadow"
      >
        <span>{selected}</span>
        <FaChevronDown />
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-white border rounded shadow z-10">
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
