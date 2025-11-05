import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './frontend/Landing Page/Home';
import CapstoneSearch from './frontend/Landing Page/CapstoneSearch';
import AboutUs from './frontend/Landing Page/AboutUs';
import AdminLoginPage from './frontend/Admin/AdminLoginPage';
import AdminDashboard from './frontend/Admin/AdminDashboard';
import CapstoneProjects from './frontend/Admin/CapstoneProjects';
import AdminAccountManagement from './frontend/Admin/AdminAccountManagement';
import { AuthProvider } from './AuthContext';
import DashboardLayout from './DashboardLayout';
import AuthenticatedRoute from './AuthenticatedRoute';
import { CapstoneProjectsProvider } from './CapstoneProjectsContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capstone" element={<CapstoneSearch />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin"
            element={
              <AuthenticatedRoute>
                <DashboardLayout />
              </AuthenticatedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="capstone-projects"
              element={
                <CapstoneProjectsProvider>
                  <CapstoneProjects />
                </CapstoneProjectsProvider>
              }
            />
            <Route
              path="account-management"
              element={<AdminAccountManagement />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
