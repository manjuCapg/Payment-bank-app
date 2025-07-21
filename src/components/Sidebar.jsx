import { FaMicrophone, FaPaperPlane, FaDatabase } from "react-icons/fa";
import DbSelection from "./DbSelection";
import React, { useState } from "react";

const Sidebar = ({ query, setQuery, onSend, chatHistory }) => {
  const [selectedDb, setSelectedDb] = useState("Selected Database");
  const [error, setError] = useState("");

  const isDbvalid = selectedDb === "Big Query DB" || selectedDb === "Mongo DB";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Query cannot be empty");
      return;
    }
    if (!isDbvalid) {
      setError("Please select a valid database");
      return;
    }
    if (error) {
      setError("");
    }

    onSend(); // Trigger the send function
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]  bg-white shadow">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory?.length > 0 ? (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-md shadow ${
                  msg.isUser
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <FaDatabase className="text-4xl mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold">No Data Available</h3>
            <p>Select a database and run a query to display results.</p>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t p-4 bg-white sticky bottom-0">
        <DbSelection onDbChange={setSelectedDb} />
        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Type your query and speak
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded shadow-sm resize-none focus:ring-2 focus:ring-green-600 focus:outline-none"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your message..."
          />
          {error && (
            <div className="text-red-600 text-sm flex items-center gap-1">
              <FaDatabase />
              {error}
            </div>
          )}
          <div className="flex justify-between items-center">
            <button type="button">
              <FaMicrophone size={24} className="text-green-600" />
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2"
            >
              <FaPaperPlane />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
