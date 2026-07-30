import { Navigate, Route, Routes } from "react-router-dom";
import Leave from "./pages/Leave";

function App() {
  return (
    <Routes>
      <Route path="/leave/*" element={<Leave />} />
      <Route path="*" element={<Navigate to="/leave" replace />} />
    </Routes>
  );
import AppRoutes from "./routes/AppRoutes";

function App() {
    return <AppRoutes />;
import Dashboard from "./pages/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;
