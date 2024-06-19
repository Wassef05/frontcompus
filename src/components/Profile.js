import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EventBus from "../common/EventBus";
import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth || {});

  const [counter, setCounter] = useState(0);
  const [activeRole, setActiveRole] = useState(""); 

  useEffect(() => {
    let roleRedirectPath = '';
  
    // Check the user's roles and set the redirect path and active role
    if (currentUser && currentUser.roles) {
      if (currentUser.roles.includes("ROLE_ADMIN")) {
        roleRedirectPath = '/admin/body';
        setActiveRole("ROLE_ADMIN"); // Use setActiveRole as a function to update the state
      } else if (currentUser.roles.includes("ROLE_MODSCOLARITE")) {
        roleRedirectPath = '/scolarite-dashboard';
        setActiveRole("ROLE_MODSCOLARITE");
      } else if (currentUser.roles.includes("ROLE_PROF")) {
        roleRedirectPath = '/prof-dashboard';
        setActiveRole("ROLE_PROF");
      } else if (currentUser.roles.includes("ROLE_ETUDIANT")) {
        roleRedirectPath = '/etudiant-dashboard';
        setActiveRole("ROLE_ETUDIANT");
      }
    }

    // If a redirect path is set, start the countdown
    if (roleRedirectPath) {
      const timer = counter > 0 && setTimeout(() => {
        setCounter(c => c - 1);
      }, 1000);

      // Redirect when the counter reaches 0
      if (counter === 0) {
        navigate(roleRedirectPath);
      }

      // Clear the timer on cleanup
      return () => timer && clearTimeout(timer);
    }
  }, [currentUser, counter, navigate]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    EventBus.dispatch("logout");
    navigate("/login");
  };

  return (
    <div className="container profile-container">
      <header className="jumbotron profile-header">
        <h3>
          <strong>I'am:{currentUser.username}</strong> 
        </h3>
      </header>
      <table className="table table-bordered profile-table">
        <tbody>
          <tr>
            <th>Token</th>
            <td>{currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <td>{currentUser.id}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{currentUser.email}</td>
          </tr>
          <tr>
            <th>Authorities</th>
            <td>
              <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleLogout} className="btn btn-primary btn-block">
        Logout
      </button>
      {currentUser.roles.includes(activeRole) && counter > 0 && (
        <div className="alert alert-warning" role="alert">
          Redirection vers votre espace après {counter} secondes.
        </div>
      )}
    </div>
  );
};

export default Profile;
