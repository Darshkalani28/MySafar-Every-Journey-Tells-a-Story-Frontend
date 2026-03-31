import { useState } from "react";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Get Jsx imoorts
import Destination from "./pages/fetched/Destination";
import Stories from "./pages/fetched/Stories";
import Bucketlist from "./pages/fetched/Bucketlist";
import Wishlist from "./pages/fetched/Wishlist";

// Create Jsx imports
import CreateDestination from "./pages/create/CreateDestination";
import CreateStories from "./pages/create/CreateStories";
import CreateWishlist from "./pages/create/CreateWishlist";
import CreateBucketlist from "./pages/create/CreateBucketlist";

// Update Jsx imports
import UpdateDestination from "./pages/update/UpdateDestination";
import UpdateStories from "./pages/update/UpdateStories";
import UpdateWishlist from "./pages/update/UpdateWishlist";
import UpdateBucketlist from "./pages/update/UpdateBucketlist";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Destination />} />

          <Route exact path="/Destination" element={<Destination />} />
          <Route path="/create-destination" element={<CreateDestination />} />
          <Route
            path="/update-destination/:destinationId"
            element={<UpdateDestination />}
          />

          <Route exact path="/Stories/:destinationId" element={<Stories />} />
          <Route
            path="/create-stories/:destinationId"
            element={<CreateStories />}
          />
          <Route
            path="/update-stories/:destinationId/:storiesId"
            element={<UpdateStories />}
          />

          <Route exact path="/Wishlist/:destinationId" element={<Wishlist />} />
          <Route
            path="/create-wishlist/:destinationId"
            element={<CreateWishlist />}
          />
          <Route
            path="/update-wishlist/:destinationId/:wishlistId"
            element={<UpdateWishlist />}
          />

          <Route
            exact
            path="/Bucketlist/:destinationId"
            element={<Bucketlist />}
          />
          <Route
            path="/create-bucketlist/:destinationId"
            element={<CreateBucketlist />}
          />
          <Route
            path="/update-bucketlist/:destinationId/:bucketlistId"
            element={<UpdateBucketlist />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
