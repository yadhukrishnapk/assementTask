import useSWR from 'swr';
import { employeeService } from '../services/apiEmployees';

export const useEmployees = (page, sortOrder, sortBy, pageSize = 10) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [`employees`, { page, sortOrder, sortBy, pageSize }],
    () => employeeService.getEmployees({ page, sortOrder, sortBy, pageSize }),
    {
      keepPreviousData: true, 
      revalidateOnFocus: false, 
      revalidateOnReconnect: true,
      errorRetryCount: 3, 
      dedupingInterval: 5000, 
    }
  );

  return {
    employees: data?.data || [],
    totalEmployees: data?.total || 0,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const useEmployeeDetails = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? [`employee`, id] : null, 
    () => employeeService.getEmployeeById(id),
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 5000,
    }
  );

  return {
    employee: data,
    isLoading,
    error,
    mutate,
  };
};