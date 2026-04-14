import React, { useState, useEffect } from "react";
import Stories from "./Stories.jsx";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import DestinationEditModal from "../components/DestinationEditModal.jsx";
import DestinationCreateModal from "../components/DestinationCreateModal.jsx";

const Destination = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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

      {/* ========== BOOTSTRAP MODAL FOR CREATE DESTINATION ========== */}
      <DestinationCreateModal
        onSuccess={fetchDestinations}
        modalId="addDestinationModal"
      />
    </>
  );
};

export default Destination;
