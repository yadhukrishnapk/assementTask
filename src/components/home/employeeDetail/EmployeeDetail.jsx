import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, Image, Modal } from 'react-bootstrap';
import axios from "axios";
import { useEmployeeDetails } from "../../../hooks/useEmployees";
import { getGenderLabel } from "../../../utils/genderMapping";
import Header from "../header/Header";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthActions } from "../../../services/authService";
import EditEmployeeForm from "../employeeDetail/edit/formEdit/FormEdit";

const EMPLOYEE_UPDATE_API = "https://core-skill-test.webc.in/employee-portal/api/v1/employee/update";

const DetailItem = ({ label, value }) => (
  <Card className="h-100">
    <Card.Body className="p-3">
      <Card.Subtitle className="mb-1 text-muted">{label}</Card.Subtitle>
      <Card.Text className="fs-5">{value || "N/A"}</Card.Text>
    </Card.Body>
  </Card>
);

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, isLoading, error, mutate } = useEmployeeDetails(id);
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthActions();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      setShowEditModal(false); 
      setProfilePicture(null); 
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error loading employee details</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      );
    }

    if (!employee) {
      return (
        <Alert variant="warning" className="text-center">
          No employee found.
        </Alert>
      );
    }

    return (
      <Card className="border-0 shadow">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
              className="px-4"
            >
              <i className="bi bi-arrow-left me-2"></i>Back
            </Button>
            <h2 className="text-primary fs-2 fw-bold m-0">Employee Details</h2>
            <Button
              variant="success"
              onClick={() => setShowEditModal(true)}
              className="px-4"
            >
              <i className="bi bi-pencil-square me-2"></i>Edit
            </Button>
          </div>
    
          {employee.profile_picture && (
            <div className="text-center mb-4">
              <Image
                src={employee.profile_picture}
                roundedCircle
                className="border border-4 border-primary-subtle"
                style={{ width: '128px', height: '128px', objectFit: 'cover' }}
              />
            </div>
          )}
    
          <Row className="g-3">
            <Col md={6}>
              <DetailItem label="Employee ID" value={employee.employee_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Name" value={employee.name} />
            </Col>
            <Col md={6}>
              <DetailItem label="Email" value={employee.email} />
            </Col>
            <Col md={6}>
              <DetailItem label="Phone" value={employee.phone} />
            </Col>
            <Col md={6}>
              <DetailItem label="Gender" value={getGenderLabel(employee.gender)} />
            </Col>
            <Col md={6}>
              <DetailItem label="Date of Birth" value={employee.date_of_birth} />
            </Col>
            <Col md={6}>
              <DetailItem label="Address" value={employee.address} />
            </Col>
            <Col md={6}>
              <DetailItem label="City" value={employee.city} />
            </Col>
            <Col md={6}>
              <DetailItem label="State" value={employee.state} />
            </Col>
            <Col md={6}>
              <DetailItem label="Zip Code" value={employee.zip_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Country" value={employee.country} />
            </Col>
            <Col md={6}>
              <DetailItem label="Designation" value={employee.designation?.title || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Department" value={employee.department?.name || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Employment Type" value={employee.employment_type?.title || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Joining Date" value={employee.joining_date} />
            </Col>
            <Col md={6}>
              <DetailItem label="Salary" value={`$${employee.salary}`} />
            </Col>
            <Col md={6}>
              <DetailItem label="Bank Account Number" value={employee.bank_account_number} />
            </Col>
            <Col md={6}>
              <DetailItem label="IFSC Code" value={employee.ifsc_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Emergency Contact" value={employee.emergency_contact} />
            </Col>
            <Col md={6}>
              <DetailItem 
                label="Created By" 
                value={`${employee.created_by?.name || "N/A"} (${employee.formatted_created_at || "N/A"})`} 
              />
            </Col>
            <Col md={6}>
              <DetailItem 
                label="Updated By" 
                value={`${employee.updated_by?.name || "N/A"} (${employee.formatted_updated_at || "N/A"})`} 
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />
      <Container className="py-4">
        {renderContent()}

        {/* Edit Employee Modal */}
        <Modal 
          show={showEditModal} 
          onHide={() => setShowEditModal(false)}
          size="lg"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            {employee && (
              <EditEmployeeForm
                formData={employee}
                onFileChange={handleFileChange}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowEditModal(false);
                  setSubmitError(null);
                }}
                isSubmitting={isSubmitting}
                submitError={submitError}
                currentImage={employee.profile_picture}
                isModal={true}
              />
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default EmployeeDetails;