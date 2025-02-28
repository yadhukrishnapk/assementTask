import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

export const employeeService = {
  async getEmployees({ page, sortOrder = 'asc', sortBy = 'name', pageSize = 10 }) {
    const response = await axios.get(
      `${API_BASE_URL}/employee`,
      {
        params: {
          page,
          length: pageSize,
          sort_order: sortOrder,
          sort_by: sortBy
        },
        headers: getAuthHeaders()
      }
    );
    return response.data?.data?.rows || { data: [], total: 0 };
  },

  async getEmployeeById(id) {
    const response = await axios.get(
      `${API_BASE_URL}/employee/show`,
      {
        params: { id },
        headers: getAuthHeaders()
      }
    );
    return response.data?.data;
  }
};