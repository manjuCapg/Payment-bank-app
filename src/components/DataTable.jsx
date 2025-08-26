import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaDatabase } from "react-icons/fa";
import toast from "react-hot-toast";

export const DataTable = ({ data, onToggleChart }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setShowExportOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleExportJSON = () => {
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

      toast.success("JSON downloaded!");
    } catch (error) {
      toast.error("Failed to export JSON.", error);
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(",")
      );
      const csvContent = [headers, ...rows].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transaction_data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV downloaded!");
    } catch (error) {
      toast.error("Failed to export CSV.", error);
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
    const poundFields = [
      "PaymentAmount",
      "TaxAmount",
      "Interchange",
      "AverageTransactionAmount",
      "TotalTransactionAmount",
      "RefundAmount",
      "ChargebackAmount",
      "NetAmount",
      "TransactionAmount",
      "Amount",
      "TotalAmount",
      "Balance",
      "Revenue",
      "Cost",
      "Profit",
      "Loss",
      "Expense",
      "Income",
      "Earnings",
      "Sales",
      "Commission",
      "Payout",
      "Withdrawal",
    ];
    const percentageFields = [
      "SuccessRate",
      "DiscountRate",
      "FailureRate",
      "FeePercentage",
      "ChargebackRate",
      "credit_percentage",
      "debit_percentage",
      "GrowthRate",
    ];

    if (poundFields.includes(key) && !isNaN(value)) {
      return `£${parseFloat(value).toFixed(2)}`;
    }

    if (percentageFields.includes(key) && !isNaN(value)) {
      return `${parseFloat(value).toFixed(2)}%`;
    }

    return value !== null ? value.toString() : "—";
  };

  const getTotalPaymentAmount = () => {
    return data.reduce((sum, row) => {
      const val = parseFloat(row.PaymentAmount);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  };

  const getAverageFeePercentage = () => {
    const values = data
      .map((row) => parseFloat(row.FeePercentage))
      .filter((val) => !isNaN(val));
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const getAverageTransactionAmount = () => {
    const values = data
      .map((row) => parseFloat(row.TransactionAmount))
      .filter((val) => !isNaN(val));
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
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
    <div
      className="bg-white p-4 mt-6 rounded-lg shadow-xl w-full flex flex-col"
      style={{ maxHeight: "calc(100vh - 240px)" }}
    >
      <h2 className="text-xl font-semibold mb-4">Data Table</h2>

      <div
        className="overflow-auto grow rounded"
        style={{ maxHeight: "500px" }}
      >
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
            {/* Summary Row */}
            <tr className="bg-gray-100 font-semibold">
              {Object.keys(data[0]).map((key, i) => (
                <td
                  key={i}
                  className="p-2 border-t border-gray-300 whitespace-nowrap"
                >
                  {key === "PaymentAmount"
                    ? `Total: £${getTotalPaymentAmount().toFixed(2)}`
                    : key === "FeePercentage"
                    ? `Avg: ${getAverageFeePercentage().toFixed(2)}%`
                    : key === "TransactionAmount"
                    ? `Avg: £${getAverageTransactionAmount().toFixed(2)}`
                    : ""}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 py-4 px-4 bg-white flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
        <button
          onClick={() => setShowExportOptions(true)}
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

      {/* Modal Popup */}
      {showExportOptions && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/40 bg-opacity-90">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center border border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Choose Export Format</h3>
            <button
              onClick={() => {
                handleExportCSV();
                setShowExportOptions(false);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-3"
            >
              Export as CSV
            </button>
            <button
              onClick={() => {
                handleExportJSON();
                setShowExportOptions(false);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-3"
            >
              Export as JSON
            </button>
            <button
              onClick={() => setShowExportOptions(false)}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
