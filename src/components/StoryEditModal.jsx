import React, { useState, useEffect } from "react";
import API from "../services/api";

const StoryEditModal = ({ 
  storiesId, 
  item, 
  onSuccess, 
  modalId = "editStoryModal" 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    days: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        location: item.location || "",
        days: item.days || "",
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
      await API.put(`/stories/update-stories/${storiesId}`, formData);
    //   alert("Story Updated Successfully!");

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
      console.log("Error updating story: ", error);
      alert("Error updating story!");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      days: "",
    });
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="editStoryLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="editStoryLabel">
              Edit Story
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
                <label className="form-label fw-600 mb-2">Story Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Day at the Beach"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.title}
                  required
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* DESCRIPTION FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Write about your experience and memories..."
                  className="form-control"
                  onChange={handleChange}
                  value={formData.description}
                  required
                  rows="4"
                  style={{ borderRadius: 8 }}
                ></textarea>
              </div>

              {/* LOCATION FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Reykjavik City Center"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.location}
                  style={{ borderRadius: 8 }}
                />
              </div>

              {/* DAYS FIELD */}
              <div className="mb-4">
                <label className="form-label fw-600 mb-2">Days</label>
                <input
                  type="number"
                  name="days"
                  placeholder="e.g. 3"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.days}
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

export default StoryEditModal;
