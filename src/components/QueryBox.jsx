import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

export const QueryBox = ({ sqlQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableQuery, setEditableQuery] = useState(sqlQuery || "");

  const handleEditClick = () => {
    setEditableQuery(sqlQuery);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    // You can add logic to send updated query back to parent or API
  };

  if (!sqlQuery) return null;

  return (
    <>
      <h2 className="text-lg mb-2">Query Script</h2>
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={sqlQuery}
          readOnly
          className="w-full p-2 bg-black text-yellow-300 font-mono rounded border border-yellow-500 truncate"
        />
        <button
          onClick={handleEditClick}
          className="text-black px-3 py-1 rounded text-sm"
        >
          <FiEdit className="inline mr-1" size={30} />
        </button>
      </div>

      {/* Right-side popup modal */}
      {isModalOpen && (
        <div className="fixed top-20 right-4 w-xl bg-white shadow-lg border border-gray-300 rounded-lg z-50 p-4">
          <h3 className="text-lg font-semibold mb-2">Edit Query</h3>
          <textarea
            value={editableQuery}
            onChange={(e) => setEditableQuery(e.target.value)}
            rows={10}
            className="w-full p-2 bg-black text-yellow-300 border border-yellow-500 rounded resize-none"
          />
          <div className="flex justify-end mt-3 space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryBox;
