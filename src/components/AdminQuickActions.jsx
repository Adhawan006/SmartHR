import {
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";

const actions = [
  {
    title: "Add Employee",
    route: "/employees",
    icon: <PersonAddIcon />,
    color: "#1976d2",
  },
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
    title: "Reports",
    route: "/reports",
    icon: <AssessmentIcon />,
    color: "#7b1fa2",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3}>
        ⚡ Quick Actions
      </Typography>

      <Grid container spacing={2} alignItems="stretch">
        {actions.map((action) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={action.title}
            sx={{ display: "flex" }}
          >
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
                transition: "0.2s ease",
                "&:hover": {
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

export default QuickActions;