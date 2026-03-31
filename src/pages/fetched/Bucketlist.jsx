import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { Link, useParams } from "react-router-dom";

const Bucketlist = () => {
  const { destinationId } = useParams();
  const [bucketlist, setBucketlist] = useState([]);

  const fetchBucketlist = async () => {
    try {
      const res = await API.get(`/bucketlist/get-bucketlist/${destinationId}`);
      const fetched = res.data.fetchedBucketlist.map((item) => ({
        ...item,
        done: item.done || false,
      }));
      setBucketlist(fetched);
    } catch (error) {
      console.log("Error Fetching Bucketlist: ", error);
    }
  };

  useEffect(() => {
    fetchBucketlist();
  }, [destinationId]);

  // Toggle complete status
  const handleToggleDone = (id) => {
    setBucketlist((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  // Delete Item
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/bucketlist/delete-bucketlist/${id}`);

      // Remove from UI instantly
      setBucketlist((prev) => prev.filter((item) => item._id !== id));

      alert("Deleted Successfully!");
    } catch (error) {
      console.log("Error deleting Stories: ", error);
    }
  };

  const completeCount = bucketlist.filter((item) => item.done).length;

  return (
    <div className="container mt-4" style={{ maxWidth: 880 }}>
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="mb-1">Bucket List</h1>
            <small className="text-muted">
              {completeCount} of {bucketlist.length} experiences completed
            </small>
          </div>

          <div className="d-flex align-items-center gap-2">
                    <Link to={`/stories/${destinationId}`}>
                      <button className="btn1 rounded-pill px-4 py-2" style={{ fontWeight: 600 }}>
                        Stories
                      </button>
                    </Link>
                    <Link to={`/create-bucketlist/${destinationId}`}>
                      <button className="btn1 rounded-pill px-4 py-2" style={{ fontWeight: 600, background: "#0F4980", color: "#e9e9e9" }}>
                        + Add Goal
                      </button>
                    </Link>
                    </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12">
            {bucketlist.map((item) => (
              <div
                key={item._id}
                className={`card mb-2 shadow-sm ${item.done ? "border-success" : "border-light"}`}
                style={{
                  cursor: "pointer",
                  backgroundColor: item.done ? "#f7fff7" : "#fff",
                }}
                onClick={() => handleToggleDone(item._id)}
              >
                <div className="card-body d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: 30,
                        height: 30,
                        border: item.done ? "none" : "2px solid #0F4980",
                        backgroundColor: item.done ? "#0F4980" : "transparent",
                        color: item.done ? "#fff" : "#0F4980",
                        fontSize: 16,
                        userSelect: "none",
                      }}
                    >
                      {item.done ? "✓" : ""}
                    </div>

                    <div>
                      <h5
                        className="mb-1"
                        style={{
                          textDecoration: item.done ? "line-through" : "none",
                          opacity: item.done ? 0.6 : 1,
                          marginBottom: 0,
                        }}
                      >
                        {item.itemName}
                      </h5>
                      <small
                        className="text-muted"
                        style={{
                          textDecoration: item.done ? "line-through" : "none",
                          opacity: item.done ? 0.6 : 0.8,
                        }}
                      >
                        {item.qty}
                      </small>
                    </div>
                  </div>

                  <div
                    className="dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                          to={`/update-bucketlist/${destinationId}/${item._id}`}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bucketlist;
