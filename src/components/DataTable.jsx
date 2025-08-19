import React from "react";
import { FaDatabase } from "react-icons/fa";
import toast from "react-hot-toast";

export const DataTable = ({ data, onToggleChart }) => {
  const handleExport = () => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transaction_data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Data successfully downloaded!");
    } catch (error) {
      toast.error("Failed to export data.", error);
    }
  };

  const formatHeader = (key) => {
    let formatted = key.replace(/_/g, " ");
    formatted = formatted.replace(/([a-z])([A-Z])/g, "$1 $2");
    return formatted
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatValue = (key, value) => {
    const isAmount = /amount|price|total|cost|payment/i.test(key);
    if (isAmount && !isNaN(value)) {
      return `£${parseFloat(value).toFixed(2)}`;
    }
    return value !== null ? value.toString() : "—";
  };

  if (!data || data.length === 0)
    return (
      <div className="mt-6 p-6 border border-dashed border-gray-300 rounded text-center text-gray-500">
        <FaDatabase className="text-4xl text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
        <p>Select a database and run a query to display results.</p>
      </div>
    );

  return (
    <div className="bg-white p-4 mt-6 rounded-lg shadow-xl w-full relative">
      <h2 className="text-xl font-semibold mb-4">Data Table</h2>

      {/* Scrollable Table */}
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto  rounded">
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="p-2 text-left border-b border-gray-300 whitespace-nowrap"
                >
                  {formatHeader(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.entries(row).map(([key, val], i) => (
                  <td
                    key={i}
                    className="p-2 border-b border-gray-200 whitespace-nowrap"
                  >
                    {formatValue(key, val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sticky Action Buttons - Responsive */}
      <div className="sticky bottom-0 bg-white py-4 px-4 shadow-md flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0 z-20">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow cursor-pointer w-full sm:w-auto"
        >
          Export
        </button>
        <button
          onClick={() => console.log("Save clicked")}
          className="border border-green-700 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded shadow cursor-pointer w-full sm:w-auto"
        >
          Save
        </button>
        {onToggleChart && (
          <button
            onClick={onToggleChart}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-4 rounded shadow cursor-pointer w-full sm:w-auto"
          >
            Toggle Chart View
          </button>
        )}
      </div>
    </div>
  );
};
