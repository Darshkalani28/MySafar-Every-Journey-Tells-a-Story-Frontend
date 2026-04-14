import React, { useState, useEffect } from "react";
import API from "../services/api";

const DestinationEditModal = ({ 
  destinationId, 
  item, 
  onSuccess, 
  modalId = "editDestinationModal" 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        summary: item.summary || "",
        location: item.location || "",
        startDate: item.startDate?.split("T")[0] || "",
        endDate: item.endDate?.split("T")[0] || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/destination/update-destination/${destinationId}`, formData);
      // alert("Destination Updated Successfully!");

    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }

      // Reset and close modal
      handleCloseModal();

      // Call the success callback to refresh parent component
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("Error updating destination: ", error);
      alert("Error updating destination!");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      title: "",
      summary: "",
      location: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="editDestinationLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="editDestinationLabel">
              Edit Destination
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* TITLE FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Destination</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Northern Lights"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.title}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* LOCATION FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Iceland"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.location}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* SUMMARY (Why you want to go) FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Why you want to go</label>
                <textarea
                  name="summary"
                  placeholder="e.g. Witness the aurora borealis dancing across Arctic skies"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.summary}
                  required
                  rows="3"
                  style={{ borderRadius: 8 }}
                ></textarea>
              </div>

              {/* START DATE FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.startDate}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* END DATE FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.endDate}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* MODAL FOOTER WITH BUTTONS */}
              <div className="d-flex gap-2 justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={handleCloseModal}
                  style={{ borderRadius: 8 }}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn px-4"
                  style={{ background: "#0F4980", color: "#ffffff", borderRadius: 8 }}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationEditModal;
