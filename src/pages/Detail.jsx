<><div style={{ display: editingId === item._id ? "flex" : "none" }} className="d-flex gap-1 ms-2">
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

<div className="dropdown" style={{ display: editingId === item._id ? "none" : "flex" }} onClick={(e) => e.stopPropagation()}>
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

                          </>