import React, { useEffect } from 'react';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import { Link as RouterLink, Route, Routes, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from './utils/constants';
import Register from './features/User/Register';
import Chat from './features/Chat/Chat';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/Chat/chatsSlice';
import Login from './features/User/Login';

function App() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(NAV_LINKS.chat);
  }, []);
  return (
    <>
      <CssBaseline />
      <main>
        <Routes>
          <Route path={NAV_LINKS.register} element={<Register />} />
          <Route
            path={NAV_LINKS.login}
            element={
              <ProtectedRoute isAllowed={user === null} returnTo={NAV_LINKS.chat}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={NAV_LINKS.chat}
            element={
              <ProtectedRoute isAllowed={user !== null} returnTo={NAV_LINKS.login}>
                {user && <Chat />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: '80vh',
                  gap: '20px',
                }}
              >
                <Typography variant="h4" textAlign="center">
                  Упс! Страница не найдена!
                </Typography>
                <Button component={RouterLink} to={NAV_LINKS.chat} variant="contained">
                  Вернуться к чату
                </Button>
              </Box>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
