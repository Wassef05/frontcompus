import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  console.log("Register data:", { username, email, password });
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  }).catch(error => {
    if (error.response && error.response.data) {
      console.error('Error during registration:', error.response.data.message);
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      console.error('Error during registration:', error.message);
      throw new Error("An unexpected error occurred. Please check your network connection.");
    }
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
