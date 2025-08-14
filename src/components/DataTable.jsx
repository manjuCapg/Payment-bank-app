import React from "react";
import { FaDatabase } from "react-icons/fa";

export const DataTable = ({ data }) => {
  if (!data || data.length === 0)
    return (
      <div className="mt-6 p-6 border border-dashed border-gray-300 rounded text-center text-gray-500">
        <FaDatabase className="text-4xl text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
        <p>Select a database and run a query to display results.</p>
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl w-full">
      <h2 className="text-xl font-semibold mb-4">Data Table</h2>

      {/* Scrollable container */}
      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="p-2 text-left border-b border-gray-300 whitespace-nowrap bg-gray-100"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className="p-2 border-b border-gray-200 whitespace-nowrap"
                  >
                    {val !== null ? val.toString() : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-3">
        <button
          onClick={() => console.log("Export clicked")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-grey-700 transition"
        >
          Export
        </button>
        <button
          onClick={() => console.log("Save clicked")}
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};
