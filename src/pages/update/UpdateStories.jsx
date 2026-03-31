import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const UpdateStories = () => {
  const { destinationId, storiesId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    days: "",
  });

  const fetchStories = async () => {
    try {
      const res = await API.get(`/stories/get-stories/${destinationId}`);

      const selected = res.data.fetchedStories.find(
        (item) => item._id === storiesId,
      );

      if (selected) {
        setFormData({
          title: selected.title,
          description: selected.description,
          location: selected.location,
          days: selected.days,
        });
      }
    } catch (error) {
      console.log("Error Fetching Stories: ", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [storiesId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/stories/update-stories/${storiesId}`, formData);
      alert("Stories Update Successfully!");
      navigate(`/stories/${destinationId}`);
    } catch (error) {
      console.log("Error Updating Stories: ", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Update Story</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            className="form-control mb-2"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            className="form-control mb-2"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="number"
            name="days"
            className="form-control mb-2"
            value={formData.days}
            onChange={handleChange}
          />

          <button className="btn btn-primary">Update Story</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStories;
