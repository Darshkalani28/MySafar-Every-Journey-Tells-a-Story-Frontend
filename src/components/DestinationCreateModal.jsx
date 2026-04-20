import React, { useState } from "react";
import API from "../services/api.js";
import {
  Lock,
  Globe,
} from "lucide-react";

const DestinationCreateModal = ({ onSuccess, modalId = "addDestinationModal" }) => {
  const [image, setImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [formData, setFormdata] = useState({
    title: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  
  // Handle text inputs
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = new FormData();
      
      // append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // append visibility value
      data.append("isPublic", isPublic);

      // append image
      if (image) {
        data.append("coverImage", image);
      }
      
      const res = await API.post("/destination/create-destination", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Destination Created Successfully!");

      // Reset form and close modal
      handleCloseModal();

      // Refresh destinations
      onSuccess();
    } catch (error) {
      console.log("Error creating destination: ", error);
      alert("Error creating destination!");
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setFormdata({
      title: "",
      summary: "",
      location: "",
      startDate: "",
      endDate: "",
    });
    setImage(null);
    setIsPublic(true);
    
    // Close modal using Bootstrap
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="addDestinationLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="addDestinationLabel">
              Add Destination
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
              <div className="d-flex align-items-center justify-content-between gap-3 mb-4 p-3 rounded" style={{ background: "#f8f9fa" }}>
                <div>
                  <p className="mb-1 fw-semibold">Destination visibility</p>
                  <small className="text-muted">
                    {isPublic
                      ? "This destination is visible to everyone."
                      : "This destination is private and only visible to you."}
                  </small>
                </div>
                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isPublicSwitch"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="isPublicSwitch">
                    {isPublic ? "Public" && <Globe style={{marginLeft: "5px"}} color="#0F4980"/>  : "Private" && <Lock style={{marginLeft: "5px"}} color="#0F4980"/>}
                  </label>
                </div>
              </div>

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
                <label className="form-label fw-600 mb-2">
                  Why you want to go
                </label>
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

              {/* IMAGE UPLOAD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* MODAL FOOTER WITH BUTTONS */}
              <div className="d-flex gap-2 justify-content-end mt-4">
                <button
                  type="button"
                  className="btn1 px-4"
                  onClick={handleCloseModal}
                  style={{ borderRadius: 8 }}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn px-4"
                  style={{
                    background: "#0F4980",
                    color: "#ffffff",
                    borderRadius: 8,
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCreateModal;
