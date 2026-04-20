import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";
import "../styles/Profile.css";
import { MapPin, BookOpen, Globe, Calendar, Camera, Edit } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    trips: 0,
    stories: 0,
    photos: 0,
    countries: 0,
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    fullname: "",
    email: "",
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current user
  useEffect(() => {
    fetchCurrentUser();
    fetchUserStats();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await API.get(`/user/current-user/${userId}`); // add user id in this
      if (response.data.success || response.status === 200) {
        const userData = response.data.data;
        setUser(userData);
        setEditData({
          fullname: userData.fullname,
          email: userData.email,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      // Fetch destinations (trips)
      const destRes = await API.get("/destination/get-destination");
      const trips = destRes.data.fetchedDestination?.length || 0;

      // Fetch stories
      const storiesRes = await API.get("/stories/get-all-stories");
      const stories = storiesRes.data.fetchedAllStories?.length || 0;

      // Calculate photos and countries (if your backend doesn't provide direct count)
      let photos = 0;
      let countries = new Set();

      storiesRes.data.fetchedAllStories?.forEach((dest) => {
        if (dest.photos) {
          photos += dest.photos.length;
        }
        if (dest.country) {
          countries.add(dest.country);
        }
      });

      setStats({
        trips,
        stories,
        photos,
        countries: countries.size,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setError("");
    setSuccessMessage("");
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditData({
      fullname: user.fullname,
      email: user.email,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setError("");
      setSuccessMessage("");

      if (!editData.fullname || !editData.email) {
        setError("All fields are required");
        return;
      }

      const response = await API.put("/user/update-profile", {
        fullname: editData.fullname,
        email: editData.email,
      });

      if (response.data.success || response.status === 200) {
        setUser(response.data.data);
        setSuccessMessage("Profile updated successfully!");
        setEditMode(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setError("");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await API.put("/user/update-avatar", formData , {
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success || response.status === 200) {
        setUser(response.data.data);
        setSuccessMessage("Avatar updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      setError("Failed to update avatar");
    }
  };

  const handleChangePassword = async () => {
    try {
      setError("");
      setSuccessMessage("");

      if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setError("All password fields are required");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("New passwords do not match");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }

      const response = await API.post("/user/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
        setShowPasswordModal(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.message || "Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Failed to load profile. Please try again.
        </div>
      </div>
    );
  }

  const initials = user.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="profile-container">
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button type="button" className="btn-close" onClick={() => setError("")}></button>
      </div>}

      {successMessage && <div className="alert alert-success alert-dismissible fade show" role="alert">
        {successMessage}
        <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
      </div>}
          
      <div className="container profile-page">
  {/* Header Card */}

  <div className="card profile-card text-center shadow-sm">
    <div className="card-body">

      {/* Avatar */}
      <div className="profile-avatar-wrapper">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="profile-avatar-img" />
        ) : (
          <div className="profile-avatar-placeholder">{initials}</div>
        )}
      </div>

      {/* Edit Mode Form */}
      {editMode && (
        <div className="profile-edit-form-container mt-4 p-4 border rounded bg-light">
          <h5 className="mb-4">Edit Profile</h5>
          
          {/* Avatar Upload */}
          <div className="mb-4">
            <label className="form-label fw-bold">Profile Picture</label>
            <div className="profile-avatar-upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                id="avatar-input"
              />
              <label htmlFor="avatar-input" className="btn btn-outline-primary btn-sm">
                <Camera size={18} className="me-2" />
                Change Avatar
              </label>
              <p className="text-muted small mt-2">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Name/Fullname Input */}
          <div className="mb-4">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              value={editData.fullname}
              onChange={handleEditInputChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={editData.email}
              onChange={handleEditInputChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn px-2"
              style={{
                    background: "#0F4980",
                    color: "#ffffff",
                    borderRadius: 8,
                  }}
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button 
              className="btn1 px-2"
              style={{ borderRadius: 8 }}
              onClick={handleEditCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!editMode && (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <h2 className="mt-3">{user.fullname} </h2>
          <Edit 
            className="ms-3 mt-2" 
            color="#0F4980" 
            style={{ cursor: "pointer" }}
            onClick={handleEditClick}
          />
        </div>
      )}
      {!editMode && (
        <>
          <p className="text-muted">Wanderer • Storyteller • Explorer</p>
          <p className="text-secondary small text-sm"><MapPin size={16} color="#0F4980" /> Based in Somewhere</p>
        </>
      )}

    </div>
  </div>

  {/* Stats */}
  <div className="row text-center mt-4 g-3">
    {[
      { label: "Trips", value: stats.trips, icon: <Globe size={25} color="#0F4980"/> },
      { label: "Stories", value: stats.stories, icon: <BookOpen size={25} color="#0F4980"/> },
      { label: "Photos", value: stats.photos, icon: <Camera size={25} color="#0F4980"/> },
    ].map((item, i) => (
      <div className="col-md-4" key={i}>
        <div className="card profile-stat-card shadow-sm">
          <div className="card-body">
            <div className="profile-stat-icon">{item.icon}</div>
            <h4>{item.value}</h4>
            <p className="text-muted mb-0">{item.label}</p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* About */}
  <div className="card mt-4 shadow-sm">
    <div className="card-body">
      <h5>About</h5>
      <p className="text-muted">
        Passionate traveler documenting journeys across the globe. I believe every trip is a chapter in the story of life.
      </p>
    </div>
  </div>

  {/* Member Section */}
  <div className="card mt-3 shadow-sm">
    <div className="card-body d-flex align-items-center">
      <div className="profile-calendar-icon me-3"><Calendar size={30} color="#0F4980"/></div>
      <div>
        <strong>
          Member since{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </strong>
        <p className="text-muted mb-0">Exploring with MySafar</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Profile;
