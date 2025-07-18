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
    <>
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl ml-2">
        <h2 className="text-xl font-semibold mb-4">Data Table</h2>
        {data.length === 0 && (
          <div className="mt-6 p-6 border border-dashed border-gray-300 rounded text-center text-gray-500">
            <FaDatabase className="text-4xl text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
            <p>Select a database and run a query to display results.</p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="text-left">
              <tr className="bg-white">
                {Object.keys(data[0]).map((key) => (
                  <th className="p-2" key={key}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="text-left">
                  {Object.values(row).map((val, i) => (
                    <td className="p-2" key={i}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
