import { Paper, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const actions = [
    {
        title: "Attendance",
        route: "/attendance",
        icon: <AccessTimeIcon />,
        color: "#2e7d32",
    },
    {
        title: "Apply Leave",
        route: "/leave",
        icon: <EventNoteIcon />,
        color: "#ed6c02",
    },
    {
        title: "Profile",
        route: "/employees",
        icon: <PersonIcon />,
        color: "#1976d2",
    },
    {
        title: "Settings",
        route: "/settings",
        icon: <SettingsIcon />,
        color: "#7b1fa2",
    },
];

function EmployeeQuickActions() {
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                width: "100%",
                bgcolor: "#1e293b",
                color: "#ffffff",
                border: "1px solid #334155",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
                sx={{
                    color: "#f8fafc",
                }}
            >
                ⚡ Quick Actions
            </Typography>

            <Grid container spacing={2}>
                {actions.map((action) => (
                    <Grid item xs={12} sm={6} md={3} key={action.title}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={action.icon}
                            onClick={() => navigate(action.route)}
                            sx={{
                                bgcolor: action.color,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: action.color,
                                    opacity: 0.9,
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {action.title}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default EmployeeQuickActions;