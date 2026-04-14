import React, { useState, useEffect } from "react";
import API from "../services/api";

const BucketlistModal = ({ destinationId, modalId = "bucketlistDisplayModal" }) => {
  const [bucketlist, setBucketlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ itemName: "", qty: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ itemName: "", qty: "" });

  const fetchBucketlist = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/bucketlist/get-bucketlist/${destinationId}`);
      const fetched = res.data.fetchedBucketlist.map((item) => ({
        ...item,
        done: item.done || false,
      }));
      setBucketlist(fetched);
    } catch (error) {
      console.log("Error Fetching Bucketlist: ", error);
    } finally {
      setLoading(false);
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

    } catch (error) {
      console.log("Error deleting Bucketlist: ", error);
    }
  };

  const completeCount = bucketlist.filter((item) => item.done).length;

  // Start editing
  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditingData({ itemName: item.itemName, qty: item.qty });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ itemName: "", qty: "" });
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    try {
      await API.put(`/bucketlist/update-bucketlist/${id}`, editingData);
      
      // Update in UI
      setBucketlist((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...editingData } : item
        )
      );
      
      setEditingId(null);
      setEditingData({ itemName: "", qty: "" });
    } catch (error) {
      console.log("Error updating bucketlist: ", error);
      alert("Error updating item!");
    }
  };

  // Handle add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        ...newItem,
        destinationId,
      };

      await API.post(`/bucketlist/create-bucketlist`, data);

      // Reset and refresh
      setNewItem({ itemName: "", qty: "" });
      setShowAddForm(false);
      fetchBucketlist();
    } catch (error) {
      console.log("Error creating bucketlist: ", error);
      alert("Check your bucket item!");
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="bucketlistModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <div>
              <h5 className="modal-title fw-bold" id="bucketlistModalLabel">
                Bucket List
              </h5>
              <small className="text-muted">
                {completeCount} of {bucketlist.length} experiences completed
              </small>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-body">
            {loading ? (
              <div className="text-center py-4">
                <p className="text-muted">Loading bucket list...</p>
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-12">

                  
                  {/* ADD ITEM FORM */}
                  {showAddForm && (
                    <div className="card mb-3 shadow-sm border-primary" style={{ borderRadius: 10 }}>
                      <div className="card-body p-3">
                        <form onSubmit={handleAddItem}>
                          <div className="mb-2">
                            <input
                              type="text"
                              placeholder="Goal name"
                              className="form-control"
                              value={newItem.itemName}
                              onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                              required
                              style={{ borderRadius: 6 }}
                              autoFocus
                            />
                          </div>
                          <div className="mb-3">
                            <textarea
                              placeholder="Description"
                              className="form-control"
                              value={newItem.qty}
                              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                              rows="2"
                              style={{ borderRadius: 6 }}
                            ></textarea>
                          </div>
                          <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-sm" style={{ background: "#0F4980", color: "#fff", borderRadius: 6 }}>
                              Submit
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => {
                                setShowAddForm(false);
                                setNewItem({ itemName: "", qty: "" });
                              }}
                              style={{ borderRadius: 6 }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* ADD BUTTON */}
                  {!showAddForm && (
                    <button 
                      className="btn1 btn-sm w-100 mb-3"
                      onClick={() => setShowAddForm(true)}
                      style={{ borderRadius: 6 }}
                    >
                      + Add Item
                    </button>
                  )}

                  {/* ITEMS LIST */}
                  {bucketlist.length === 0 && !showAddForm ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No bucket list items yet</p>
                    </div>
                  ) : (
                    bucketlist.map((item) => (
                      <div
                        key={item._id}
                        className={`card mb-2 shadow-sm ${
                          item.done ? "border-success" : "border-light"
                        }`}
                        style={{
                          cursor: editingId === item._id ? "default" : "pointer",
                          backgroundColor: item.done ? "#f7fff7" : "#fff",
                        }}
                        onClick={() => editingId !== item._id && handleToggleDone(item._id)}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between p-3">
                          <div className="d-flex align-items-center flex-grow-1">
                            {/* CHECKMARK */}
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: 30,
                                height: 30,
                                border: item.done ? "none" : "2px solid #0F4980",
                                backgroundColor: item.done
                                  ? "#0F4980"
                                  : "transparent",
                                color: item.done ? "#fff" : "#0F4980",
                                fontSize: 16,
                                userSelect: "none",
                                cursor: editingId === item._id ? "not-allowed" : "pointer",
                                opacity: editingId === item._id ? 0.5 : 1,
                              }}
                            >
                              {item.done ? "✓" : ""}
                            </div>

                            {/* CONTENT - EDIT MODE OR VIEW MODE */}
                            {editingId === item._id ? (
                              <div className="flex-grow-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm mb-2"
                                  value={editingData.itemName}
                                  onChange={(e) =>
                                    setEditingData({ ...editingData, itemName: e.target.value })
                                  }
                                  style={{ borderRadius: 6 }}
                                  autoFocus
                                />
                                <textarea
                                  className="form-control form-control-sm"
                                  value={editingData.qty}
                                  onChange={(e) =>
                                    setEditingData({ ...editingData, qty: e.target.value })
                                  }
                                  rows="2"
                                  style={{ borderRadius: 6, fontSize: "0.875rem" }}
                                ></textarea>
                              </div>
                            ) : (
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
                            )}
                          </div>

                          {/* ACTION BUTTONS */}
                          {editingId === item._id ? (
                            <div className="d-flex gap-1 ms-2">
                              <button
                                className="btn btn-sm"
                                onClick={() => handleSaveEdit(item._id)}
                                style={{ background: "#0F4980", color: "#fff", borderRadius: 6 }}
                              >
                                ✓ Done
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleCancelEdit}
                                style={{ borderRadius: 6 }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="dropdown" key={`dropdown-${item._id}`} onClick={(e) => e.stopPropagation()}>
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
                                    onClick={() => handleStartEdit(item)}
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
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucketlistModal;
