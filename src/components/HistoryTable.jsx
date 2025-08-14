import React from "react";

const HistoryTable = ({ history, onDelete, onClear }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Query History</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:underline"
        >
          Clear All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Query</th>
              <th className="border px-2 py-1 text-left">SQL</th>
              <th className="border px-2 py-1 text-left">Response</th>
              <th className="border px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{item.query}</td>
                  <td className="border px-2 py-1">{item.sql}</td>
                  <td className="border px-2 py-1">{item.response}</td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2 text-gray-500">
                  No history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
