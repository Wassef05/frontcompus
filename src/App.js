import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router ,Routes, Route, Link, useLocation } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Register from "./components/Register";
// import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Header from "./components/common/header/Header";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import CoursesCard from './components/allcourses/CoursesCard';
import CourseDetails from './components/allcourses/CourseDetails';
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";

import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";

import Home from "./components/home/Home";
import Calendrier from "./components/calendrier/Calendrier";
import Projet from "./components/projet_stage/Projet";

import Stage from "./components/projet_stage/Stage";
import ParcoursUniv from "./components/parcours/Parcours";
import Presentation from "./components/presentation/Presentation";
import Login from "./components/Login";
import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message.actions";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import AdminDashboard from "./components/users/ADMIN/Board";
import EtudDashboard from "./components/users/ETUDIANT/Board";
import ScolDashboard from "./components/users/SCOLARITE/Board";
import ProfDahboard from "./components/users/PROF/Board";
import Body from "./components/users/ADMIN/ADMINDASH/BODYSECTION/Body Section/Body";
import Admindash2 from "./components/users/ADMIN/ADMINDASH/Admindash2/Admindash2";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import LoginGr from "./components/LoginGr";

//commit wassef  change



const App = () => {

  const options = {
    position: 'top center',
    timeout: 10000,
    offset: '30px',
    transition: 'scale'
  }
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth) || {};

  const dispatch = useDispatch();

  let location = useLocation();

  // useEffect(() => {
  //   if (["/login", "/register"].includes(location.pathname)) {
  //     dispatch(clearMessage()); // clear message when changing location
  //   }
  // }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <div>
      <nav className="">
        {/* <Link to={"/"} className="navbar-brand">
          Compus
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )} */}
        
        {!(location.pathname === '/etudiant-dashboard' || location.pathname === '/prof-dashboard' || location.pathname === '/admin-dashboard' || location.pathname === '/scolarite-dashboard') && <Header />}
    
  
        
      </nav>

      <div>
      
       
        <Routes>
         
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
         
        
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<CourseHome />} />
          <Route path='/team' element={<Team />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/journal' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/calendrier' element={<Calendrier/>} />
          <Route path='/projet' element={<Projet/>} />
          <Route path='/stage' element={<Stage/>} />
          <Route path='/parcours' element={<ParcoursUniv/>} />
          <Route path='/presentation' element={<Presentation/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/login2' element={<LoginGr/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile' element={<Profile/>} />
          {/* <Route path='/admin-dashboard' element={<AdminDashboard/>}/> */}
          <Route path='/etudiant-dashboard' element={<EtudDashboard/>}/>
          <Route path='/prof-dashboard' element={<ProfDahboard/>}/>
          <Route path='/scolarite-dashboard' element={<ScolDashboard/>}/>
          {/* <Route path='/admin/body' element={<Body/>}/>
          <Route path="/admin22" element ={<Admindash2/>}/> */}
     <Route path="/CoursesCard" element={<CoursesCard />} />
            <Route path="/course/:id" element={<CourseDetails />} />
          </Routes>
       
        <Footer />
       
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
    </AlertProvider>
  );
};

export default App;
