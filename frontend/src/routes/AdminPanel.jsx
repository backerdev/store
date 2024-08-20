import React, { useEffect, useState } from "react";
import { getApiSession, getUsers, register } from "../services/api";
import Loading from "../widgets/Loading";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [rights, setRights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (!user && !rights?.includes("1102")) {
  //   return <Navigate to="/" />;
  // }

  const [formData, setFormData] = useState({ name: "", email: "", type: "" });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);

      setSuccessMessage("User registered successfully");
      setErrors({});
      setFormData({ name: "", email: "", type: "" });
      fetchUsers(); // Refresh user list after registration
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data.data);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button className="px-4 py-2 my-4 font-mono  bg-red-600 rounded-sm hover:scale-75 ">
        logout
      </button>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Registration Form */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Register User
          </h2>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Access Rights (comma separated)
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.type && (
                <p className="text-red-500 text-sm mt-2">{errors.type}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>

            {errors.status && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                {errors.message || "An error occurred. Please try again."}
              </div>
            )}
          </form>
        </div>

        {/* User Dashboard */}
        <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Dashboard
          </h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    <th className="py-2 px-4 text-left text-gray-700 font-semibold">
                      Name
                    </th>
                    <th className="py-2 px-4 text-left text-gray-700 font-semibold">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left text-gray-700 font-semibold">
                      Access Rights
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.email} className="border-b">
                        <td className="py-2 px-4 text-gray-700">{user.name}</td>
                        <td className="py-2 px-4 text-gray-700">
                          {user.email}
                        </td>
                        <td className="py-2 px-4 text-gray-700">
                          {user.accessRights.join(", ")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-2 px-4 text-center text-gray-700"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
