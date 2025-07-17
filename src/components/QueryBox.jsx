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
  };
  if (!sqlQuery) return null;
  return (
    <>
      {isModalOpen ? (
        <>
          <textarea
            value={editableQuery}
            onChange={(e) => setEditableQuery(e.target.value)}
            rows={12}
            className="w-full p-3 bg-black text-yellow-300 border border-yellow-500 rounded resize-none"
          />
          <div className="flex justify-end mt-2 space-x-2">
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
        </>
      ) : (
        <>
          <h2 className="text-lg">Query Script</h2>
          <div className="">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={sqlQuery}
                readOnly
                className="w-full p-2 bg-black text-yellow-300 font-mono rounded border border-yellow-500 truncate"
              />
              <button
                onClick={handleEditClick}
                className=" text-black px-3 py-1 rounded text-sm"
              >
                <FiEdit className="inline mr-1" size={30} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QueryBox;
