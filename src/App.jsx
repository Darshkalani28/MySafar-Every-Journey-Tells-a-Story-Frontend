import { useState } from 'react'
import Navbar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Destination from "./pages/Destination";
import Stories from './pages/Stories';
import Bucketlist from './pages/Bucketlist';
import Wishlist from './pages/Wishlist';


function App() {

  const [count, setCount] = useState(0)
  let title = "Trip to Goa";
  let summary = "Amazing Adventure trip to Goa";
  let location = "Goa, India";
  let startDate = "2026-03-12";
  let endDate = "2026-03-18";
  let coverImage = "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720";



  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          
          <Route exact path='/' element={ <Destination/> } />

          <Route exact path='/Destination' element={ <Destination/> } />
          
          <Route exact path='/Stories' element={ <Stories title={title} summary={summary} location={location} startDate={startDate} endDate={endDate} coverImage={coverImage}/> } />
          
          <Route exact path='/Wishlist' element={ <Wishlist/> } />
          
          <Route exact path='/Bucketlist' element={ <Bucketlist/> } />
        
        </Routes> 
    </Router>
    </div>
  )
}

export default App
