import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  styled,
  TextField as MuiTextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from './usersThunks';
import { MESSAGES, NAV_LINKS } from '../../utils/constants';
import { selectAuthLoading, selectUser } from '../Chat/chatsSlice';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useAuthHandler } from '../../hooks/useAuthHandler';
import AppToolbar from '../../components/AppToolbar/AppToolbar';

const TextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'white', // Set your desired background color here
    '&:hover': {
      backgroundColor: 'white', // Keep the background white on hover
    },
    '&.Mui-focused': {
      backgroundColor: 'white', // Keep the background white on focus
    },
  },
}));

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const existingUser = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const [showPassword, setShowNewPassword] = React.useState(false);
  const { user, inputChangeHandler } = useAuthHandler();
  const { errorName, catchError } = useErrorHandler();

  const togglePass = () => setShowNewPassword(!showPassword);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(user))
      .unwrap()
      .then(() => {
        navigate(NAV_LINKS.chat);
      })
      .catch((e) => {
        console.log(e);
        catchError(MESSAGES.errorLogin);
      });
  };

  if (existingUser) {
    return <Navigate to={NAV_LINKS.chat} />;
  }

  return (
    <>
      <AppToolbar />
      <Container component="main" maxWidth="xs" sx={{ mt: '150px' }}>
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%', color: '#000' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  variant="filled"
                  name="password"
                  label="Пароль"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={user.password}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%', color: '#000' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePass}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {errorName && (
                <Grid item xs={12} sx={{ alignItems: 'center' }}>
                  <Alert
                    severity="error"
                    sx={{ mt: 1, maxWidth: '100%', alignItems: 'center' }}
                  >
                    {errorName}
                  </Alert>
                </Grid>
              )}

              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Войти
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to={NAV_LINKS.register}
                    variant="body2"
                    color="secondary"
                  >
                    Создать учетную запись
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Login;
