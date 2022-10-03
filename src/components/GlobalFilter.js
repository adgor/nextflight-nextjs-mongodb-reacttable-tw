import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4">
      <span
        // className="py-4 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
        className="relative inline-flex items-center px-6 py-3 text-sm font-medium text-white border border-gray-500 rounded-md hover:border-white "
      >
        Kerko:{" "}
        <input
          className="ml-3 leading-tight text-white bg-transparent border-b border-gray-500 appearance-none focus:border-white focus:outline-none "
          placeholder="Destinacion apo date"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};
