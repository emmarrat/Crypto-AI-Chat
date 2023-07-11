import React, { ReactNode } from 'react';
import './Sidebar.css';
import {
  Box,
  CssBaseline,
  CSSObject,
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
import { selectChatFromHistory, selectHistory } from '../../Features/Chat/chatsSlice';
import { COLORS } from '../../constants';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#171717',
  color: COLORS.lightGreen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#171717',
  color: COLORS.lightGreen,
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
  padding: theme.spacing(0, 1),
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <div
        style={{
          position: 'fixed',
          display: showMenuButton ? 'block' : 'none',
          top: '20px',
          left: '50px',
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
        <DrawerHeader sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="history-title">
            <HistoryRoundedIcon sx={{ mr: 1 }} />
            History
          </h4>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: '#ffff' }} />
          </IconButton>
        </DrawerHeader>
        <List sx={{ px: '10px' }}>
          {historyList.map((chat) => (
            <ListItem key={chat.id} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={chat.title} placement="right">
                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: 'start',
                  }}
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
