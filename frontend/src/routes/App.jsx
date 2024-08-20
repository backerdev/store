import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Mechanical Store
        </h2>

        {msg && <p className="text-red-500 text-center text-sm mb-4">{msg}</p>}

        <a
          target="_blank"
          href="https://store-iota-dun.vercel.app/auth/google"
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          <svg
            className="w-6 h-6 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M47.5 24.3c0-1.7-.1-3.4-.4-5H24v9.4h13.1c-.6 3-2.4 5.6-4.9 7.3v6h7.9c4.6-4.2 7.4-10.5 7.4-17.7z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 12-2.1 16-5.8l-7.9-6c-2.2 1.5-5 2.4-8.1 2.4-6.2 0-11.5-4.2-13.4-9.8H2.5v6.1C6.5 42.7 14.7 48 24 48z"
            />
            <path
              fill="#FBBC05"
              d="M10.6 28.6c-.5-1.5-.8-3.2-.8-4.9s.3-3.4.8-4.9V12.7H2.5v6.1C6.5 42.7 14.7 48 24 48z"
            />
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.7 1.2 9.2 3.7l6.9-6.9C35.9 2.4 30.5 0 24 0 14.7 0 6.5 5.3 2.5 13.1l8.1 6.3C12.5 13.7 17.8 9.5 24 9.5z"
            />
          </svg>
          Sign in with Google
        </a>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact MABS
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
