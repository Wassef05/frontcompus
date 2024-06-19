import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EventBus from '../../../common/EventBus'








const AdminDashboard = () => {

    const { user: currentUser } = useSelector((state) => state.auth);
    let navigate = useNavigate();
  
    // Reuse the logout handler from the Profile component
    const handleLogout = () => {
      EventBus.dispatch("logout");
      navigate("/login");
    };
  
    // Redirect to login if not logged in or if the user is not an admin
    if (!currentUser || !currentUser.roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/login" />;
    }
  return (
    <div className="admin-dashboard" style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-primary btn-block">
        Logout
      </button>
    
      <div className="row" style={{ display: 'flex', marginBottom: '20px' }}>
        <div className="card" style={{ flex: 1, marginRight: '10px', padding: '20px' }}>
          <h3>Card 1</h3>
          <p>Details of Card 1</p>
        </div>
        <div className="card" style={{ flex: 1, marginLeft: '10px', padding: '20px' }}>
          <h3>Card 2</h3>
          <p>Details of Card 2</p>
        </div>
      </div>


      <div className="row" style={{ display: 'flex' }}>
        <div className="card" style={{ flex: 1, marginRight: '10px', padding: '20px' }}>
          <h3>Card 3</h3>
          <p>Details of Card 3</p>
        </div>
        <div className="card" style={{ flex: 1, marginLeft: '10px', padding: '20px' }}>
          <h3>Card 4</h3>
          <p>Details of Card 4</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
