import { Navigate, Route, Routes } from "react-router-dom";
import Leave from "./pages/Leave";

function App() {
  return (
    <Routes>
      <Route path="/leave/*" element={<Leave />} />
      <Route path="*" element={<Navigate to="/leave" replace />} />
    </Routes>
  );
}

export default App;
