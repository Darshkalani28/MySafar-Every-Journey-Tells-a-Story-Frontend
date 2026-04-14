import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import StoryFormModal from "../components/StoryFormModal";
import StoryEditModal from "../components/StoryEditModal";
import WishlistModal from "../components/WishlistModal";
import BucketlistModal from "../components/BucketlistModal";

const Stories = (props) => {
  const navigate = useNavigate();
  const { destinationId } = useParams();
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);

  const fetchStories = async () => {
    try {
      const res = await API.get(`/stories/get-stories/${destinationId}`);
      setStories(res.data.fetchedStories);
    } catch (error) {
      console.log("Error Fetching Stories: ", error);
    }
  };
  useEffect(() => {
    fetchStories();
  }, []);

  // Delete Stories
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    
    if (!confirmDelete) return;
    
    try {
      await API.delete(`/stories/delete-stories/${id}`);
      
      // Remove from UI Instantly
      setStories((prev) => prev.filter((item) => item._id !== id));
      alert("Deleted Successfully!");
      navigate(`/stories/${destinationId}`);
    } catch (error) {
      console.log("Error deleting Stories:", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h1 className="mb-1" style={{ fontSize: "2.5rem" }}>
            Stories
          </h1>
          <p className="text-muted mb-0">Memories from your adventures.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          
          <button 
            className="btn1 rounded-pill px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#wishlistDisplayModal"
          >
            Wishlist
          </button>
    
          <button 
            className="btn1 rounded-pill px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#bucketlistDisplayModal"
          >
            Bucketlist
          </button>
          <button 
            className="btn1 rounded-pill px-4 py-2" 
            style={{ fontWeight: 600, background: "#0F4980", color: "#e9e9e9" }}
            data-bs-toggle="modal"
            data-bs-target="#addStoryModal"
          >
            + New Stories
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {stories.map((item) => (

          <div className="col" key={item._id}>
            <div
              className="card h-100 shadow-sm border-0"
              style={{ borderRadius: 15 }}
            >
              {/* IMAGE SECTION WITH BADGE */}
              <div className="position-relative">

                  <img
                    src={ item.coverImage || "travel.jpg" }
                    style={{
                      height: 225,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="card-img-top"
                    alt="Stories"
                  />
              </div>

                {/* Body */}
                <div className="card-body pb-3" style={{ minHeight: 200 }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{item.title}</h5>
                    <div className="dropdown">
                      <button
                        className="btn1 btn-sm"
                        style={{ boxShadow: "0 0 8px rgba(0,0,0,0.2)", borderRadius: "25%" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ⋮
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setEditingStory(item)}
                            data-bs-toggle="modal"
                            data-bs-target="#editStoryModal"
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

                  <p className="card-text text-muted mb-2">
                    {item.description}
                  </p>
                  <p className="card-text mb-3">
                    <small className="text-body-secondary">
                      📍 {item.location}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      📅 {item.days} days
                    </small>
                  </p>
                </div>
            </div>
          </div>
))}
      </div>

      {/* REUSABLE STORY FORM MODAL COMPONENT */}
      <StoryFormModal 
        destinationId={destinationId}
        onSuccess={fetchStories}
        modalId="addStoryModal"
      />

      {/* REUSABLE STORY EDIT MODAL COMPONENT */}
      <StoryEditModal 
        item={editingStory}
        storiesId={editingStory?._id}
        onSuccess={fetchStories}
        modalId="editStoryModal"
      />

      {/* WISHLIST DISPLAY MODAL COMPONENT */}
      <WishlistModal 
        destinationId={destinationId}
        modalId="wishlistDisplayModal"
      />

      {/* BUCKETLIST DISPLAY MODAL COMPONENT */}
      <BucketlistModal 
        destinationId={destinationId}
        modalId="bucketlistDisplayModal"
      />
    </div>
  );
};

export default Stories;
