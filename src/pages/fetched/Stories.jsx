import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const Stories = (props) => {
  const navigate = useNavigate();
  const { destinationId } = useParams();
  const [stories, setStories] = useState([]);

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
          
          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#wishlistModal">
            Launch demo modal
          </button> */}
  

          <Link to={`/wishlist/${destinationId}`}>
            <button className="btn1 rounded-pill px-4 py-2" data-bs-toggle="modal" data-bs-target="#wishlistModal">
              Wishlist
            </button>

          </Link>
    
          <Link to={`/bucketlist/${destinationId}`}>
            <button className="btn1 rounded-pill px-4 py-2">
              Bucketlist
            </button>
          </Link>
          <Link to={`/create-stories/${destinationId}`}>
            <button className="btn1 rounded-pill px-4 py-2" style={{ fontWeight: 600, background: "#0F4980", color: "#e9e9e9" }}>
              + New Stories
            </button>
          </Link>
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
                <Link
                  to={`/wishlist/${destinationId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={
                      item.coverImage ||
                      "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720"
                    }
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
                </Link>
              </div>

              <Link
                to={`/wishlist/${destinationId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                          <Link
                            className="dropdown-item"
                            to={`/update-stories/${destinationId}/${item._id}`}
                          >
                            ✏️ Edit
                          </Link>
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
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
