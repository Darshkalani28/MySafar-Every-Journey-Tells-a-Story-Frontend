import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Get Jsx imoorts
import Destination from "./pages/Destination";
import Stories from "./pages/Stories";
import PublicFeed from "./pages/PublicFeed";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Destination />} />

          <Route exact path="/Destination" element={<Destination />} />

          <Route exact path="/Stories/:destinationId" element={<Stories />} />
          
          <Route path="/explore" element={<PublicFeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
