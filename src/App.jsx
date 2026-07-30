import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Leave from "./pages/leave/Leave";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings/Settings";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";


function App() {

  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/employees" element={<EmployeeDashboard />} />

      <Route path="/attendance" element={<Attendance />} />

      <Route path="/leave/*" element={<Leave />} />

      <Route path="/settings/*" element={<Settings />} />

      <Route path="/reports" element={<Reports />} />

    </Routes>
  );

}


export default App;