import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import useAuthStore from '../../../store/authStore';

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="header-container">
      <h1 className="header-title">
        <Link to="/" className="text-white text-decoration-none hover:text-gray-300">
          {title}
        </Link>
      </h1>
      {isAuthenticated && (
        <Dropdown
          show={isDropdownOpen}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Dropdown.Toggle variant="primary" className="bg-blue-600 border-none">
            <span>{user?.email}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="dropdown-menu-custom">
            <Dropdown.Item
              onClick={handleLogout}
              className="dropdown-item-custom logout-button"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;
