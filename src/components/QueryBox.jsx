import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

export const QueryBox = ({ sqlQuery }) => {
  const [showPopup, setShowPopup] = useState(false);
  // if (!sqlQuery) {
  //   return null; // Don't render if sqlQuery is not provided
  // }

  return (
    <>
      <div className="flex items-center  space-x-2 mt-5 mb-7 max-w-4xl ml-3">
        <h3>Query Script</h3>
        {(!sqlQuery && (
          <>
            <input
              type="text"
              placeholder="Enter your Query...."
              className={`transition-all duration-300 ease-in-out px-3 py-2 border rounded-lg w-full bg-black text-amber-500
         `}
            />
            <button
              onClick={() => setShowPopup(true)}
              className="text-gray-600 hover::text-black transition"
              title="Expand"
            >
              <FiEdit size={20} />
            </button>
          </>
        )) || (
          <>
            <input
              type="text"
              placeholder="Enter your Query...."
              className={`transition-all duration-300 ease-in-out px-3 py-2 border rounded-lg w-full bg-black text-amber-500
         `}
            />
            <button
              onClick={() => setShowPopup(true)}
              className="text-gray-600 hover::text-black transition"
              title="Expand"
            >
              <FiEdit size={20} />
            </button>
          </>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 item-center justify-center z-50">
            <div className="bg-black text-amber-500 p-6 rounded-lg max-w-4xl shadow-lg relative">
              <textarea
                className="max-w-4xl h-48 p-4 bg-black text-amber-500
            border border-black rounded resize-none"
                name="query"
                id="query"
                value={sqlQuery}
                placeholder="write your query here ...."
              ></textarea>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
                Run Query
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
