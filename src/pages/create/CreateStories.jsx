import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const CreateStories = (props) => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
    location: "",
    days: "",
  });

  const [coverImage, setCoverImage] = useState(null);

  const [images, setImages] = useState([]);

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle coverImage
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // Handle Images
  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("destinationId", destinationId);

      // append coverImage
      if (coverImage) {
        data.append("coverImage", coverImage);
      }

      // append Images
      if (images) {
        images.forEach((image) => {
          data.append("photos", image);
        });
      }

      const res = await API.post(`/stories/create-stories`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Destination Created Successfully!");

      navigate(`/stories/${destinationId}`); // redirect to destination page
    } catch (error) {
      console.log("Error Creating Stories: ", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Create Story</h2>

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
            name="description"
            placeholder="Description"
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
          />

          <input
            type="number"
            name="days"
            placeholder="Days"
            className="form-control mb-2"
            onChange={handleChange}
          />

          <input
            type="file"
            className="form-control mb-2"
            onChange={handleCoverImageChange}
          />

          <input
            type="file"
            multiple
            className="form-control mb-3"
            onChange={handleImagesChange}
          />

          <button className="btn btn-primary">Create Story</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStories;
