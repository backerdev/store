import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import {
  useCreateNewItemMutation,
  useUpdateItemMutation,
} from "../services/store";
import { useDispatch } from "react-redux";
import { updateItemInStore } from "../features/storeSlice";

const initialFormData = {
  materialDescription: "",
  materialGroup: "",
  location: "",
  unitPrice: "",
  stock: "",
  uom: "",
  pmScheduled: false,
  critical: false,
};
export default function EditModel({
  selected,
  material,
  materialDescription,
  group,
  location,
  unitPrice,
  stock,
  pmScheduled,
  critical,
  uom,
  setEditModel,
  setSelected,
}) {
  const options = ["s1", "s2"];
  const [formData, setFormData] = useState({
    material: material,
    materialDescription: "",
    materialGroup: "",
    location: "",
    unitPrice: "",
    stock: "",
    uom: "",
    pmScheduled: false,
    critical: false,
  });
  const dispatch = useDispatch();
  const [updateItem, { isLoading, isSuccess, isError, error }] =
    useUpdateItemMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    setEditModel(false);
    setSelected("");
  };
  const removeEmptyStrings = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateItem(formData);
      console.log(data.status === "Created");
      if (data.status === "Created") {
        setEditModel(false);

        const updates = removeEmptyStrings(formData);
        console.log(updates);
        dispatch(updateItemInStore({ material: material, updates }));
        return;
      }
    } catch (error) {
      setEditModel(false);
    }
  };

  return (
    <>
      <div className=" absolute z-20  max-w-[900px]  h-max bg-gray-200 ">
        <form
          method="post"
          onSubmit={handleSubmit}
          className=" mx-auto p-6 bg-white shadow-md rounded-lg flex  flex-wrap gap-4 justify-center items-center"
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
              disabled
              value={material}
              id="material"
              className="px-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              <span>Material Description: </span>
              <span className="bg-red-300">{materialDescription}</span>
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
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              <span>Material Group: </span>
              <span className="bg-red-300">{group}</span>
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
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              <span>Location: </span>
              <span className="bg-red-300">{location}</span>
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
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              <span>Unit price: </span>
              <span className="bg-red-300">{unitPrice}</span>
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
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              <span>Stock: </span>
              <span className="bg-red-300">{stock}</span>
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
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="materialDescription"
            >
              Unit of Measure (UOM)
              <span className="bg-red-300">{uom}</span>
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

          <div className="flex flex-col  mb-4">
            <label
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="pmScheduled"
            >
              PM Schedule
              <span className="bg-red-300">{pmScheduled ? "Yes" : "No"}</span>
            </label>
            <input
              type="checkbox"
              name="pmScheduled"
              checked={formData.pmScheduled}
              onChange={handleChange}
              id="pmScheduled"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label
              className=" text-sm font-medium text-gray-700 mb-2 flex flex-col"
              htmlFor="critical"
            >
              Critical spares
              <span className="bg-red-300">{critical ? "Yes" : "No"}</span>
            </label>
            <input
              type="checkbox"
              name="critical"
              checked={formData.critical}
              onChange={handleChange}
              id="critical"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="bg-red-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              //   disabled={isLoading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
