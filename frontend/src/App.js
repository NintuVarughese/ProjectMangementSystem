import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Addproject from './Users/Addproject';
import EditProject from './Users/Editproject';
import ViewUser from './Users/Viewproject';
import AddMilestone from './Users/AddMilestone';
import ViewMilestones from './Users/ViewMilestones';
import ViewProjects from './Pages/ViewProjects';
import Login from './Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layout component for protected routes with Navbar
const ProtectedLayout = ({ isLoggedIn, currentProjectID, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar currentProjectID={currentProjectID} setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProjectID, setCurrentProjectID] = useState(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          {/* Protected Routes with Navbar */}
          <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} currentProjectID={currentProjectID} setIsLoggedIn={setIsLoggedIn} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/Addproject" element={<Addproject />} />
            <Route path="/editproject/:id" element={<EditProject />} />
            <Route path="/viewUser/:id" element={<ViewUser />} />
            <Route path="/view-projects" element={<ViewProjects setCurrentProjectID={setCurrentProjectID} />} />
            <Route path="/projects/:projectID/add-milestone" element={<AddMilestone />} />
            <Route path="/projects/:projectID/view-milestones" element={<ViewMilestones />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;