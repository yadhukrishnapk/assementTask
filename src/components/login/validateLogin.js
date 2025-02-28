export const validateUsername = (value) => {
  if (!value) return "Username is required";
  if (value.length < 5) return "Username must be at least 5 characters long";
  return undefined;
};


export const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(value)) return "Password must contain at least one number";
  if (!/[@$!%*?&]/.test(value)) return "Password must contain at least one special character (@$!%*?&)";
  return undefined;
};

// export const validateUsername = (username) => {
//     if (!username.trim()) {
//       return "Username is required.";
//     }
//     if (username.length < 5) {
//       return "Username must be at least 5 characters long.";
//     }

//     return "";
//   };
  
  // export const validatePassword = (password) => {
  //   if (!password.trim()) {
  //     return "Password is required.";
  //   }
  //   if (password.length < 8) {
  //     return "Password must be at least 8 characters long.";
  //   }
  //   if (!/[A-Z]/.test(password)) {
  //     return "Password must contain at least one uppercase letter.";
  //   }
  //   if (!/[a-z]/.test(password)) {
  //     return "Password must contain at least one lowercase letter.";
  //   }
  //   if (!/[0-9]/.test(password)) {
  //     return "Password must contain at least one number.";
  //   }
  //   if (!/[@$!%*?&]/.test(password)) {
  //     return "Password must contain at least one special character (@$!%*?&).";
  //   }
  //   return "";
  // };
 