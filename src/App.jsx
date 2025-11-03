import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './frontend/Landing Page/Home'
import CapstoneSearch from './frontend/Landing Page/CapstoneSearch'
import AboutUs from './frontend/Landing Page/AboutUs'
import AdminLoginPage from './frontend/Admin/AdminLoginPage'
import AdminDashboard from './frontend/Admin/AdminDashboard'
import CapstoneProjects from './frontend/Admin/CapstoneProjects'
import AdminAccountManagement from './frontend/Admin/AdminAccountManagement'

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/capstone" element={<CapstoneSearch />} />
				<Route path="/about" element={<AboutUs />} />
				<Route path="/admin/login" element={<AdminLoginPage />} />
				<Route path="/admin/dashboard" element={<AdminDashboard />} />
				<Route path="/admin/capstone-projects" element={<CapstoneProjects />} />
				<Route path="/admin/account-management" element={<AdminAccountManagement />} />
			</Routes>
		</Router>
	)
}
