import React, { useState } from "react";
import { schools } from "../../../public/schools";
import { useDynasty } from "../../contexts/DynastyContext";

const CreateDynastyForm = () => {
  const [formData, setFormData] = useState({
    dynastyName: "",
    schoolName: "",
    year: 2024,
  });
  const [message, setMessage] = useState({ type: null, text: "" });
  const { createDynasty } = useDynasty();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createDynasty({
        dynasty_name: formData.dynastyName,
        school_name: formData.schoolName,
        year: formData.year,
      });

      setMessage({ type: "success", text: "Dynasty created successfully!" });
      setFormData({ dynastyName: "", schoolName: "", year: 2024 });
    } catch (error) {
      // Handle API error responses
      const errorMessage =
        error.response?.error?.join(", ") || // Combine error messages if an array
        error.message || // Fallback to custom error message
        "An error occurred. Please try again."; // Default fallback

      setMessage({ type: "error", text: errorMessage });
    }
  };

  const renderOptions = (options) =>
    options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));

  return (
    <div>
      <h2>Create Dynasty</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dynastyName">Dynasty Name</label>
          <input
            type="text"
            id="dynastyName"
            value={formData.dynastyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="schoolName">School Name</label>
          <select
            id="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a school
            </option>
            {renderOptions(schools)}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <select
            id="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            {renderOptions(Array.from({ length: 31 }, (_, i) => 2024 + i))}
          </select>
        </div>
        <div>
          <button type="submit">Create Dynasty</button>
        </div>
      </form>

      {message.text && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default CreateDynastyForm;
