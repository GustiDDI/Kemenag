import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import React, { useState } from "react";
import Animate from "./Animate";
import { images } from "../../assets";
import { useNavigate } from "react-router-dom";
import StatusChecker from './notification/status';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardCustomizeIcon />,
    state: "dashboard"
  },
  {
    title: "Medical Record",
    icon: <MonitorHeartIcon />,
    state: "medicalrecord"
  },
  {
    title: "Hotel",
    icon: <HotelIcon />,
    state: "hotel"
  },
  {
    title: "Hospital",
    icon: <LocalHospitalIcon />,
    state: "hospital"
  },
  {
    title: "Logistic",
    icon: <LocalShippingIcon />,
    state: "logistic"
  },
  {
    title: "Alert Notification",
    icon: <NotificationsActiveIcon />,
    state: "notification"
  }
];

const serviceMenus = [
  {
    title: "Use Case",
    icon: <OtherHousesOutlinedIcon />,
    state: "usecase"
  },
  {
    title: "Analytics Jemaah",
    icon: <HubOutlinedIcon />,
    state: "pilgrim360"
  },
  {
    title: "Coming Soon",
    icon: <HttpsOutlinedIcon />,
    state: "comingsoon"
  }
];


const Sidebar = ({ sidebarWidth }) => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState('dashboard');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dangerStatusCount, setDangerStatusCount] = useState(0);

  const handleMenuItemClick = (state) => {
    setActiveState(state);
    console.log(`Displaying results for menu state: ${state}`);

    if (state === "dashboard") {
      navigate("/dashboard");
    } else if (state === "hotel") {
      navigate("/hotel");
    } else if (state === "notification") {
      // For demonstration purposes, simulate 'danger' statuses
      const dangerStatuses = ['danger', 'danger', 'warning'];
      setDangerStatusCount(dangerStatuses.filter(status => status === 'danger').length);
      setSnackbarOpen(true);
      navigate("/notification");
    } else if (state === "pilgrim360") {
      navigate("/pilgrim360");
    } else if (state === "medicalrecord") {
      navigate("/medicalrecord");
    } else if (state === "hospital") {
      navigate("/hospital")
    } else if (state === "logistic") {
      navigate("/logistic")
    }

  };

  const handleStatusUpdate = (statuses) => {
    const dangerStatuses = statuses.filter(status => status === 'danger');
    setDangerStatusCount(dangerStatuses.length);
    if (dangerStatuses.length > 0) {
      setSnackbarOpen(true);
    }
  };

  const MenuItem = (props) => {
    const { item } = props;
    const isActive = item.state === activeState;

    return (
      <ListItem
        key={props.index}
        disableGutters
        disablePadding
        sx={{ py: 0.5 }}
        onClick={() => handleMenuItemClick(item.state)}
      >
        <ListItemButton
          sx={{
            borderRadius: "10px",
            bgcolor: isActive ? colors.green[600] : "",
            //bgcolor: isActive ? colors.blue[600] : "",
            color: isActive ? colors.common.white : "",
            "&:hover": {
              bgcolor: isActive ? colors.green[600] : "",
              //bgcolor: isActive ? colors.blue[600] : "",
              color: isActive ? colors.common.white : "",
            }
          }}
        >
          <ListItemIcon sx={{
            minWidth: "40px",
            color: isActive ? colors.common.white : ""
          }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={
            <Typography fontWeight={600}>
              {item.title}
            </Typography>
          } />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          {/*images.logo or images.kemenag*/}
          <img src={images.kemenag} alt="logo" height={100} />
        </Animate>
      </Box>
      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
          }}
        >
          <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Services
              </Typography>
            </ListItem>
            {menus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List>
          <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Graph Analytics
              </Typography>
            </ListItem>
            {serviceMenus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List>
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 }
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none"
            }
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Snackbar to display "danger" status count */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => setSnackbarOpen(false)}
        >
          {`Number of "Emergency" statuses: ${dangerStatusCount}`}
        </MuiAlert>
      </Snackbar>

      {/* StatusChecker to get statuses and trigger pop-up */}
      <StatusChecker onStatusUpdate={handleStatusUpdate} />
    </Box>
  );
};

export default Sidebar;