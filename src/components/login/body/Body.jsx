import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../../services/authService";
import { showSuccessToast, showErrorToast } from "../../../utils/toastMessage";
import LoginForm from "../loginform/LoginForm";
import { Container, Row, Col } from "react-bootstrap";
import "./Body.css"; 

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuthActions();

  const handleLogin = async (username, password, setErrors) => {
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        showSuccessToast("Login successful! Welcome back.");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        setErrors({ general: response.message || "Invalid login credentials" });
        showErrorToast(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again later." });
      showErrorToast("Something went wrong. Please try again later.");
    }
  };
  
  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center login-background">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <LoginForm onLogin={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;