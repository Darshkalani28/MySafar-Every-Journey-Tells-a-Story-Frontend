import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

const UpdateBucketlist = () => {
  const { destinationId, bucketlistId } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    qty: "",
  });

  const fetchBucketlist = async () => {
    try {
      const res = await API.get(`bucketlist/get-bucketlist/${destinationId}`);

      const selected = res.data.fetchedBucketlist.find(
        (item) => item._id === bucketlistId,
      );

      if (selected) {
        setFormData({
          itemName: selected.itemName,
          qty: selected.qty,
        });
      }
    } catch (error) {
      console.log("Error Fetching Bucketlist item: ", error);
    }
  };

  useEffect(() => {
    fetchBucketlist();
  }, [bucketlistId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/bucketlist/update-bucketlist/${bucketlistId}`, formData);
      alert("Bucketlist item Updated Successfully!");
      navigate(`/bucketlist/${destinationId}`);
    } catch (error) {
      console.log("Error Updating Bucketlist item: ", error);
    }
  };
  return (
    <div>
      <div className="container mt-4">
        <h2>Update Bucketlist</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="itemName"
            className="form-control mb-2"
            value={formData.itemName}
            onChange={handleChange}
          />

          <input
            type="number"
            name="qty"
            className="form-control mb-2"
            value={formData.qty}
            onChange={handleChange}
          />

          <button className="btn btn-primary">Update Bucketlist</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBucketlist;
