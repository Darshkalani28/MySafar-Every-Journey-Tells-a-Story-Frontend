import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const CreateBucketlist = () => {
  const navigate = useNavigate();
  const { destinationId } = useParams();

  const [formData, setFormdata] = useState({
    itemName: "",
    qty: "",
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
      console.log("🚀 ~ handleSubmit ~ data:", data.itemName);
      console.log("🚀 ~ handleSubmit ~ data:", data);
      const res = await API.post("/bucketlist/create-bucketlist", data);
      alert("Bucketlist item is Created Successfully!!");

      navigate(`/bucketlist/${destinationId}`);
    } catch (error) {}
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Create Bucketlist</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="qty"
            placeholder="Quantity"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary">Create Bucketlist</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBucketlist;
