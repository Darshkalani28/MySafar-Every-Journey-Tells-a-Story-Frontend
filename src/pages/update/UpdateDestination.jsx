import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const UpdateDestination = () => {
  const { destinationId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const fetchDestination = async () => {
    try {
      const res = await API.get("/destination/get-destination");

      const selected = res.data.fetchedDestination.find(
        (item) => item._id === destinationId,
      );
      console.log("🚀 ~ fetchDestination ~ elect:", selected);

      if (selected) {
        setFormData({
          title: selected.title,
          summary: selected.summary,
          location: selected.location,
          startDate: selected.startDate?.split("T")[0],
          endDate: selected.endDate?.split("T")[0],
        });
      }
    } catch (error) {
      console.log("Error fetching destination: ", error);
    }
  };

  useEffect(() => {
    // console.log(formData.title);
    // console.log(formData.summary);
    // console.log(formData.location);
    // console.log(formData.startDate);
    // console.log(formData.endDate);
    fetchDestination();
  }, [destinationId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/destination/update-destination/${destinationId}`,
        formData,
      );

      alert("Destination Update Succefully!");

      navigate("/");
    } catch (error) {
      console.log("Error Updating Destination: ", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Update Destination</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="summary"
            className="form-control mb-2"
            value={formData.summary}
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
            type="date"
            name="startDate"
            className="form-control mb-2"
            value={formData.startDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            className="form-control mb-2"
            value={formData.endDate}
            onChange={handleChange}
          />

          <button className="btn btn-primary">Update Destination</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDestination;
