import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        address: "",
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/employees/${id}`
            );

            setFormData(res.data.employee);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5000/api/employees/update/${id}`,
                formData
            );

            alert("Employee Updated Successfully!");

            navigate("/employees");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="w-full p-8">
                <h1 className="text-3xl font-bold mb-6">
                    Edit Employee
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded col-span-2"
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;