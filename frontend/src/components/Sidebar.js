import React, {useState} from 'react';
import {
 List,
 ListItem,
 ListItemText,
 Drawer,
 Typography,
 Divider,
 IconButton,
 Box
} from '@mui/material';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
 // State to track sidebar visibility on mobile
 const [isOpen, setIsOpen] = useState(false);

 // Toggle sidebar visibility
 const toggleSidebar = () => {
  setIsOpen(!isOpen);
 };

 // Close sidebar when clicking on a link (for mobile screens)
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
     backgroundColor: '#1976d2',
     color: 'white',
     position: 'fixed',
     top: 0,
     left: 0,
     zIndex: 1300
    }}
   >
    {/* Menu icon to open the sidebar */}
    <IconButton color="inherit" onClick={toggleSidebar}>
     <MenuIcon />
    </IconButton>

    {/* Admin Panel Text */}
    <Typography
     variant="h6"
     sx={{textAlign: 'left', flexGrow: 1, paddingLeft: '25%'}}
    >
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
      boxSizing: 'border-box'
     },
     display: {xs: isOpen ? 'block' : 'none', md: 'block'}
    }}
   >
    <Typography variant="h6" align="center" sx={{marginTop: 2}}>
     Admin Panel
    </Typography>
    <Divider />
    <List>
     <ListItem
      button
      component={Link}
      to="/dashboard"
      onClick={handleLinkClick}
     >
      <ListItemText primary="Dashboard" />
     </ListItem>
     <ListItem
      button
      component={Link}
      to="/create-assessment"
      onClick={handleLinkClick}
     >
      <ListItemText primary="Create Assessment" />
     </ListItem>
    </List>
   </Drawer>
  </>
 );
};

export default Sidebar;
