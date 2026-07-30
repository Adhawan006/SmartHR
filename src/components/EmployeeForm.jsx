import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ employeeId = null }) => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    manager: "",
    joiningDate: "",
    employmentType: "",
    salary: "",
    address: "",
    emergencyContact: "",
    status: "Active",
  });

  // Dummy Data (for Edit Employee)
  useEffect(() => {
    if (employeeId) {
      setEmployee({
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        department: "IT",
        designation: "Frontend Developer",
        manager: "Aman Verma",
        joiningDate: "2025-01-10",
        employmentType: "Full Time",
        salary: "60000",
        address: "Noida, Uttar Pradesh",
        emergencyContact: "9876500000",
        status: "Active",
      });
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeId) {
      console.log("Updating Employee", employee);
      alert("Employee Updated Successfully!");
    } else {
      console.log("Adding Employee", employee);
      alert("Employee Added Successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Company Information */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Company Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Manager"
                name="manager"
                value={employee.manager}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Joining Date"
                name="joiningDate"
                value={employee.joiningDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Employment Type"
                name="employmentType"
                value={employee.employmentType}
                onChange={handleChange}
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Salary Information */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Salary Information
          </Typography>

          <TextField
            fullWidth
            label="Salary"
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* Additional Information */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Additional Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={employee.emergencyContact}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={employee.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Buttons */}

      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained">
          {employeeId ? "Update Employee" : "Save Employee"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default EmployeeForm;