import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthMutation } from '../../types';
import { register } from './usersThunks';
import { MESSAGES, NAV_LINKS } from '../../utils/constants';
import { selectAuthLoading } from '../Chat/chatsSlice';

const TextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
    },
  },
}));

const Register = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<false | string>(false);
  const [state, setState] = React.useState<AuthMutation>({
    email: '',
    password: '',
  });

  const [showPassword, setShowNewPassword] = React.useState(false);
  const togglePass = () => setShowNewPassword(!showPassword);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(register(state))
      .unwrap()
      .then((result) => {
        setSuccess(true);
      })
      .catch((e) => {
        console.log(e);
        setError(MESSAGES.errorRegister);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: '150px' }}>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!success && (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
          </>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {!success && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="filled"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    value={state.email}
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
                    value={state.password}
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
              </>
            )}

            {success && (
              <Grid item xs={12}>
                <Alert
                  severity="success"
                  sx={{ mt: 1, maxWidth: '100%', alignItems: 'center' }}
                >
                  На вашу почту было отправлено письмо c кодом доступа для телеграм бота!
                </Alert>
              </Grid>
            )}
            {error && (
              <Grid item xs={12} sx={{ alignItems: 'center' }}>
                <Alert
                  severity="error"
                  sx={{ mt: 1, maxWidth: '100%', alignItems: 'center' }}
                >
                  {error}
                </Alert>
              </Grid>
            )}
            {success ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2, fontWeight: '600' }}
                component={RouterLink}
                to={NAV_LINKS.chat}
                color="secondary"
              >
                Перейти в чат
              </Button>
            ) : (
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Завершить регистрацию
              </LoadingButton>
            )}
            {!success && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to={NAV_LINKS.login}
                    variant="body2"
                    color="secondary"
                  >
                    Войти используя email и пароль
                  </Link>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
