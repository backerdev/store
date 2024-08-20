import React from "react";

const Status = ({ name, count, color }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg  border-2 bg-transparent text-white ${color}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-3xl font-bold text-gray-900 text-right">{count}</p>
    </div>
  );
};

export default Status;
