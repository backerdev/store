import React from "react";

const Alert = ({ show, onClose, onConfirm, selectedDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay z-30">
      <div className="modal">
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this item : {selectedDelete}?</p>
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onClose} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
