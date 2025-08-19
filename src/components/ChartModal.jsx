import React from "react";
import { ChartDisplay } from "./ChartDisplay";

const ChartModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 w-[900px] bg-white shadow-lg border border-gray-300 rounded-lg z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chart View</h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
      </div>
      <ChartDisplay data={data} />
    </div>
  );
};

export default ChartModal;
