import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, error: authError, resetError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset the error when the component is mounted or when the location changes
    resetError();
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);

      // After successful login, redirect to the originally requested URL or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      // Error is already handled in auth context
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Login to Dynasty Tracker</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {authError && (
            <div>
              <div>{authError}</div>
            </div>
          )}

          <div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

          <div>
            <div>
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
