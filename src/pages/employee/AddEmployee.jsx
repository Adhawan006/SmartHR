// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   MenuItem,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const AddEmployee = () => {
//   const navigate = useNavigate();

//   const [employee, setEmployee] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     department: "",
//     designation: "",
//     manager: "",
//     joiningDate: "",
//     employmentType: "",
//     salary: "",
//     address: "",
//     emergencyContact: "",
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Firebase logic will be added later.
//     console.log(employee);

//     alert("Employee Added Successfully!");
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" mb={3}>
//         Add Employee
//       </Typography>

//       <form onSubmit={handleSubmit}>

//         {/* Personal Information */}

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" mb={2}>
//               Personal Information
//             </Typography>

//             <Grid container spacing={2}>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   value={employee.firstName}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   value={employee.lastName}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={employee.email}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   value={employee.phone}
//                   onChange={handleChange}
//                 />
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Card>


//         {/* Company Information */}

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" mb={2}>
//               Company Information
//             </Typography>

//             <Grid container spacing={2}>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Department"
//                   name="department"
//                   value={employee.department}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="IT">IT</MenuItem>
//                   <MenuItem value="HR">HR</MenuItem>
//                   <MenuItem value="Finance">Finance</MenuItem>
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Designation"
//                   name="designation"
//                   value={employee.designation}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Manager"
//                   name="manager"
//                   value={employee.manager}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   type="date"
//                   label="Joining Date"
//                   name="joiningDate"
//                   value={employee.joiningDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Employment Type"
//                   name="employmentType"
//                   value={employee.employmentType}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Full Time">Full Time</MenuItem>
//                   <MenuItem value="Part Time">Part Time</MenuItem>
//                   <MenuItem value="Intern">Intern</MenuItem>
//                   <MenuItem value="Contract">Contract</MenuItem>
//                 </TextField>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Card>


//         {/* Salary Information */}

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" mb={2}>
//               Salary Information
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Salary"
//                   type="number"
//                   name="salary"
//                   value={employee.salary}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>


//         {/* Additional Information */}

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" mb={2}>
//               Additional Information
//             </Typography>

//             <Grid container spacing={2}>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Address"
//                   name="address"
//                   value={employee.address}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Emergency Contact"
//                   name="emergencyContact"
//                   value={employee.emergencyContact}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Status"
//                   name="status"
//                   value={employee.status}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Inactive">Inactive</MenuItem>
//                 </TextField>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Card>


//         {/* Buttons */}

//         <Box display="flex" gap={2}>
//           <Button type="submit" variant="contained">
//             Save Employee
//           </Button>

//           <Button
//             variant="outlined"
//             onClick={() => navigate("/employees")}
//           >
//             Cancel
//           </Button>
//         </Box>

//       </form>
//     </Box>
//   );
// };

// export default AddEmployee


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AddEmployee = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/employees/add",
                formData
            );

            console.log(res.data);

            alert("Employee Added Successfully!");

            navigate("/employees");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                    "Failed to add employee."
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">
                    Add Employee
                </h1>

                <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID (EMP001)"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border p-3 rounded-lg md:col-span-2"
                            rows="4"
                            required
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Add Employee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;