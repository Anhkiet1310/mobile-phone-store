import React, { useEffect } from "react";

const PhoneItemsModal = ({ phoneItems, onClose }) => {
  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="phoneItemsModalLabel"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="phoneItemsModalLabel">
              Phone Items
            </h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {phoneItems.length > 0 ? (
              <ul className="list-group">
                {phoneItems.map((item) => (
                  <li key={item.phoneItemId} className="list-group-item">
                    <strong>Serial:</strong> {item.serialNumber} <br />
                    <strong>Status:</strong> {item.status} <br />
                    <strong>Imported:</strong>{" "}
                    {new Date(item.dateImported).toLocaleDateString()} <br />
                    {item.datePurchased && (
                      <>
                        <strong>Purchased:</strong>{" "}
                        {new Date(item.datePurchased).toLocaleDateString()}{" "}
                        <br />
                      </>
                    )}
                    {item.expiryDate && (
                      <>
                        <strong>Expiry:</strong>{" "}
                        {new Date(item.expiryDate).toLocaleDateString()} <br />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No phone items available.</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneItemsModal;
