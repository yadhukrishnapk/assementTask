import React from "react";
import { Row, Col } from "react-bootstrap";
import FormField from "./FormField";
import SelectField from "./SelectField";
import FormSection from "./FormSection";
import { genderOptions } from "../../../../../utils/genderMapping";

const PersonalInformation = ({ today, requiredField, validatePhone, validateJoiningDate }) => (
  <FormSection title="Personal Information" icon={<i className="bi bi-person-vcard"></i>}>
    <Row>
      <Col md={6}>
        <FormField label="Name" name="name" validate={requiredField('Name')} placeholder="Full Name" />
        <FormField label="Email" name="email" type="email" validate={requiredField('Email')} placeholder="employee@company.com" />
        <FormField label="Phone" name="phone" validate={validatePhone} placeholder="+91 XXXXXXXXXX" />
        <SelectField label="Gender" name="gender" options={genderOptions} validate={requiredField('Gender')} valueKey="value" labelKey="label" />
      </Col>
      <Col md={6}>
        <FormField label="Date of Birth" name="date_of_birth" type="date" validate={requiredField('Date of Birth')} />
        <FormField label="Employee Code" name="employee_code" validate={requiredField('Employee Code')} placeholder="EMP-XXXX" />
        <FormField label="Salary" name="salary" type="number" validate={requiredField('Salary')} placeholder="0.00" />
        <FormField label="Joining Date" name="joining_date" type="date" validate={validateJoiningDate} max={today} />
      </Col>
    </Row>
  </FormSection>
);

export default PersonalInformation;
