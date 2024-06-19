
// import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
// import './register.css'; 

// import { register } from "../actions/auth";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// const Register = () => {
//   const form = useRef();
//   const checkBtn = useRef();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState("");

//   const dispatch = useDispatch();

//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };

//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     setMessage("");
//     setSuccessful(false);

//     form.current.validateAll();

//     if (checkBtn.current.context._errors.length === 0) {
//       dispatch(register(username, email, password))
//         .then(() => {
//           setSuccessful(true);
//           setMessage("Registration successful!");
//         })
//         .catch((error) => {
//           setSuccessful(false);
//           setMessage(error.message);
//         });
//     }
//   };

//   return (
//     <div className="containerr">
//       <div className="card card-containers">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-cards"
//         />

//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-groups">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-controls"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>

//               <div className="form-groups">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-controls"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>

//               <div className="form-groups">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-controls"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>

//               <div className="form-groups">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}
//           {message && (
//             <div className="form-groups">
//               <div
//                 className={
//                   successful ? "alert alert-success" : "alert alert-danger"
//                 }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Register;






import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import Select from "react-validation/build/select";
import { isEmail } from "validator";
import { register } from "../actions/auth";

import video from "../assets/Video2.mp4";
// import logo from "../assets/logo.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import "./register.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("etudiant"); // Rôle par défaut
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  // const onChangeRole = (e) => {
  //   const role = e.target.value;
  //   setRole(role);
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="registergr flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Create And Vocation Now.</h2>
            <p>Adopt the peace of service</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={"/logingr"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            {/* <img src={logo} alt="Logo " /> */}
            <h3>Let Us Know You</h3>
          </div>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div className="form grid" style={{ margin: "1px !important" }}>
                <div className="inputDiv" style={{ margin: "1px !important" }}>
                  <label htmlFor="username">Username</label>
                  <div className="input flex">
                    <FaUserShield className="icon" />
                    <Input
                      type="text"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                </div>
                
                <div className="inputDiv" style={{ margin: "1px !important" }}>
                  <label htmlFor="email">Email</label>
                  <div className="input flex">
                    <MdMarkEmailRead className="icon" />
                    <Input
                      type="text"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>
                </div>

                <div className="inputDiv" style={{ margin: "1px !important" }}>
                  <label htmlFor="password">Password</label>
                  <div className="input flex">
                    <BsFillShieldLockFill className="icon" />
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>

                {/* <div className="inputDiv" style={{ margin: "1px !important" }}>
                  <label htmlFor="role">Role</label>
                  <div className="input flex">
                    <Select
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={onChangeRole}
                      validations={[required]}
                    >
                      <option value="etudiant">Etudiant</option>
                      <option value="prof">Prof</option>
                      <option value="modScolarite">Mod Scolarité</option>
                      <option value="admin">Admin</option>
                    </Select>
                  </div>
                </div> */}

                <button type="submit" className="btn flex">
                  <span>Register</span>
                  <AiOutlineSwapRight className="icon" />
                </button>
                <span className="forgotPassword">
                  Forgot your password? <button className="link-button" onClick={() => {/* handle click */}}>Click Here</button>
                </span>
              </div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
