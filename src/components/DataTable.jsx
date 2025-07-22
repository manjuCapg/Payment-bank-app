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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="p-2 text-left border-b border-gray-300 bg-gray-100"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody */}
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full table-auto border border-t-0 border-gray-200">
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {Object.values(row).map((val, i) => (
                    <td className="p-2 border-b border-gray-200" key={i}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
