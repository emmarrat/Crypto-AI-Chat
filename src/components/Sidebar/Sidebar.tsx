import React, { ReactNode } from 'react';
import './Sidebar.css';
import {
  Box,
  Button,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  styled,
  Tooltip,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { Theme } from '@mui/material/styles';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { HistoryChats } from '../../types';
import {
  selectChatFromHistory,
  selectHistory,
  startNewChat,
} from '../../features/Chat/chatsSlice';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#171717',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#171717',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: 300,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface Props {
  children: ReactNode;
}
const Sidebar: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const historyList = useAppSelector(selectHistory);
  const [open, setOpen] = React.useState(true);
  const [showMenuButton, setShowMenuButton] = React.useState(false); // New state

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowMenuButton(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowMenuButton(true);
    }, 300);
  };

  const onChatClick = (chat: HistoryChats) => {
    dispatch(selectChatFromHistory(chat));
  };

  const onNewChatClick = () => {
    dispatch(startNewChat());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <div
        style={{
          position: 'fixed',
          display: showMenuButton ? 'block' : 'none',
          top: '20px',
          left: '40px',
          zIndex: 9999,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            backgroundColor: '#171717',
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon color="info" />
        </IconButton>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sidebar__header sidebar__buttons">
            <div className="sidebar__chat-btn">
              <Button
                className="sidebar__btn"
                variant="contained"
                color="warning"
                onClick={onNewChatClick}
              >
                Start new chat
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
          <div
            style={{
              backgroundColor: '#fff',
              margin: '10px 0',
              height: '0.5px',
              width: '100%',
            }}
          />
          <div className="sidebar__header">
            <h4 className="history-title">
              <HistoryRoundedIcon sx={{ mr: 1 }} />
              History
            </h4>
          </div>
        </DrawerHeader>
        <List>
          {historyList.map((chat) => (
            <ListItem key={chat.id} disablePadding sx={{ display: 'block', padding: 0 }}>
              <Tooltip title={chat.title} placement="right">
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: 'start',
                    padding: '0 20px',
                  }}
                  className="sidebar__btn"
                  onClick={() => onChatClick(chat)}
                >
                  <ChatBubbleOutlineRoundedIcon sx={{ mr: 1 }} fontSize="small" />
                  <p className="history-item">{chat.title}</p>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, backgroundColor: '#2a2a2a', height: '100vh' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
