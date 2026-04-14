import React, { useState } from "react";
import API from "../services/api";

const StoryFormModal = ({ destinationId, onSuccess, modalId = "addStoryModal" }) => {
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
    location: "",
    days: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle coverImage
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // Handle Images (multiple)
  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("destinationId", destinationId);

      // append coverImage
      if (coverImage) {
        data.append("coverImage", coverImage);
      }

      // append Images
      if (images) {
        images.forEach((image) => {
          data.append("photos", image);
        });
      }

      const res = await API.post(`/stories/create-stories`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Story Created Successfully!");

      // Reset form and close modal
      handleCloseModal();

      // Call the success callback to refresh parent component
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("Error Creating Stories: ", error);
      alert("Error creating story!");
    } finally {
      setLoading(false);
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setFormdata({
      title: "",
      description: "",
      location: "",
      days: "",
    });
    setCoverImage(null);
    setImages([]);
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="addStoryLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" id="addStoryLabel">
              Add Story
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
              <div className="mb-3">
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

              {/* COVER IMAGE FIELD */}
              <div className="mb-3">
                <label className="form-label fw-600 mb-2">Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleCoverImageChange}
                  style={{ borderRadius: 8 }}
                />
                {coverImage && (
                  <small className="text-success">✓ Image selected</small>
                )}
              </div>

              {/* MULTIPLE PHOTOS FIELD */}
              <div className="mb-4">
                <label className="form-label fw-600 mb-2">Story Photos</label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={handleImagesChange}
                  style={{ borderRadius: 8 }}
                />
                {images.length > 0 && (
                  <small className="text-success">
                    ✓ {images.length} photo(s) selected
                  </small>
                )}
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
                  disabled={loading}
                  className="btn px-4"
                  style={{
                    background: "#0F4980",
                    color: "#ffffff",
                    borderRadius: 8,
                  }}
                >
                  {loading ? "Creating..." : "Add Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryFormModal;
