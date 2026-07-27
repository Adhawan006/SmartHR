// src/pages/employees/EmployeeDetails.jsx

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  // Dummy data for now
  const employee = {
    employeeId,
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
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Employee Details
      </Typography>

      <Card>
        <CardContent>

          {/* Profile Section */}

          <Box
            display="flex"
            alignItems="center"
            gap={3}
            mb={3}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: 35,
              }}
            >
              {employee.firstName[0]}
            </Avatar>

            <Box>
              <Typography variant="h5">
                {employee.firstName} {employee.lastName}
              </Typography>

              <Typography color="text.secondary">
                {employee.designation}
              </Typography>

              <Chip
                label={employee.status}
                color={
                  employee.status === "Active"
                    ? "success"
                    : "error"
                }
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Employee Information */}

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Employee ID:</strong>
              </Typography>
              <Typography>{employee.employeeId}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Email:</strong>
              </Typography>
              <Typography>{employee.email}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Phone Number:</strong>
              </Typography>
              <Typography>{employee.phone}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Department:</strong>
              </Typography>
              <Typography>{employee.department}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Designation:</strong>
              </Typography>
              <Typography>{employee.designation}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Manager:</strong>
              </Typography>
              <Typography>{employee.manager}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Joining Date:</strong>
              </Typography>
              <Typography>{employee.joiningDate}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Employment Type:</strong>
              </Typography>
              <Typography>{employee.employmentType}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Salary:</strong>
              </Typography>
              <Typography>
                ₹ {employee.salary}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Emergency Contact:</strong>
              </Typography>
              <Typography>
                {employee.emergencyContact}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Address:</strong>
              </Typography>
              <Typography>
                {employee.address}
              </Typography>
            </Grid>

          </Grid>

          {/* Buttons */}

          <Box
            mt={4}
            display="flex"
            gap={2}
          >
            <Button
              variant="contained"
              onClick={() =>
                navigate(
                  `/employees/edit/${employee.employeeId}`
                )
              }
            >
              Edit Employee
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/employees")}
            >
              Back
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetails;