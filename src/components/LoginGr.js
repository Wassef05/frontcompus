import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import {login} from '../actions/auth'
import { Link } from 'react-router-dom'
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import './LoginGr.css'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill} from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import logo from '../assets/campusconnect.jpg'
// import logo2 from '../assets/dashetud.jpg'
import video from '../assets/Animation (2).mp4'

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
const LoginGr = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
            .then((response) => {
                const user = response.user;
                if (user.roles.includes("ROLE_ADMIN")) {
                    navigate("/admin/body");
                } else {
                    navigate("/Home");
                }
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user.roles.includes("ROLE_ADMIN")) {
            return <Navigate to="/admin/body" />;
        } else {
            return <Navigate to="/Home" />;
        }
    }

    return (
        <div className='logingr flex'>
        <div className='container flex'>
            <div className='videoDiv' style={{}}>
                <video src={video} autoPlay muted loop></video>
               
                <div className="textDiv">
                    {/* <h2 className='title'> Create And Vocation</h2> */}
                    <h3 className='title' >Start and Thank me later</h3>
                </div>

                <div className='footerDiv flex'>

                    <span className='text'> Don't have an account? </span>
                    <Link to={'/registergr'}> 
                    <button className='btn'> Sign Up</button>
                    </Link>

                 
                </div>
            </div>


            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo} alt="Logo" />
                    <h3>Welcome Back!</h3>
                </div>
                <div action='' className='formlogin'>
                    <Form onSubmit={handleLogin} ref={form}>
                        <div className='inputDiv' onSubmit={handleLogin} ref={form}>
                            <label htmlFor="username" >Username</label>
                            <div className='input flex'>
                                <FaUserShield className='iconn'/>
                                <Input type="text" id="username" placeholder='Enter Username' 
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required]}
                                    style={{"background":"#efefef"}}
                                />
                            </div>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor="password">Password</label>
                            <div className='input flex'>
                                <BsFillShieldLockFill className='iconn'/>
                                <Input type="password" id="password" placeholder='Enter Password' 
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                    style={{"background":"#efefef"}}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn flex' disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                            <AiOutlineSwapRight className='iconn'/>
                        </button>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                    </div>
            </div>
            
            
        </div> 
        </div>
    )
}

export default LoginGr;
