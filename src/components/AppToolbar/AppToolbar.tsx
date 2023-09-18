import React from 'react';
import { AppBar, Button, Grid, styled, Toolbar, Typography } from '@mui/material';
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
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#454545',
        padding: '15px 0',
      }}
    >
      <Toolbar>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Typography variant="h6" component="div">
            <Link
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={logo}
                alt="Crypto Flexx logo"
                style={{
                  width: '150px',
                }}
              />
            </Link>
          </Typography>
          <Grid
            item
            container
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            alignItems="center"
            xs={12}
            md={9}
          >
            <Button component={NavLink} to="/register" color="inherit">
              Регистрация
            </Button>
            <Button component={NavLink} to="/login" color="inherit">
              Вход
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
