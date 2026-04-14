import React, { useState, useEffect } from "react";
import Stories from "../Stories.jsx";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import DestinationEditModal from "../../components/DestinationEditModal.jsx";

const Destination = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [image, setImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [formData, setFormdata] = useState({
    title: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const fetchDestinations = async () => {
    try {
      const res = await API.get("/destination/get-destination");
      setDestinations(res.data.fetchedDestination);
    } catch (error) {
      console.log("Error fetching destinations: ", error);
    }
  };

  // Fetch Data
  useEffect(() => {
    fetchDestinations();
  }, []);

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
      setFormdata({
        title: "",
        summary: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      setImage(null);
      setIsPublic(true);
      setShowModal(false);

      // Refresh destinations
      fetchDestinations();
    } catch (error) {
      console.log("Error creating destination: ", error);
      alert("Error creating destination!");
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    navigate("/destination");
    setShowModal(false);
    setFormdata({
      title: "",
      summary: "",
      location: "",
      startDate: "",
      endDate: "",
    });
    setImage(null);
    setIsPublic(true);
  };

  // Delete Destination
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/destination/delete-destination/${id}`);

      // Remove from UI instantly
      setDestinations((prev) => prev.filter((item) => item._id !== id));
      navigate(`/destination`);
      alert("Deleted Successfully!");
    } catch (error) {
      console.log("Error deleting destination:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h1 className="mb-1" style={{ fontSize: "2.5rem" }}>
              Destinations
            </h1>
            <p className="text-muted mb-0">
              All the places you&apos;ve explored.
            </p>
          </div>
          <button
            className="btn rounded-pill px-4 py-2"
            style={{ fontWeight: 600, background: "#0F4980", color: "#e9e9e9" }}
            onClick={() => setShowModal(true)}
            data-bs-toggle="modal"
            data-bs-target="#addDestinationModal"
          >
            + New Destination
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {destinations.map((item) => (
            <div className="col" key={item._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: 15 }}
              >
                {/* IMAGE SECTION WITH STORY BADGE + 3 DOT MENU */}
                <div className="position-relative">
                  <Link
                    to={`/stories/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={item.coverImage || "travel.jpg"}
                      onClick={() => setImage(item._id)}
                      style={{
                        height: 200,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="card-img-top"
                      alt="destination"
                    />

                    {/* <span className="badge bg-primary position-absolute" style={{ top: 12, left: 12, borderRadius: 999 }}>
                      {item.stories?.length ?? 0} stories
                    </span> */}
                  </Link>
                </div>

                {/* Body */}
                <div className="card-body pb-3" style={{ Height: 200 }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Link
                      to={`/stories/${item._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <h5 className="card-title mb-0">{item.title}</h5>
                    </Link>
                    <div className="dropdown">
                      <button
                        className="btn1 btn-sm"
                        style={{
                          boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                          borderRadius: "25%",
                        }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ⋮
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setEditingItem(item)}
                            data-bs-toggle="modal"
                            data-bs-target="#editDestinationModal"
                          >
                            ✏️ Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            🗑 Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    to={`/stories/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p className="card-text text-muted mb-2">{item.summary}</p>
                    <p className="card-text mb-2">
                      <small className="text-body-secondary">
                        📍 {item.location}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        📅 {item.startDate?.split("T")[0] || ""} -{" "}
                        {item.endDate?.split("T")[0] || ""}
                      </small>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== BOOTSTRAP MODAL FOR EDIT DESTINATION ========== */}
      <DestinationEditModal
        item={editingItem}
        destinationId={editingItem?._id}
        onSuccess={fetchDestinations}
        modalId="editDestinationModal"
      />

      {/* ========== BOOTSTRAP MODAL FOR ADD DESTINATION ========== */}
      <div
        className="modal fade"
        id="addDestinationModal"
        tabIndex="-1"
        aria-labelledby="addDestinationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
                      {isPublic ? "Public 🌍" : "Private 🔒"}
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
    </>
  );
};

export default Destination;
