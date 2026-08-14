import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BrowseItems from './pages/BrowseItems.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import ReportLostItem from './pages/ReportLostItem.jsx'
import ReportFoundItem from './pages/ReportFoundItem.jsx'
import MyReports from './pages/MyReports.jsx'
import SavedItems from './pages/SavedItems.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import ContactUs from './pages/ContactUs.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="/browse" element={<BrowseItems />} />
      <Route path="/items/:id" element={<ItemDetails />} />

      {/* Protected app pages (require login) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/report-lost" element={<ProtectedRoute><ReportLostItem /></ProtectedRoute>} />
      <Route path="/report-found" element={<ProtectedRoute><ReportFoundItem /></ProtectedRoute>} />
      <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
      <Route path="/saved-items" element={<ProtectedRoute><SavedItems /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
