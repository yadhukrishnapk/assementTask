import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert } from 'react-bootstrap';
import axios from "axios";
import { useEmployeeDetails } from "../../../../hooks/useEmployees";
import EditEmployeeForm from "./formEdit/FormEdit";
import Header from "../../header/Header";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthActions } from "../../../../services/authService";

const EMPLOYEE_UPDATE_API = "https://core-skill-test.webc.in/employee-portal/api/v1/employee/update";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, isLoading, error, mutate } = useEmployeeDetails(id);
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthActions();

  const handleFormSubmit = async (formData) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formDataToSend.append(key, value);
        }
      });

      formDataToSend.append("id", id);

      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }

      const response = await axios.post(EMPLOYEE_UPDATE_API, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await mutate({ ...employee, ...formData }, false);
      await mutate();

      navigate(`/employee/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      setSubmitError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      e.target.value = null;
      return;
    }
    setProfilePicture(file);
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light">
        <Header
          title="Employee Management"
          isAuthenticated={isAuthenticated}
          onLogout={logoutUser}
          userEmail={user?.email}
        />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '256px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light">
        <Header
          title="Employee Management"
          isAuthenticated={isAuthenticated}
          onLogout={logoutUser}
          userEmail={user?.email}
        />
        <Container className="py-4">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error loading employee details</Alert.Heading>
            <p>{error.message}</p>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />
      <EditEmployeeForm
        formData={employee || {}}
        onFileChange={handleFileChange}
        onSubmit={handleFormSubmit}
        onCancel={() => navigate(-1)}
        isSubmitting={isSubmitting}
        submitError={submitError}
        currentImage={employee?.profile_picture}
      />
    </div>
  );
};

export default EditEmployee;