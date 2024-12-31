import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Registration

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Switch between login and registration forms
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
