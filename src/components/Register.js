import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserAuthenticationReducer";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!/^[A-Z][a-zA-Z]{0,24}$/.test(username)) {
      errors.username = "Username must start with a capital letter, be no more than 25 characters.";
    }

    if (age < 18 || age > 90) {
      errors.age = "Age must be between 18 and 90.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password.length < 8 || password.length > 25) {
      errors.password = "Password must be between 8 and 25 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const register = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = {
        id: Date.now(),
        username,
        age,
        email,
        password
      };
      
      dispatch(addUser(user));
      
      console.log("Registered User:", user);

      alert("Registration Successful");
      navigate("/add"); 
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={register}>
        <h1 className="register-heading">Register</h1>

        <div>
          <input
            className="register-inputs"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <div className="register-error">{errors.username}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            max="90"
            required
          />
          {errors.age && <div className="register-error">{errors.age}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="register-error">{errors.email}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="register-error">{errors.password}</div>}
        </div>

        <div>
          <button className="register-btn" type="submit">
            Register
          </button>
        </div>

        <p className="register-text">
          Already have an account? Then{" "}
          <span className="register-click" onClick={goToLogin}>
            click here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;