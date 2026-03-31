import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const CreateWishlist = () => {
  const navigate = useNavigate();
  const { destinationId } = useParams();

  const [formData, setFormdata] = useState({
    name: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        destinationId,
      };
      console.log("🚀 ~ handleSubmit ~ data:", data.name);
      console.log("🚀 ~ handleSubmit ~ data:", data);

      const res = await API.post("/wishlist/create-wishlist", data);
      alert("Wishlist Created Successfully!!");

      // Change after you edit
      navigate(`/wishlist/${destinationId}`); // redirect to Destination Page
    } catch (error) {
      console.log("Error Creating Wishlist item: ", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Create Wishlist</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="note"
            placeholder="Note"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary">Create Wishlist</button>
        </form>
      </div>
    </div>
  );
};

export default CreateWishlist;
