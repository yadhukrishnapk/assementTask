export const requiredField = (field) => (value) => !value ? `${field} is required` : undefined;

export const validateJoiningDate = (value) => {
  if (!value) return "Joining Date is required";
  
  const selectedDate = new Date(value);
  const todayDate = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);
  
  if (selectedDate > todayDate) {
    return "Joining Date cannot be in the future";
  }
  
  return undefined;
};

export const validatePhone = (value) => {
  if (!value) return "Phone is required";
  if (value.replace(/\D/g, "").length < 12) return "Phone number not valid";
  return undefined;
};

export const validateEmail = (value) => {
  if (!value) {
    return 'Email is required';
  }
  
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
};

export const validateBankAccount = (value) => {
  if (!value) {
    return 'Bank Account Number is required';
  }
  
  // Validates Indian bank account numbers (9-18 digits)
  const accountRegex = /^[0-9]{9,18}$/;
  
  if (!accountRegex.test(value)) {
    return 'Please enter a valid bank account number (9-18 digits)';
  }
  
  return undefined;
};

export const validateIFSC = (value) => {
  if (!value) {
    return 'IFSC Code is required';
  }
  
  // Validates Indian IFSC code format (4 letters followed by 0 and 6 alphanumeric characters)
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
  if (!ifscRegex.test(value)) {
    return 'Please enter a valid IFSC code (e.g., SBIN0123456)';
  }
  
  return undefined;
};