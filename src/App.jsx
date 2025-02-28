import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/login/body/Body";
import Home from "./components/home/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuth } from './hooks/useAuth';
import EmployeeDetails from "./components/home/employeeDetail/EmployeeDetail";
import EditEmployee from "./components/home/employeeDetail/edit/EditEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppContent = () => {
  useAuth(); 
  
  return (
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />}>
        <Route path="page/:page" element={<PrivateRoute element={<Home />} />} />
      </Route>
      <Route path="/employee/:id" element={<PrivateRoute element={<EmployeeDetails />} />} />
      {/* <Route path="/employee/edit/:id" element={<PrivateRoute element={<EditEmployee />} />} /> */}
    </Routes>
  );
};

function App() {
  return (

      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
  );
}

export default App;