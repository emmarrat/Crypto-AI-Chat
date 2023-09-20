import * as React from 'react';
import { ReactNode, useEffect } from 'react';
import './Sidebar.css';
import logo from '../../assets/images/logo.svg';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectChat,
  selectFetchingChats,
  selectHistory,
  selectTotalMessages,
  selectUser,
  startNewChat,
  unsetUser,
} from '../../features/Chat/chatsSlice';
import { getAllChats, getChatById } from '../../features/Chat/chatThunks';
import { Button, Drawer, Tooltip, useMediaQuery } from '@mui/material';
import { COLORS, LIMIT_MESSAGES } from '../../utils/constants';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SimpleBackdrop from '../SimpleBackdrop/SimpleBackdrop';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  background: '#2a2a2a',
  color: '#fff',
  boxShadow: 'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface Props {
  children: ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const historyList = useAppSelector(selectHistory);
  const totalMessages = useAppSelector(selectTotalMessages);
  const user = useAppSelector(selectUser);
  const selectedChat = useAppSelector(selectChat);
  const chatLoading = useAppSelector(selectFetchingChats);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerVariant = isSmallScreen ? 'temporary' : 'persistent';
  const drawerWidthStyle = isSmallScreen ? '300px' : drawerWidth;

  useEffect(() => {
    if (selectedChat.conversation.length > 1 && user) {
      dispatch(getAllChats({ id: user.id }));
    }
  }, [dispatch, selectedChat, user]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChatClick = (chat_id: string) => {
    if (!user) return;

    dispatch(
      getChatById({
        id: user.id,
        conversation_id: chat_id,
      }),
    );
  };

  const onNewChatClick = () => {
    dispatch(startNewChat());
  };

  const logout = () => {
    dispatch(unsetUser());
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <img src={logo} alt="Crypto Flexx logo" style={{ width: '170px' }} />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidthStyle,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidthStyle,
              boxSizing: 'border-box',
            },
          }}
          variant={drawerVariant}
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ display: 'flex', flexDirection: 'column' }}>
            <div className="sidebar__header sidebar__buttons">
              <div className="sidebar__chat-btn">
                <Button
                  className="sidebar__btn"
                  variant="contained"
                  color="warning"
                  onClick={onNewChatClick}
                  sx={{
                    padding: '6px 8px',
                  }}
                >
                  Начать новый чат
                </Button>
              </div>
              <Button
                variant="contained"
                onClick={handleDrawerClose}
                sx={{ padding: '6px 8px', minWidth: 0 }}
                color="warning"
              >
                <ChevronLeftIcon className="sidebar__btn" sx={{ color: '#ffff' }} />
              </Button>
            </div>
            <div className="sidebar__divider" />
            {totalMessages !== LIMIT_MESSAGES && (
              <div className="sidebar__header">
                <h4 className="history-title">
                  <HistoryRoundedIcon sx={{ mr: 1 }} />
                  История
                </h4>
              </div>
            )}
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              maxHeight: '66vh',
              overflow: 'scroll',
            }}
          >
            {historyList.map((chat) => (
              <ListItem
                key={chat.conversation_id}
                disablePadding
                sx={{
                  display: 'block',
                  padding: 0,
                  backgroundColor:
                    chat.conversation_id === selectedChat.conversation_id
                      ? COLORS.lightGreen
                      : '',
                }}
              >
                <Tooltip title={chat.conversation_name} placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 50,
                      justifyContent: 'start',
                      padding: '0 20px',
                    }}
                    className="sidebar__btn"
                    onClick={() => onChatClick(chat.conversation_id)}
                  >
                    <ChatBubbleOutlineRoundedIcon
                      sx={{
                        mr: 1,
                        color:
                          chat.conversation_id === selectedChat.conversation_id
                            ? COLORS.darkBlue
                            : '',
                      }}
                      fontSize="small"
                    />
                    <p
                      className="history-item"
                      style={{
                        color:
                          chat.conversation_id === selectedChat.conversation_id
                            ? COLORS.darkBlue
                            : '',
                      }}
                    >
                      {chat.conversation_name}
                    </p>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <Button
              className="sidebar__btn"
              variant="contained"
              color="warning"
              onClick={logout}
            >
              Выход
            </Button>
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Box sx={{ flexGrow: 1, backgroundColor: '#2a2a2a', height: '100vh' }}>
            {children}
          </Box>
        </Main>
      </Box>
      <SimpleBackdrop open={chatLoading} />
    </>
  );
};
export default Sidebar;
