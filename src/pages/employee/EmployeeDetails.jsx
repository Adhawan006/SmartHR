import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const EmployeeDetails = () => {
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/employees/${id}`
            );

            setEmployee(res.data.employee);
        } catch (error) {
            console.log(error);
        }
    };

    if (!employee) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">
                    Employee Details
                </h1>

                <div className="bg-white shadow-md rounded p-6">
                    <p>
                        <strong>Name:</strong>{" "}
                        {employee.firstName}{" "}
                        {employee.lastName}
                    </p>

                    <p className="mt-3">
                        <strong>Email:</strong>{" "}
                        {employee.email}
                    </p>

                    <p className="mt-3">
                        <strong>Phone:</strong>{" "}
                        {employee.phone}
                    </p>

                    <p className="mt-3">
                        <strong>Department:</strong>{" "}
                        {employee.department}
                    </p>

                    <p className="mt-3">
                        <strong>Designation:</strong>{" "}
                        {employee.designation}
                    </p>

                    <p className="mt-3">
                        <strong>Salary:</strong>{" "}
                        ₹{employee.salary}
                    </p>

                    <p className="mt-3">
                        <strong>Address:</strong>{" "}
                        {employee.address}
                    </p>

                    <p className="mt-3">
                        <strong>Joining Date:</strong>{" "}
                        {new Date(
                            employee.joiningDate
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;