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
import PaymentsIcon from "@mui/icons-material/Payments";

const activities = [
  {
    icon: <LoginIcon />,
    color: "#1976d2",
    title: "Rahul checked in",
    time: "Today • 9:00 AM",
  },
  {
    icon: <EventAvailableIcon />,
    color: "#ff9800",
    title: "Priya applied for leave",
    time: "Today • 10:30 AM",
  },
  {
    icon: <PersonAddIcon />,
    color: "#4caf50",
    title: "New employee joined",
    time: "Yesterday",
  },
  {
    icon: <PaymentsIcon />,
    color: "#9c27b0",
    title: "Payroll processed",
    time: "Yesterday",
  },
];

function RecentActivities() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        📋 Recent Activities
      </Typography>

      {activities.map((activity, index) => (
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
                {activity.time}
              </Typography>
            </Box>
          </Box>

          {index !== activities.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
}

export default RecentActivities;