import React from 'react';

const FormSection = ({ title, icon, children, isModal = false }) => {
  return (
    <div className={`mb-4 ${isModal ? 'border p-3 rounded' : 'border p-4 rounded shadow-sm'}`}>
      <h5 className="d-flex align-items-center gap-2 mb-3">
        {icon}
        <span>{title}</span>
      </h5>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;