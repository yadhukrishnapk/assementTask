export const genderOptions = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Other" }
  ];
  
  export const getGenderLabel = (value) => {
    const gender = genderOptions.find(g => g.value === String(value));
    return gender ? gender.label : "Unknown";
  };
  