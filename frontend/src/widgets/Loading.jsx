import React from "react";
import { useSelector } from "react-redux";

const Loading = ({ msg = "start" }) => {
  const { user } = useSelector((state) => state.nav);
  return (
    <div className="flex items-center justify-center  min-h-screen bg-gray-100">
      {msg !== "start" && msg}

      <div className="flex flex-col items-center">
        {msg === "start" ? (
          <p className="mt-4 text-3xl text-gray-700">Hello {user}</p>
        ) : (
          <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
        )}
        <p className="text-blue-600 animate-pulse">Mechanical</p>
      </div>
    </div>
  );
};

export default Loading;
