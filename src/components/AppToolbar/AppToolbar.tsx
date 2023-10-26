import React from 'react';
import { AppBar, styled, Toolbar } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Link = styled(NavLink)({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
    color: '#dedbdb',
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img src={logo} alt="Crypto Flexx logo" style={{ width: '170px' }} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
