const generateHeightOptions = () => {
  const heights = [];
  for (let feet = 5; feet <= 7; feet++) {
    for (
      let inches = 0;
      (inches <= 11) & !(feet == 7 && inches == 1);
      inches++
    ) {
      heights.push(`${feet}'${inches}`);
    }
  }
  return heights;
};

// Update PlayerForm component
export const heightOptions = generateHeightOptions();

export const heightToInches = (heightString) => {
  const [feet, inches] = heightString.split("'").map(Number);
  return feet * 12 + inches;
};
