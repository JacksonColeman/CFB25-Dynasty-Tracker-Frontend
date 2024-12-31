import React, { useState } from "react";
import { schools } from "../../../public/schools";

const CreateDynastyForm = () => {
  // State to hold form values
  const [dynastyName, setDynastyName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [year, setYear] = useState(2024); // Default year
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      dynasty_name: dynastyName,
      school_name: schoolName,
      year: year,
    };

    try {
      const response = await fetch("/api/dynasties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Dynasty created successfully!");
        setError(null); // Clear any previous error messages
        // Optionally clear form fields after successful submission
        setDynastyName("");
        setSchoolName("");
        setYear(2024);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
        setSuccessMessage(null); // Clear any previous success message
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Create Dynasty</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dynastyName">Dynasty Name</label>
          <input
            type="text"
            id="dynastyName"
            value={dynastyName}
            onChange={(e) => setDynastyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="schoolName">School Name</label>
          <select
            id="schoolName"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a school
            </option>
            {schools.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            {Array.from({ length: 31 }, (_, i) => 2024 + i).map(
              (yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <button type="submit">Create Dynasty</button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default CreateDynastyForm;
