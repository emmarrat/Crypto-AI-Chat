import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/Chat/chatsSlice';

const Welcome = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const goToLogin = () => {
    navigate(NAV_LINKS.login);
  };

  const goToTheChat = () => {
    navigate(NAV_LINKS.chat);
  };

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Typography variant="h4">
        Привет меня зовут{' '}
        <Typography variant="h4" component="span" color="secondary">
          Crypto Flexx чат-ассистент
        </Typography>{' '}
      </Typography>
      <Typography variant="h4">Я AI ассистент в сфере криптовалюты</Typography>
      {!user && (
        <Typography variant="body1">
          Для того, чтобы начать диалог, необходимо авторизироваться
        </Typography>
      )}
      <Grid item mt={5}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={user ? goToTheChat : goToLogin}
        >
          {user ? 'Перейти в чат' : 'Войти'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Welcome;
