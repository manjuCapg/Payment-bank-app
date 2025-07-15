import React from "react";

export const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <div>No Data Available</div>;
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl ml-2">
        <h2 className="text-xl font-semibold mb-4">Data Table</h2>
        {data.length === 0 && <div>Data is not Available</div>}
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
