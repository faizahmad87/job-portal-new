// src/pages/Dashboard/Dashboard.js

import React from 'react';
import {Outlet, NavLink} from 'react-router-dom';
import {
 Box,
 Drawer,
 List,
 ListItem,
 ListItemText,
 Toolbar,
 CssBaseline,
 AppBar,
 Typography
} from '@mui/material';

const drawerWidth = 240;

const Dashboard = () => {
 return (
  <Box sx={{display: 'flex'}}>
   <CssBaseline />
   {/* AppBar for the dashboard title */}
   <AppBar
    position="fixed"
    sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
   >
    <Toolbar>
     <Typography variant="h6" noWrap component="div">
      Admin Dashboard
     </Typography>
    </Toolbar>
   </AppBar>

   {/* Sidebar Drawer */}
   <Drawer
    sx={{
     width: drawerWidth,
     flexShrink: 0,
     '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box'
     }
    }}
    variant="permanent"
    anchor="left"
   >
    <Toolbar />
    <List>
     <ListItem
      button
      component={NavLink}
      to="job-listings"
      activeClassName="Mui-selected"
     >
      <ListItemText primary="Job Listings" />
     </ListItem>
     <ListItem
      button
      component={NavLink}
      to="post-job"
      activeClassName="Mui-selected"
     >
      <ListItemText primary="Post a Job" />
     </ListItem>
     <ListItem
      button
      component={NavLink}
      to="application-review"
      activeClassName="Mui-selected"
     >
      <ListItemText primary="Review Applications" />
     </ListItem>
    </List>
   </Drawer>

   {/* Main Content Area */}
   <Box
    component="main"
    sx={{
     flexGrow: 1,
     bgcolor: 'background.default',
     p: 3,
     width: `calc(100% - ${drawerWidth}px)`
    }}
   >
    <Toolbar />
    <Outlet />{' '}
    {/* This renders the nested routes like JobListings, PostJob, etc. */}
   </Box>
  </Box>
 );
};

export default Dashboard;
