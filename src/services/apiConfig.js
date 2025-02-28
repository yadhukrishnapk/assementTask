export const API_BASE_URL = 'https://core-skill-test.webc.in/employee-portal/api/v1';

export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No authentication token found");
  
  return {
    Authorization: `Bearer ${token}`,
  };
};