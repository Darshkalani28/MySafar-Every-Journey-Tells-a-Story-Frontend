import React, { useState } from "react";
import API from "../../services/api.js";
import { useNavigate } from "react-router-dom";

const CreateDestination = () => {
  const navigate = useNavigate();

  const [formData, setFormdata] = useState({
    title: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const [image, setImage] = useState(null);

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

      navigate("/"); // redirect to destination page
    } catch (error) {
      console.log("Error creating destination: ", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Create Destination</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="summary"
            placeholder="Summary"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="startDate"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="endDate"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImageChange}
          />

          <button className="btn btn-primary">Create Destination</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDestination;
