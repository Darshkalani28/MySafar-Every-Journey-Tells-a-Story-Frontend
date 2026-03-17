import React from 'react'
import Stories from './Stories.jsx'
import { Link } from 'react-router-dom';

const Destination = () => {
  return (
    <>
    <h1 className="text-center" style={{ margin: "40px 0px", marginTop: "30px" }}>
        MySafar - Destinations!
      </h1>
      <div className='container'>

      <div className='row row-cols-1 row-cols-md-3 g-4'>
        <div className="col">
          <div className="card h-100">
          <Link to="/stories" style={{textDecoration:'none', color: 'inherit'}}>
          <div style= {{
                  display: "flex", 
                  justifyContent: "flex-end", 
                  position: "absolute", 
                  right: "0"
                }}>
            <span className="badge rounded-pill bg-danger"> New Trip </span>
          </div>
            <img src={"https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">My Trip to Dakor</h5>
              <p className="card-text">It's an Amazing Trip to Dakor.</p>
              <p className="card-text"><small className="text-body-secondary">By Darsh</small></p>
          </div>
          </Link>
        </div>
        </div>

      </div>
      </div>
    </> 
  )
}

export default Destination