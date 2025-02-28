import React, { useState } from "react"; // Added useState import
import { Form as InformedForm, RadioGroup, Radio } from "informed";
import { Container, Row, Col, Form, Button, Card, Alert, Image, Spinner, Badge } from 'react-bootstrap';
import { genderOptions } from "../../../../../utils/genderMapping";
import { useMasterData } from "../../../../../hooks/useMasterData";
import FormField from "./FormField";
import SelectField from "./SelectField";
import FormSection from "./FormSection";
import { requiredField, validatePhone, validateJoiningDate, validateEmail, validateBankAccount, validateIFSC } from "./validation";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toastMessage";
import RadioField from "./RadioField";

const EditEmployeeForm = ({
  formData,
  onFileChange,
  onSubmit,
  onCancel,
  isSubmitting,
  submitError,
  currentImage,
  isModal = false
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [profilePictureChanged, setProfilePictureChanged] = useState(false); // New state to track profile picture change
  
  const { data: departments, loading: loadingDepartments, error: departmentsError } = useMasterData('/settings/departments');
  const { data: designations, loading: loadingDesignations, error: designationsError } = useMasterData('/settings/designations');
  const { data: employmentTypes, loading: loadingEmploymentTypes, error: employmentTypesError } = useMasterData('/settings/employment-types');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePictureChanged(true); // Set flag when a new file is selected
      onFileChange(event); // Call the parent's onFileChange handler
    }
  };

  const handleSubmit = async ({ values }) => {
    const formattedData = {
      id: formData.id,
      name: values.name || formData.name,
      email: values.email || formData.email,
      phone: values.phone || formData.phone,
      gender: values.gender || formData.gender,
      date_of_birth: values.date_of_birth || formData.date_of_birth,
      employee_code: values.employee_code || formData.employee_code,
      salary: values.salary || formData.salary,
      address: values.address || formData.address,
      city: values.city || formData.city,
      state: values.state || formData.state,
      zip_code: values.zip_code || formData.zip_code,
      country: values.country || formData.country,
      bank_account_number: values.bank_account_number || formData.bank_account_number,
      ifsc_code: values.ifsc_code || formData.ifsc_code,
      designation_id: values.designation_id || formData.designation_id,
      department_id: values.department_id || formData.department_id,
      employment_type_id: values.employment_type_id || formData.employment_type_id,
      joining_date: values.joining_date || formData.joining_date,
      emergency_contact: values.emergency_contact || formData.emergency_contact
    };
    
    const cleanedData = Object.fromEntries(
      Object.entries(formattedData).filter(([_, value]) => value != null)
    );

    try {
      await onSubmit(cleanedData); 
      showSuccessToast("Employee details updated successfully!");
      setProfilePictureChanged(false); // Reset the flag after successful submission
    } catch (error) {
      showErrorToast("Failed to update employee details.");
      throw error; 
    }
  };

  const CardComponent = isModal ? 'div' : Card;
  const ContainerComponent = isModal ? 'div' : Container;
  
  return (
    <ContainerComponent className={isModal ? '' : 'py-4'}>
      <CardComponent 
        className={isModal ? '' : 'mx-auto shadow-sm'} 
        style={isModal ? {} : { maxWidth: '768px' }}
      >
        <div className={isModal ? 'p-3' : 'p-4'}>
          {!isModal && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0">Edit Employee</h2>
              <Badge bg="primary" className="px-3 py-2">ID: {formData.id}</Badge>
            </div>
          )}
          
          {submitError && (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {submitError}
            </Alert>
          )}

          <InformedForm 
            onSubmit={handleSubmit} 
            focusOnInvalid={true}
            initialValues={{
              ...formData,
              gender: String(formData.gender) 
            }}
            validateOn="change"
          >
            {({ formState }) => (
              <>
                {/* Profile Picture Section */}
                <FormSection title="Profile Picture" icon={<i className="bi bi-person-circle"></i>} isModal={isModal}>
                  <div className="mb-4">
                    {currentImage && (
                      <div className="mb-3 text-center">
                        <Image
                          src={currentImage}
                          alt="Current profile"
                          style={{ width: isModal ? '80px' : '128px', height: isModal ? '80px' : '128px', objectFit: 'cover' }}
                          className="rounded-circle border shadow-sm"
                        />
                        <p className="text-muted mt-2 small">Current Profile Picture</p>
                      </div>
                    )}
                    <Form.Group>
                      <Form.Label>Update Profile Picture:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange} // Use local handler
                        size="sm"
                        className="form-control-sm"
                      />
                      <Form.Text className="text-muted">
                        Recommended size: 300x300px (Max: 2MB)
                      </Form.Text>
                    </Form.Group>
                  </div>
                </FormSection>

                {/* Personal Information Section */}
                <FormSection title="Personal Information" icon={<i className="bi bi-person-vcard"></i>} isModal={isModal}>
                  <Row>
                    <Col md={6}>
                      <FormField 
                        label="Name" 
                        name="name" 
                        validate={requiredField('Name')}
                        placeholder="Full Name"
                      />
                      <FormField 
                        label="Email" 
                        name="email" 
                        type="email" 
                        validate={validateEmail}
                        placeholder="employee@company.com"
                      />
                      <FormField
                        label="Phone"
                        name="phone"
                        formatter=" +91##########"
                        parser={(value) => value.replace("+1 ", "").replace(/-/g, "")}
                        validate={validatePhone}
                        placeholder="+91 XXXXXXXXXX"
                      />
                      <RadioField
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        validate={requiredField('Gender')}
                      />
                    </Col>
                    <Col md={6}>
                      <FormField 
                        label="Date of Birth" 
                        name="date_of_birth" 
                        type="date" 
                        validate={requiredField('Date of Birth')}
                      />
                      <FormField 
                        label="Employee Code" 
                        name="employee_code" 
                        validate={requiredField('Employee Code')}
                        placeholder="EMP-XXXX"
                      />
                      <FormField 
                        label="Salary" 
                        name="salary" 
                        type="number" 
                        validate={requiredField('Salary')}
                        placeholder="0.00"
                      />
                      <FormField 
                        label="Joining Date" 
                        name="joining_date" 
                        type="date" 
                        validate={validateJoiningDate}
                        max={today}
                      />
                    </Col>
                  </Row>
                </FormSection>

                {/* Department Information Section */}
                <FormSection title="Department Information" icon={<i className="bi bi-building"></i>} isModal={isModal}>
                  <Row>
                    <Col md={6}>
                      <SelectField
                        label="Department"
                        name="department_id"
                        options={departments}
                        isLoading={loadingDepartments}
                        loadingMessage="Loading departments..."
                        error={departmentsError}
                        errorMessage="Error loading departments"
                        validate={requiredField('Department')}
                      />
                      <SelectField
                        label="Employment Type"
                        name="employment_type_id"
                        options={employmentTypes}
                        isLoading={loadingEmploymentTypes}
                        loadingMessage="Loading employment types..."
                        error={employmentTypesError}
                        errorMessage="Error loading employment types"
                        validate={requiredField('Employment Type')}
                        labelKey="title"
                      />
                    </Col>
                    <Col md={6}>
                      <SelectField
                        label="Designation"
                        name="designation_id"
                        options={designations}
                        isLoading={loadingDesignations}
                        loadingMessage="Loading designations..."
                        error={designationsError}
                        errorMessage="Error loading designations"
                        validate={requiredField('Designation')}
                        labelKey="title"
                      />
                    </Col>
                  </Row>
                </FormSection>

                {/* Address Information Section */}
                <FormSection title="Address Information" icon={<i className="bi bi-geo-alt"></i>} isModal={isModal}>
                  <FormField 
                    label="Address" 
                    name="address" 
                    validate={requiredField('Address')}
                    placeholder="Street address"
                  />
                  <Row>
                    <Col md={6}>
                      <FormField 
                        label="City" 
                        name="city" 
                        validate={requiredField('City')}
                        placeholder="City"
                      />
                      <FormField 
                        label="State" 
                        name="state" 
                        validate={requiredField('State')}
                        placeholder="State"
                      />
                    </Col>
                    <Col md={6}>
                      <FormField 
                        label="Zip Code" 
                        name="zip_code" 
                        validate={requiredField('Zip Code')}
                        placeholder="Zip Code"
                      />
                      <FormField 
                        label="Country" 
                        name="country" 
                        validate={requiredField('Country')}
                        placeholder="Country"
                      />
                    </Col>
                  </Row>
                </FormSection>

                {/* Bank Information Section */}
                <FormSection title="Bank Information" icon={<i className="bi bi-bank"></i>} isModal={isModal}>
                  <Row>
                    <Col md={6}>
                      <FormField 
                        label="Bank Account Number" 
                        name="bank_account_number" 
                        validate={validateBankAccount}
                        placeholder="XXXXXXXXXXXXX"
                      />
                    </Col>
                    <Col md={6}>
                      <FormField 
                        label="IFSC Code" 
                        name="ifsc_code" 
                        validate={validateIFSC}
                        placeholder="XXXXX0000000"
                      />
                    </Col>
                  </Row>
                </FormSection>

                {/* Form Actions */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || (formState.pristine && !profilePictureChanged)} // Updated disabled logic
                    className="px-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </InformedForm>
        </div>
      </CardComponent>
    </ContainerComponent>
  );
};

export default EditEmployeeForm;