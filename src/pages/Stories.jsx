import React from 'react'
import { Link } from 'react-router-dom';

const Stories = (props) => {

  let {title, summary, location, startDate, endDate, coverImage} = props;

  return (
    <div>
          <h1 className="text-center" style={{ margin: "40px 0px", marginTop: "30px" }}>
        MySafar - Stories!
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
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{summary}</p>
                    <p className="card-text"><small className="text-body-secondary">Location: {location} </small></p>
                    <p className="card-text"><small className="text-body-secondary">Start: {new Date(startDate).toGMTString()} </small></p>
                    <p className="card-text"><small className="text-body-secondary">End: {new Date(endDate).toGMTString()} </small></p>
                    {/* <p className="card-text"><small className="text-body-secondary">By {Username}}</small></p> */}
                </div>
                </Link>
              </div>
              </div>
      
            </div>
            </div>
    </div>
  )
}

export default Stories