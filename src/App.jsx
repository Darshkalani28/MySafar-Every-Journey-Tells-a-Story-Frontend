import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Get Jsx imoorts
import Destination from "./pages/Destination";
import Stories from "./pages/Stories";
import PublicFeed from "./pages/PublicFeed";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>

          <Route element= {<AuthLayout/>}>
          
          <Route exact path="/" element={<LandingPage/>} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/signup" element={<Signup />} />
          
          </Route>

          <Route element= {<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>

          <Route path="/explore" element={<PublicFeed />} />
          
          <Route exact path="/Destination" element={<Destination />} />

          <Route exact path="/detail/:destinationId" element={<Detail />} />

          <Route exact path="/Stories/:destinationId" element={<Stories />} />
          
          <Route path="/profile" element={<Profile />} />
          
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
