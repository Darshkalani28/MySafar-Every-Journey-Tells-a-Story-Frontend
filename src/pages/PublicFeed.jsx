import React, { useEffect, useState } from 'react'
import API from '../services/api';
import { Link, useNavigate } from "react-router-dom";

const PublicFeed = () => {
    const [destinations, setDestinations] = useState([]);
    const fetchPublicData = async () => {
        try {
            const res = await API.get("/destination/public-destinations");
            setDestinations(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
      fetchPublicData();  
    }, []);
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h1 className="mb-1" style={{ fontSize: "2.5rem" }}>
              Destinations
            </h1>
            <p className="text-muted mb-0">
              All the places you&apos;ve explored.
            </p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {destinations.map((item) => (
            <div className="col" key={item._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: 15 }}
              >
                {/* IMAGE SECTION WITH STORY BADGE + 3 DOT MENU */}
                <div className="position-relative">
                  <Link
                    to={`/stories/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={item.coverImage || "travel.jpg"}
                      onClick={() => setImage(item._id)}
                      style={{
                        height: 200,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="card-img-top"
                      alt="destination"
                    />

                  </Link>
                </div>

                {/* Body */}
                <div className="card-body pb-3" style={{ Height: 200 }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Link
                      to={`/stories/${item._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <h5 className="card-title mb-0">{item.title}</h5>
                    </Link>
                  </div>
                  <Link
                    to={`/stories/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p className="card-text text-muted mb-2">{item.summary}</p>
                    <p className="card-text mb-2">
                      <small className="text-body-secondary">
                        📍 {item.location}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        📅 {item.startDate?.split("T")[0] || ""} -{" "}
                        {item.endDate?.split("T")[0] || ""}
                      </small>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PublicFeed
