import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditModel from "./EditModel";
import { useDispatch } from "react-redux";
import Alert from "./Alert";
import { useDeleteItemMutation } from "../services/store";
import { deleteFromStore } from "../features/storeSlice";
import { setToggleState } from "../features/NavSlice";

export default function TableBody({
  key,
  critical,
  pmScheduled,
  uom,
  store,
  material,
  materialDescription,
  group,
  price,
  stock,
  rights,
}) {
  const [deleteItem, { isLoading, isSuccess, isError, error }] =
    useDeleteItemMutation();
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsApp] = useState([]);
  const [selected, setSelected] = useState("");
  const [selectedDelete, setSelectedDelete] = useState();

  const [show, setShow] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const dispatch = useDispatch();
  // const msg = "hi my name is Ceo";
  // const contactNo = 6588062313;
  function handleEdit(e) {
    setSelected(e);
    setEditModel(true);
  }

  const onClose = (e) => {
    e.preventDefault();
    setShow(false);
    return;
  };
  const hadleDelete = (e) => {
    setSelectedDelete(e);
    setShow(true);
  };

  const onConfirm = async (material) => {
    try {
      const res = await deleteItem({ material, isApproved: true });

      if (res?.error?.data?.message) {
        setMessage(res.error.data.message);
        setShow(false);

        return;
      }
      setMessage("Item deleted successfully!");
      dispatch(deleteFromStore(material));
      dispatch(setToggleState());
      setShow(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setShow(false);
    }
  };
  // const handleCheckboxClick = (e, { material, materialDescription, stock }) => {
  //   const itemDetails = { material, materialDescription, stock };

  //   // Update the array of selected items
  //   setWhatsApp((prevItems) => {
  //     if (e.target.checked) {
  //       return [...prevItems, itemDetails];
  //     } else {
  //       return prevItems.filter((item) => item.material !== material);
  //     }
  //   });
  // };

  // const sendToWhatsApp = () => {
  //   const message = whatsapp
  //     .map((item) => `${item.name}: ${item.checked ? "Yes" : "No"}`)
  //     .join("\n");

  //   const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
  //     message
  //   )}`;

  //   window.open(whatsappURL, "_blank");
  // };
  useEffect(() => {
    if (message) {
      alert(message); // You can replace this with more sophisticated UI feedback
    }
  }, [message, show]); // Re-run the effect when message changes

  return (
    <>
      {/* <Alert show, onClose, onConfirm  /> */}
      <Alert
        show={show}
        onClose={onClose}
        onConfirm={() => onConfirm(selectedDelete)}
        selectedDelete={selectedDelete}
      />
      {key === selected && editModel && (
        <EditModel
          material={material}
          materialDescription={materialDescription}
          group={group}
          location={store}
          unitPrice={price}
          stock={stock}
          uom={uom}
          pmScheduled={pmScheduled}
          critical={critical}
          setEditModel={setEditModel}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      {/* <div className="w-max h-max px-2 flex justify-center items-center font-mono mt-2 gap-2">
        <input
          type="checkbox"
          name="whatsapp"
          id="whatsapp"
          onClick={() =>
            handleCheckboxClick({ material, stock, materialDescription })
          }
        />
        <p>share</p>
      </div> */}
      <tr className="hover:bg-gray-50">
        <td className="py-3 px-6 border-b">{material}</td>
        <td className="py-3 px-6 border-b">{materialDescription}</td>
        <td className="py-3 px-6 border-b">{group}</td>
        <td className="py-3 px-6 border-b">{store}</td>
        <td className="py-3 px-6 border-b">
          {price === 999 ? " - " : `SGD: ${price}`}
        </td>
        <td className="py-3 px-6 border-b">{stock === 999 ? " - " : stock}</td>
        <td className="py-3 px-6 border-b">{uom}</td>
        <td className="py-3 px-6 border-b capitalize">
          {pmScheduled ? "Yes" : "No"}
        </td>
        <td className="py-3 px-6 border-b capitalize">
          {critical ? "yes" : "No"}
        </td>
        {rights && rights.includes("1110") && (
          <td className=" py-3 px-6 border-b uppercase  gap-2">
            <FaEdit
              size={35}
              className="pr-2 hover:underline cursor-pointer text-gray-600"
              onClick={() => handleEdit(key)}
            />
            <MdDelete
              size={35}
              className="pr-2 hover:underline cursor-pointer text-red-600"
              onClick={() => hadleDelete(material)}
            />
            {/* <button
              onClick={sendToWhatsApp}
              className=" flex justify-center items-center gap-2 text-green-400 "
            >
              WhatsApp <FaWhatsapp className="font-bold" />
            </button> */}
            {/* <a
              aria-label="Chat on WhatsApp"
              target="_blank"
              href={`https://wa.me/${contactNo}?text=${whatsapp}`}
              // href="https://wa.me/6588062313?text=material%20123456%20Description%20Pulser%20car%20for%20sale"
            >
              {" "}
              <FaWhatsapp
                size={35}
                className="pr-2 hover:underline cursor-pointer text-green-600"
              />
            </a> */}
          </td>
        )}
      </tr>
    </>
  );
}
