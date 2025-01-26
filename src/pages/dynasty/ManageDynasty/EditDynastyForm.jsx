import { useState } from "react";
import React from "react";
import { schools } from "../../../utils/schools";
import { useDynasty } from "../../../services/contexts/DynastyContext";

const EditDynastyForm = ({ dynasty, onSubmit }) => {
  const [formData, setFormData] = useState({
    dynastyName: dynasty.dynasty_name,
    schoolName: dynasty.school_name,
    year: dynasty.year,
  });

  const { editDynasty } = useDynasty();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const renderOptions = (options) =>
    options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      dynasty_name: formData.dynastyName,
      school_name: formData.school_name,
      year: formData.year,
    };

    try {
      await editDynasty(dynasty.id, updates);
    } catch (err) {
      console.log(err);
    } finally {
      onSubmit();
    }
  };

  return (
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
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default EditDynastyForm;
