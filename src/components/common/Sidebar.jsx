import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import React, { useState } from "react";
import Animate from "./Animate";
import { images } from "../../assets";
import { useNavigate } from "react-router-dom";

const menus = [
  {
    title: "Inbox",
    icon: <MailOutlinedIcon />,
    state: "inbox"
  },
  {
    title: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "dashboard"
  },
  {
    title: "Notification",
    icon: <NotificationsOutlinedIcon />,
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
    title: "Pilgrim 360",
    icon: <HubOutlinedIcon />,
    state: "pilgrim360"
  },
  {
    title: "Coming Soon",
    icon: <HttpsOutlinedIcon />,
    state: "comingsoon"
  }
];

const investmentMenus = [
  {
    title: "Coming Soon",
    icon: <HttpsOutlinedIcon />,
    state: "comingsoon"
  },
  {
    title: "Coming Soon",
    icon: <HttpsOutlinedIcon />,
    state: "comingsoon"
  },
  {
    title: "Coming Soon",
    icon: <HttpsOutlinedIcon />,
    state: "comingsoon"
  }
];

const Sidebar = ({ sidebarWidth }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [activeState, setActiveState] = useState('');

  const handleMenuItemClick = (state) => {
    setActiveState(state);
    console.log(`Displaying results for menu state: ${state}`);

    // Navigate to the appropriate route based on the state
    if (state === "dashboard") {
      navigate("/dashboard");
    } else if (state === "inbox") {
      navigate("/inbox");
    } else if (state === "notification") {
      navigate("/notification");
    } else if (state === "pilgrim360") {
      navigate("/pilgrim360");
    }
    
    // Add more conditions for other menu items if needed
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
            bgcolor: isActive ? colors.blue[600] : "",
            color: isActive ? colors.common.white : "",
            "&:hover": {
              bgcolor: isActive ? colors.blue[600] : "",
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
          <img src={images.logo} alt="logo" height={100} />
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
          <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Coming Soon
              </Typography>
            </ListItem>
            {investmentMenus.map((item, index) => (
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
    </Box>
  );
};

export default Sidebar;
