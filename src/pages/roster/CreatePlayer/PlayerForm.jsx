import React, { useState } from "react";
import FormField from "../../../components/ui/FormField";
import { positions } from "../../../utils/positions";
import { useRoster } from "../../../services/contexts/RosterContext";
import { devTraits, classYears, states } from "../../../utils/utils";
import { heightOptions, heightToInches } from "../../../utils/heights";
import "./PlayerForm.css";
import RedshirtButton from "./RedshirtButton";
import NumberInput from "../../../components/ui/NumberInput";
import { createPlayerDefaultValues } from "../../../utils/defaultValues";

const PlayerForm = () => {
  const [formData, setFormData] = useState(createPlayerDefaultValues);
  const { createPlayer } = useRoster();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "position" && { archetype: "" }),
    }));
  };

  const redshirtToggle = () => {
    setFormData((prevState) => ({
      ...prevState, // Keep all the previous properties the same
      redshirted: !formData.redshirted, // Update only the redshirted value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerData = {
      // Required fields
      first_name: formData.firstName,
      last_name: formData.lastName,
      class_year: formData.classYear,
      position: formData.position,
      archetype: formData.archetype,
      overall: formData.overall,
      dev_trait: formData.devTrait,
      redshirted: formData.redshirted,
      current_redshirt: formData.currentRedshirt,

      // Optional fields (only include if not empty)
      ...(formData.height && {
        height: heightToInches(formData.height),
      }),
      ...(formData.weight && { weight: formData.weight }),
      ...(formData.skillCaps && { skill_caps: formData.skillCaps }),
      ...(formData.hometown && { hometown: formData.hometown }),
      ...(formData.homeState && { home_state: formData.homeState }),
    };

    console.log(playerData);

    createPlayer(playerData);
    setFormData(createPlayerDefaultValues);
  };

  const potentialArchetypes = formData.position
    ? positions[formData.position]
    : [];

  const validateOverall = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value)));
    setFormData((prev) => ({ ...prev, overall: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="player-form__section">
        <h3 className="player-form__section-header">Required Player Info</h3>
        {/* Existing Required Fields */}
        <FormField
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          // placeholder={"First Name"}
          showLabel={true}
          required
        />
        <FormField
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          // placeholder={"Last Name"}
          showLabel={true}
          required
        />
        <div className="player-form--flex">
          <FormField
            label="Class Year"
            type="select"
            id="classYear"
            name="classYear"
            value={formData.classYear}
            onChange={handleChange}
            options={classYears}
            className={"w-80"}
            required
            showLabel={true}
          />
          <div>
            <label>{"  "}</label>
            <RedshirtButton
              isToggled={formData.redshirted}
              onToggle={redshirtToggle}
            />
          </div>
        </div>

        <div className="player-form--flex">
          <FormField
            label="Position"
            type="select"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            options={Object.keys(positions)}
            className={"player-form--flex--small"}
            showLabel={true}
            required
          />
          <FormField
            type="select"
            label="Archetype"
            id="archetype"
            name="archetype"
            value={formData.archetype}
            onChange={handleChange}
            options={potentialArchetypes}
            disabled={!formData.position}
            showLabel={true}
            required
          />
        </div>

        <div className="player-form__overall-section">
          <label>Overall</label>
          <NumberInput
            defaultValue={formData.overall}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                overall: value,
              }))
            }
          />
        </div>
        {/* 
          <FormField
            type="number"
            // label="Overall"
            id="overall"
            name="overall"
            value={formData.overall}
            onChange={handleChange}
            onInput={validateOverall}
            min="10"
            max="99"
            showLabel={true}
            className={"player-form--flex--small"}
          /> */}

        {/* <FormField
        type="checkbox"
        label="Redshirted"
        id="redshirted"
        name="redshirted"
        value={formData.redshirted}
        onChange={handleChange}
        disabled={formData.currentRedshirt}
        showLabel={true}
      /> */}
        {/* <FormField
        type="checkbox"
        label="Current Redshirt"
        id="currentRedshirt"
        name="currentRedshirt"
        value={formData.currentRedshirt}
        onChange={handleChange}
        disabled={formData.redshirted}
        showLabel={true}
      /> */}
      </div>

      {/* New Optional Fields */}
      <div className="player-form__section">
        <h3 className="player-form__section-header">Optional Player Info</h3>
        <div className="player-form--flex player-form--flex--70-30">
          <FormField
            type="select"
            label="Development Trait"
            id="devTrait"
            name="devTrait"
            value={formData.devTrait}
            onChange={handleChange}
            options={devTraits}
            showLabel={true}
          />
          <FormField
            type="number"
            label="Skill Caps"
            id="skillCaps"
            name="skillCaps"
            value={formData.skillCaps}
            onChange={handleChange}
            min="0"
            max="40"
            showLabel={true}
          />
        </div>
        {/* <div className="player-form--flex">
          <label>Height</label>
          <FormField
            // label="Height"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            options={heightOptions}
            placeholder={"Feet"}
            showLabel={true}
          />
          <FormField
            // label="Height"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            options={heightOptions}
            placeholder={"Inches"}
            showLabel={true}
          />
        </div>
        <FormField
          type="range"
          label="Weight"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min="150"
          max="415"
          showLabel={true}
        /> */}

        <div className="player-form--flex player-form--flex--70-30">
          <FormField
            label="Hometown"
            id="hometown"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
            // placeholder="Hometown"
            showLabel={true}
          />
          <FormField
            type="select"
            label="State"
            id="homeState"
            name="homeState"
            value={formData.homeState}
            onChange={handleChange}
            options={states}
            className={"w-30"}
            showLabel={true}
          />
        </div>
      </div>

      <button type="submit">Create Player</button>
    </form>
  );
};

export default PlayerForm;
