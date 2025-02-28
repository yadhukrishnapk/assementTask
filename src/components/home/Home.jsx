import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeTable from "./employeeTable/EmployeeTable";
import Header from "./header/Header";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";
  
  const { logoutUser } = useAuthActions();
  const { isAuthenticated, user } = useAuth();
  const {
    employees,
    totalEmployees,
    isLoading,
    isValidating,
    error,
    mutate
  } = useEmployees(currentPage, sortOrder, sortBy);

  const totalPages = Math.ceil(totalEmployees / 10);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), sortOrder, sortBy });
  };

  const handleSort = (column, newSortOrder) => {
    setSearchParams({ 
      page: currentPage.toString(), 
      sortOrder: newSortOrder,
      sortBy: column 
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        <Alert.Heading>Error loading employees</Alert.Heading>
        <p>{error.message}</p>
        <Button 
          variant="danger"
          onClick={() => mutate()} 
          className="mt-2"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="home-wrapper">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />

      <Container className="main-content mt-4">
        <Row>
          <Col>
            <div className="content-card">
              <h2 className="mb-4">Employee List</h2>
              
              {isLoading && !employees.length ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <>
                  <EmployeeTable 
                    employees={employees} 
                    navigate={navigate}
                    onSort={handleSort}
                    currentSortBy={sortBy}
                    currentSortOrder={sortOrder}
                  />

                  {isValidating && (
                    <div className="text-center text-muted my-2">
                      Refreshing data...
                    </div>
                  )}

                  <div className="pagination-controls">
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isValidating}
                    >
                      Previous
                    </Button>

                    {getPageNumbers().map((page) => (
                      <Button
                        key={page === "..." ? `ellipsis-${page}` : page} 
                        variant="secondary"
                        onClick={() => page !== "..." && handlePageChange(page)}
                        disabled={isValidating}
                        className={`mx-1 ${page === currentPage ? 'active' : ''}`}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages || isValidating}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>

        {!isAuthenticated && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="primary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
