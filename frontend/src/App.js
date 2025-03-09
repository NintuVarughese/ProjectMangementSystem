import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Addproject from './Users/Addproject';
import EditProject from './Users/Editproject';
import ViewUser from './Users/Viewproject';
import AddMilestone from './Users/AddMilestone';
import ViewMilestones from "./Users/ViewMilestones";
import ViewProjects from './Pages/ViewProjects';
import Login from './Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProjectID, setCurrentProjectID] = useState(null); 

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar currentProjectID={currentProjectID} />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/Addproject" element={isLoggedIn ? <Addproject /> : <Navigate to="/" />} />
          <Route path="/editproject/:id" element={isLoggedIn ? <EditProject /> : <Navigate to="/" />} />
          <Route path="/viewUser/:id" element={isLoggedIn ? <ViewUser /> : <Navigate to="/" />} />
          <Route path="/view-projects" element={isLoggedIn ? <ViewProjects setCurrentProjectID={setCurrentProjectID} /> : <Navigate to="/" />} />

          {/* Route to Add a Milestone */}
          <Route path="/projects/:projectID/add-milestone" element={isLoggedIn ? <AddMilestone /> : <Navigate to="/" />} />

          {/* Route to View Milestones */}
          <Route path="/projects/:projectID/view-milestones" element={isLoggedIn ? <ViewMilestones /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;