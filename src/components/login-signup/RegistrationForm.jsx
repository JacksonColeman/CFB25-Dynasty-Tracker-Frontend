import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { user: formData };
      const data = await api.signup(userData);
      console.log(data);

      if (data.success) {
        setSuccessMessage(data.message);
        setError(null);
        // Redirect to login page
        setTimeout(() => {
          console.log("navigating to login");
          navigate("/login");
        }, 1000); // Redirect after 2 seconds
      } else {
        setError(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link
        to="/login"
        className="font-medium text-blue-600 hover:text-blue-500"
      >
        Already have an account? Log in
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
