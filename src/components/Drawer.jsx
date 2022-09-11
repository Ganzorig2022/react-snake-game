import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const onClose = () => {
    setOpenDrawer(!openDrawer);
  };

  const PAGES = ['HOME', 'ABOUT', 'CONTACT', 'LOGIN', 'SIGNUP'];
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={onClose}>
        <List>
          {PAGES.map((page, idx) => (
            <ListItemButton key={idx}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={onClose} sx={{ color: '#fff', marginLeft: 'auto' }}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
