import React from "react";
import { useSelector } from "react-redux";
import Button from "../widgets/Button";
import TableBody from "../widgets/Table_Body";

export default function Table({ handleToggle, rights }) {
  const store = useSelector((state) => state.items);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg custom-scrollbar">
      {rights && rights.includes("1110") && (
        <Button handleToggle={handleToggle} />
      )}

      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 font-semibold">
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Material no.
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Description
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Group
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Location
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Price
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Stock
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              UOM
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              PM Scheduled
            </th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
              Critical
            </th>
            {rights && rights.includes("1110") && (
              <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium ">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {store.length ? (
            store.map((item) => (
              <TableBody
                key={item._id}
                id={item._id}
                critical={item.critical}
                pmScheduled={item.pmScheduled}
                uom={item.uom}
                store={item.store}
                material={item.material}
                materialDescription={item.materialDescription}
                price={item.price}
                stock={item.stock}
                group={item.group}
                rights={rights}
              />
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
