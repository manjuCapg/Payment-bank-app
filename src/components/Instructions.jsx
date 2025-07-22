import React from "react";
import DbSelection from "./DbSelection";
import { FaPlus } from "react-icons/fa";

export const Instructions = ({ onNewChat }) => {
  return (
    <div className="bg-green-900 p-4  shadow space-y-4 mb-1">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-100 transition"
      >
        <FaPlus />
        <span>New Chat</span>
      </button>
    </div>
  );
};

export default Instructions;
