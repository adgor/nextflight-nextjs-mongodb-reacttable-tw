import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4">
      <span
        // className="py-4 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
        className="relative inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Kerko:{" "}
        <input
          className="ml-3 leading-tight text-gray-700 bg-transparent border-b border-gray-200 appearance-none focus:outline-none "
          placeholder="Destinacion apo date"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};
