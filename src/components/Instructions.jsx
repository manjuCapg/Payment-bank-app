import React from "react";
import DbSelection from "./DbSelection";
import { FaPlus } from "react-icons/fa";

export const Instructions = ({ onNewChat, sessionId }) => {
  return (
    <div className="bg-green-900 p-4 shadow space-y-4 mb-1 text-white">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-100 transition"
      >
        <FaPlus />
        <span>New Chat</span>
      </button>
      <div className="text-xs mt-2 opacity-80">
        <strong>Session ID:</strong> {sessionId}
      </div>
    </div>
  );
};

export default Instructions;
