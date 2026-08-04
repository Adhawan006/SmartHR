import {
    Paper,
    Typography,
    Box,
    Avatar,
    Divider,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";

function RecentActivities({
    employees = [],
    attendance = [],
    leaves = [],
}) {

    const activities = [];

    // Employee Joined
    employees.forEach((emp) => {
        if (!emp.joiningDate) return;

        activities.push({
            type: "employee",
            icon: <PersonAddIcon />,
            color: "#4caf50",
            title: `${emp.firstName} ${emp.lastName} joined ${emp.department}`,
            date: new Date(emp.joiningDate),
        });
    });

    // Attendance
    attendance.forEach((record) => {
        if (!record.date) return;

        activities.push({
            type: "attendance",
            icon: <LoginIcon />,
            color: "#1976d2",
            title: `${record.employeeName || record.employeeId} marked ${record.status}`,
            date: new Date(record.date),
        });
    });

    // Leave
    leaves.forEach((leave) => {
        activities.push({
            type: "leave",
            icon: <EventAvailableIcon />,
            color: "#ff9800",
            title: `${leave.employeeName} applied for ${leave.type}`,
            date: leave.createdAt?.toDate
                ? leave.createdAt.toDate()
                : new Date(),
        });
    });

    // Latest first
    activities.sort((a, b) => b.date - a.date);

    const latestActivities = activities.slice(0, 10);

    return (
        <Paper
    sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        height: 500,          // or any height you prefer
        overflowY: "auto",
        overflowX: "hidden",

        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#94a3b8",
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#e5e7eb",
        },
    }}
>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                📋 Recent Activities
            </Typography>

            {latestActivities.length === 0 ? (
                <Typography color="text.secondary">
                    No recent activities found.
                </Typography>
            ) : (
                latestActivities.map((activity, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                py: 2,
                                transition: "0.2s ease",
                                "&:hover": {
                                    transform: "translateX(4px)",
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: activity.color,
                                }}
                            >
                                {activity.icon}
                            </Avatar>

                            <Box flex={1}>
                                <Typography fontWeight="600">
                                    {activity.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {activity.date.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>

                        {index !== latestActivities.length - 1 && (
                            <Divider />
                        )}
                    </Box>
                ))
            )}
        </Paper>
    );
}

export default RecentActivities;