import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-5">
            <h1 className="text-2xl font-bold mb-8">SmartHR</h1>

            <ul className="space-y-4">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/employees">Employees</Link></li>
                <li><Link to="/add-employee">Add Employee</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;