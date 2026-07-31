import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getEmployees } from "../services/employeeService";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    // Construct full name if first and last names are stored separately
    const fullName = emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim();
    const search = searchTerm.toLowerCase();

    return (
      fullName.toLowerCase().includes(search) ||
      emp.email?.toLowerCase().includes(search) ||
      emp.department?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar moved outside padding for full-width layout */}
      <Navbar />

      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">HR Portal</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {user?.name || "HR Manager"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <button
              onClick={() => navigate("/add-employee")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              + Add New Employee
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 border border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Employee List / Cards */}
        {loading ? (
          <p className="text-gray-400">Loading employees...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => {
              const displayName =
                emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || "Employee";

              return (
                <div
                  key={emp.id || emp._id}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full border border-blue-700">
                      {emp.department || "General"}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {displayName}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {emp.designation || "Employee"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{emp.email}</p>

                  <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/employee/${emp.id || emp._id}`)}
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                    >
                      View Details &rarr;
                    </button>
                    <button
                      onClick={() => navigate(`/edit-employee/${emp.id || emp._id}`)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;