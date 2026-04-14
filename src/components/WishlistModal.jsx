import React, { useState, useEffect } from "react";
import API from "../services/api";

const WishlistModal = ({ destinationId, modalId = "wishlistDisplayModal" }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", note: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", note: "" });

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/wishlist/get-wishlist/${destinationId}`);
      const fetched = res.data.fetchedWishlist.map((item) => ({
        ...item,
        done: item.done || false,
      }));
      setWishlist(fetched);
    } catch (error) {
      console.log("Error Fetching Wishlist: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [destinationId]);

  // Toggle complete status
  const handleToggleDone = (id) => {
    setWishlist((prev) =>
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
      await API.delete(`/wishlist/delete-wishlist/${id}`);

      // Remove from UI instantly
      setWishlist((prev) => prev.filter((item) => item._id !== id));

    } catch (error) {
      console.log("Error Deleting Wishlist item: ", error);
    }
  };

  const completeCount = wishlist.filter((item) => item.done).length;

  // Start editing
  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditingData({ name: item.name, note: item.note });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: "", note: "" });
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    try {
      await API.put(`/wishlist/update-wishlist/${id}`, editingData);
      
      // Update in UI
      setWishlist((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...editingData } : item
        )
      );

      setEditingId(null);
      setEditingData({ name: "", note: "" });
    } catch (error) {
      console.log("Error updating wishlist: ", error);
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

      await API.post(`/wishlist/create-wishlist`, data);


      // Reset and refresh
      setNewItem({ name: "", note: "" });
      setShowAddForm(false);
      fetchWishlist();
    } catch (error) {
      console.log("Error creating wishlist: ", error);
      alert("Error creating item!");
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="wishlistModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ borderRadius: 15 }}>
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0">
            <div>
              <h5 className="modal-title fw-bold" id="wishlistModalLabel">
                Wishlist
              </h5>
              <small className="text-muted">
                {completeCount} of {wishlist.length} experiences completed
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
                <p className="text-muted">Loading wishlist...</p>
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
                              placeholder="Item name"
                              className="form-control"
                              value={newItem.name}
                              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                              required
                              style={{ borderRadius: 6 }}
                              autoFocus
                            />
                          </div>
                          <div className="mb-3">
                            <textarea
                              placeholder="Note"
                              className="form-control"
                              value={newItem.note}
                              onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
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
                                setNewItem({ name: "", note: "" });
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
                  {wishlist.length === 0 && !showAddForm ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No wishlist items yet</p>
                    </div>
                  ) : (
                    wishlist.map((item) => (
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
                                  value={editingData.name}
                                  onChange={(e) =>
                                    setEditingData({ ...editingData, name: e.target.value })
                                  }
                                  style={{ borderRadius: 6 }}
                                  autoFocus
                                />
                                <textarea
                                  className="form-control form-control-sm"
                                  value={editingData.note}
                                  onChange={(e) =>
                                    setEditingData({ ...editingData, note: e.target.value })
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
                                  {item.name}
                                </h5>
                                <small
                                  className="text-muted"
                                  style={{
                                    textDecoration: item.done ? "line-through" : "none",
                                    opacity: item.done ? 0.6 : 0.8,
                                  }}
                                >
                                  {item.note}
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

export default WishlistModal;
