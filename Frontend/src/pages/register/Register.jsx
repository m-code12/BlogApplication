import { useState } from "react";
import "./register.css";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const userData = {
      userName: userName,
      password: password,
      email: email,
    };
    try {
      let response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        response = await response.json();
        throw new Error(response.message);
      }
      const alert = alertDetails;
      alert.severity = "success";
      alert.message = "SignUp Successful, Please login";
      setAlertDetails(alert);
      setOpenAlert(true);
    } catch (error) {
      const alert = alertDetails;
      alert.severity = "error";
      alert.message = error.message;
      setAlertDetails(alert);
      setOpenAlert(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={userNameChangeHandler}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={emailChangeHandler}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={passwordChangeHandler}
        />
        <button
          className="registerButton"
          type="submit"
          onClick={signUpHandler}
        >
          Register
        </button>
      </form>
      <Link to={"/login"}>
        <button className="registerLoginButton">Login</button>
      </Link>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertDetails.severity}
          onClose={handleClose}
          variant="filled"
          elevation={6}
        >
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
