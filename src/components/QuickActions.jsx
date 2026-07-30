import {
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";

const actions = [
  {
    title: "Add Employee",
    icon: <PersonAddIcon />,
    color: "#1976d2",
  },
  {
    title: "Attendance",
    icon: <AccessTimeIcon />,
    color: "#2e7d32",
  },
  {
    title: "Apply Leave",
    icon: <EventNoteIcon />,
    color: "#ed6c02",
  },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    color: "#7b1fa2",
  },
];

function QuickActions() {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        ⚡ Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Button
              fullWidth
              variant="contained"
              startIcon={action.icon}
              sx={{
                bgcolor: action.color,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  opacity: 0.9,
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