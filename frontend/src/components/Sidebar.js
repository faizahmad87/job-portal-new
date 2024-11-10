// src/components/Sidebar.js

import React from 'react';
import {
 List,
 ListItem,
 ListItemText,
 Drawer,
 Typography,
 Divider
} from '@mui/material';
import {Link} from 'react-router-dom';

const Sidebar = () => {
 return (
  <Drawer
   variant="permanent"
   sx={{
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
     width: 240,
     boxSizing: 'border-box'
    }
   }}
  >
   <Typography variant="h6" align="center" sx={{marginTop: 2}}>
    Admin Panel
   </Typography>
   <Divider />
   <List>
    <ListItem button component={Link} to="/dashboard">
     <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/create-assessment">
     <ListItemText primary="Create Assessment" />
    </ListItem>
   </List>
  </Drawer>
 );
};

export default Sidebar;
