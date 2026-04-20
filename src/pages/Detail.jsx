import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Detail.css";
import { ArrowLeft, MapPin, Calendar, Camera, Clock, Notebook } from "lucide-react";

const Detail = () => {
  const navigate = useNavigate();
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoGallery, setPhotoGallery] = useState([]);
  const [liked, setLiked] = useState(false);

  // This is for Calculating Days from the Date
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState(null);

  // This is for Calculating Days from the Date
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  };


  // Fetch destination details
  const fetchDestinationDetail = async () => {
    try {
      const res = await API.get(`/destination/get-destination`);
      const dest = res.data.fetchedDestination.find(
        (d) => d._id === destinationId
      );
      setDestination(dest);
    } catch (error) {
      console.log("Error fetching destination:", error);
    }
  };

  // Fetch stories for the destination
  const fetchStories = async () => {
    try {
      const res = await API.get(`/stories/get-stories/${destinationId}`);
      setStories(res.data.fetchedStories || []);

      // Extract photos from stories for the gallery
      const photos = res.data.fetchedStories
        ?.flatMap((story) => {
          const images = [];
          if (story.coverImage) images.push(story.coverImage);
          if (story.photos && Array.isArray(story.photos)) {
            images.push(...story.photos);
          }
          return images;
        })
        .filter((photo) => photo) || [];
      setPhotoGallery(photos.slice(0, 10)); // Limit to 10 photos
    } catch (error) {
      console.log("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDestinationDetail();
      await fetchStories();
      setLoading(false);
    };
    loadData();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">Destination not found</div>
      </div>
    );
  }

  // Calculate trip statistics
  const totalStories = stories.length;
  const startDate = destination.startDate
    ? new Date(destination.startDate).toLocaleDateString()
    : "Not specified";
  const endDate = destination.endDate
    ? new Date(destination.endDate).toLocaleDateString()
    : "Not specified";

  return (
    <div className="detail-page">

      {/* Hero Section */}
      <div className="container detail-hero-section detail-container position-relative">
        <div className="detail-space"></div>
        <img
          src={destination.coverImage || "travel.jpg"}
          alt={destination.title}
          className="detail-hero-image"
        />
        <div className="detail-hero-overlay"></div>

        {/* Back Button */}
        <button
          className="detail-back-btn"
          onClick={() => navigate(-1)}
          title="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Destination Info Overlay */}
        <div className="detail-hero-content">
          <h1 className="detail-hero-title">{destination.title}</h1>
          <div className="detail-hero-meta">
            <span className="detail-meta-item">
              <MapPin size={16} /> {destination.location}
            </span>
            {destination.startDate && (
              <span className="detail-meta-item">
                <Calendar size={16} /> {startDate} to {endDate} 
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container detail-container">
        {/* Trip Summary Section */}
        <section className="detail-trip-summary mt-5 mb-5">
          <h2 className="detail-section-title mb-4">
            <Notebook size={25}  color="#0F4980"/> Trip Summary
          </h2>
          <div className="detail-summary-card">
            <p className="detail-summary-text">{destination.summary || "No summary provided"}</p>

            {/* Stats Row */}
            <div className="detail-stats-row mt-4">
              <div className="detail-stat-item">
                <span className="detail-stat-number">
                  {calculateDays(destination.startDate, destination.endDate)}
                </span>
                <span className="detail-stat-label">Days</span>
              </div>
              <div className="detail-stat-divider"></div>
              <div className="detail-stat-item">
                <span className="detail-stat-number">{totalStories}</span>
                <span className="detail-stat-label">Stories</span>
              </div>
              <div className="detail-stat-divider"></div>
              <div className="detail-stat-item">
                <span className="detail-stat-number">{photoGallery.length}</span>
                <span className="detail-stat-label">Photos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        {stories.length > 0 && (
          <section className="detail-journey-timeline mb-5">
            <h2 className="detail-section-title mb-4">
              <Clock size={25}  color="#0F4980"/> Journey Timeline
            </h2>

            <div className="detail-timeline">
              {stories.map((story, index) => (
                <div className="detail-timeline-item" key={story._id}>
                  <div className="detail-timeline-marker">
                    <div className="detail-marker-number">{index + 1}</div>
                  </div>

                  <div className="detail-timeline-content">
                  <Link
                    to={`/stories/${destinationId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="detail-timeline-card">
                      <h3 className="detail-timeline-title">{story.title}</h3>
                      {story.description && (
                        <p className="detail-timeline-description">{story.description}</p>
                      )}
                      <div className="detail-timeline-cards-footer">
                        <span className="detail-timeline-activity">
                          {story.activity || "Experience"}
                        </span>
                        {story.date && (
                          <span className="detail-timeline-date">
                            {new Date(story.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo Gallery Section */}
        {photoGallery.length > 0 && (
          <section className="detail-photo-gallery mb-5 pb-5">
            <h2 className="detail-section-title mb-4">
              <Camera size={25}  color="#0F4980"/> Photo Gallery
            </h2>

            <div className="detail-gallery-grid">
              {photoGallery.map((photo, index) => (
                <div className="detail-gallery-item" key={index}>
                  <img src={photo} alt={`Gallery ${index + 1}`} />
                  <div className="detail-gallery-overlay"></div>
                </div>
              ))}
            </div>

            {/* View All Stories Link */}
            {totalStories > 0 && (
              <div className="detail-view-all-container mt-4">
                <Link
                  to={`/stories/${destinationId}`}
                  className="detail-view-all-btn"
                >
                  View All Stories
                </Link>
              </div>
            )}
          </section>
        )}

        {/* No Stories Message */}
        {stories.length === 0 && (
          <section className="detail-empty-state my-5 text-center py-5">
            <p className="text-muted mb-3">No stories yet for this destination</p>
            <Link to={`/stories/${destinationId}`} className="btn btn-primary rounded-pill px-4">
              Add Travel Story
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default Detail;
