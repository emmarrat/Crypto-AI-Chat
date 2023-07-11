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
  Toolbar,
  Tooltip,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { Theme } from '@mui/material/styles';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { HISTORY_CHATS } from '../../database';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { HistoryChats } from '../../types';
import { selectChatFromHistory, selectHistory } from '../../Features/Chat/chatsSlice';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#132D46',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#132D46',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onChatClick = (chat: HistoryChats) => {
    dispatch(selectChatFromHistory(chat));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              backgroundColor: '#fff',
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon
              sx={{
                color: '#132D46',
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
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
                    justifyContent: open ? 'initial' : 'center',
                  }}
                  onClick={() => onChatClick(chat)}
                >
                  <ChatBubbleOutlineRoundedIcon sx={{ mr: 1 }} fontSize="small" />
                  <p className="history-item" style={{ opacity: open ? 1 : 0 }}>
                    {chat.title}
                  </p>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/*<DrawerHeader />*/}
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
