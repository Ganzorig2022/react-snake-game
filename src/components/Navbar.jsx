import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DrawerComp from './Drawer';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {
  const [value, setValue] = useState('one');
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          {/*900px-ees doosh bol MENU ICON garch irne.
           */}
          {isMatch ? (
            <>
              <Typography>SNAKE GAME</Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                centered
                onChange={handleChange}
                value={value}
                textColor='inherit'
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#fff',
                  },
                }}
              >
                <Tab sx={{ color: '#fff' }} value='one' label='HOME' />
                <Tab sx={{ color: '#fff' }} value='two' label='ABOUT' />
                <Tab sx={{ color: '#fff' }} value='three' label='CONTACT' />
              </Tabs>
              <Button
                startIcon={<LoginOutlinedIcon />}
                variant='contained'
                sx={{
                  marginLeft: 'auto',
                  background: '#00e676',
                  color: '#000',
                }}
              >
                Login
              </Button>
              <Button
                endIcon={<LogoutOutlinedIcon />}
                variant='contained'
                sx={{
                  background: '#00e676',
                  color: '#000',
                }}
              >
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
