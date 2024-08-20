import React from "react";

export default function Button({ handleToggle }) {
  return (
    <button
      onClick={handleToggle}
      className="text-gray-700 text-center flex  justify-center items-center px-4 py-2 text-lg font-bold  border m-2 hover:bg-slate-700 hover:text-slate-200 transition-all"
    >
      + Create Item
    </button>
  );
}
