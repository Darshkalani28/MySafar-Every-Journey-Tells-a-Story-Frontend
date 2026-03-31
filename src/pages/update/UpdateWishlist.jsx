import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const UpdateWishlist = () => {
  const { destinationId, wishlistId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    note: "",
  });

  const fetchWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/get-wishlist/${destinationId}`);

      const selected = res.data.fetchedWishlist.find(
        (item) => item._id === wishlistId,
      );

      if (selected) {
        setFormData({
          name: selected.name,
          note: selected.note,
        });
      }
    } catch (error) {
      console.log("Error Fetching Wishlist: ", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [wishlistId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/wishlist/update-wishlist/${wishlistId}`, formData);
      alert("Wishlist Updated Successfully!");
      navigate(`/wishlist/${destinationId}`);
    } catch (error) {
      console.log("Error Updating Wishlist: ", error);
    }
  };
  return (
    <div>
      <div className="container mt-4">
        <h2>Update Wishlist</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="note"
            className="form-control mb-2"
            value={formData.note}
            onChange={handleChange}
          />

          <button className="btn btn-primary">Update Wishlist</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWishlist;
