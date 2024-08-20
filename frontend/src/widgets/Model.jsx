import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useCreateNewItemMutation } from "../services/store";
import { useDispatch } from "react-redux";
import { setToggleState } from "../features/NavSlice";

const initialFormData = {
  material: "",
  materialDescription: "",
  materialGroup: "",
  location: "",
  unitPrice: "",
  stock: "",
  uom: "",
  pmScheduled: false,
  critical: false,
};
export default function Model({ handleCancel, toggle, settoggle }) {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [addItem, { isLoading, isSuccess, isError, error }] =
    useCreateNewItemMutation();
  const options = ["s1", "s2"];
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setFormData(initialFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  create an api using rtk query to send post request
    try {
      await addItem(formData).unwrap();

      settoggle(false);
      setFormData(initialFormData);
      dispatch(setToggleState());
    } catch (error) {
      setMsg(error.data.status);
    }
  };

  if (!toggle) return null;

  return (
    <div className="absolute justify-center items-center flex top-0 min-w-screen z-10 min-h-screen">
      <div className="z-20 w-[450px] h-[500px] bg-gray-200 relative">
        <Form
          method="post"
          onSubmit={handleSubmit}
          action="/dashboard"
          className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="material"
            >
              Material
            </label>
            <input
              type="number"
              name="material"
              value={formData.material}
              onChange={handleChange}
              id="material"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="materialDescription"
            >
              Material Description
            </label>
            <input
              type="text"
              name="materialDescription"
              value={formData.materialDescription}
              onChange={handleChange}
              id="materialDescription"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="materialGroup"
            >
              Material Group
            </label>
            <input
              type="text"
              name="materialGroup"
              value={formData.materialGroup}
              onChange={handleChange}
              id="materialGroup"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Please choose store</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="unitPrice"
            >
              Unit Price
            </label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              id="unitPrice"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              id="stock"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="uom"
            >
              Unit of Measure (UOM)
            </label>
            <input
              type="text"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              id="uom"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="pmScheduled"
              checked={formData.pmScheduled}
              onChange={handleChange}
              id="pmScheduled"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              className="ml-2 block text-sm text-gray-900"
              htmlFor="pmScheduled"
            >
              PM Scheduled
            </label>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="critical"
              checked={formData.critical}
              onChange={handleChange}
              id="critical"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              className="ml-2 block text-sm text-gray-900"
              htmlFor="critical"
            >
              Critical spares
            </label>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="bg-red-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="bg-amber-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Saving..." : isError ? msg : "Save Item"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
