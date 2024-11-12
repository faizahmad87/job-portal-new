import React, {useState} from 'react';
import {
 List,
 ListItem,
 ListItemText,
 Drawer,
 Typography,
 Divider,
 IconButton,
 Box,
 ListItemIcon
} from '@mui/material';
import {Link} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleSidebar = () => {
  setIsOpen(!isOpen);
 };

 const handleLinkClick = () => {
  if (window.innerWidth < 900) {
   setIsOpen(false);
  }
 };

 return (
  <>
   {/* Mobile view header */}
   <Box
    sx={{
     display: {xs: 'flex', md: 'none'},
     width: '100%',
     justifyContent: 'space-between',
     alignItems: 'center',
     padding: 1,
     backgroundColor: '#008080', // Teal background for header
     color: 'white',
     position: 'fixed',
     top: 0,
     left: 0,
     zIndex: 1300
    }}
   >
    <IconButton color="inherit" onClick={toggleSidebar}>
     <MenuIcon />
    </IconButton>

    <Typography variant="h6" sx={{textAlign: 'left', flexGrow: 1}}>
     Admin Panel
    </Typography>
   </Box>

   {/* Sidebar Drawer */}
   <Drawer
    variant={window.innerWidth >= 900 ? 'permanent' : 'temporary'}
    open={isOpen || window.innerWidth >= 900}
    onClose={toggleSidebar}
    sx={{
     width: 240,
     flexShrink: 0,
     '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      backgroundColor: '#f9f9f9', // Light background for sidebar
      color: '#333',
      borderRight: '1px solid #ddd'
     },
     display: {xs: isOpen ? 'block' : 'none', md: 'block'}
    }}
   >
    <Typography variant="h6" align="center" sx={{padding: 2, color: '#008080'}}>
     Admin Panel
    </Typography>
    <Divider sx={{borderColor: '#ddd'}} />
    <List>
     <ListItem
      button
      component={Link}
      to="/dashboard"
      onClick={handleLinkClick}
      sx={{
       '&:hover': {backgroundColor: '#e0f7fa'}, // Light teal hover effect
       color: '#333'
      }}
     >
      <ListItemIcon>
       <DashboardIcon sx={{color: '#008080'}} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
     </ListItem>
     <ListItem
      button
      component={Link}
      to="/create-assessment"
      onClick={handleLinkClick}
      sx={{
       '&:hover': {backgroundColor: '#e0f7fa'},
       color: '#333'
      }}
     >
      <ListItemIcon>
       <AssessmentIcon sx={{color: '#008080'}} />
      </ListItemIcon>
      <ListItemText primary="Create Assessment" />
     </ListItem>
    </List>
   </Drawer>
  </>
 );
};

export default Sidebar;
