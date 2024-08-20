import React from "react";

export default function Sidebar({ name, handleLogout, handleToggle }) {
  return (
    <div className="bg-gray-900 text-white w-64 p-6">
      <h2 className="text-xl text-right font-semibold mb-8">
        Mecanical store Dashboard
      </h2>
      <ul>
        <li className="mb-6">
          <button
            onClick={(e) => handleToggle(e)}
            className="text-lg font-medium text-gray-300 hover:text-white"
          >
            + create item
          </button>
        </li>
        <li className="mb-6">
          <button
            onClick={(e) => handleLogout(e)}
            className="text-lg font-medium text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
