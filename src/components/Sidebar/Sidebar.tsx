import React, { ReactNode, useState } from 'react';
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
  selectTotalMessages,
  startNewChat,
} from '../../features/Chat/chatsSlice';
import { COLORS, LIMIT_MESSAGES } from '../../constants';
import ChatModal from '../ChatModal/ChatModal';
import BoltIcon from '@mui/icons-material/Bolt';

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
  const totalMessages = useAppSelector(selectTotalMessages);

  const [open, setOpen] = React.useState(true);
  const [showMenuButton, setShowMenuButton] = React.useState(false); // New state
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <div
          className="sidebar__header-wrapp"
          style={{ display: showMenuButton ? 'block' : 'none' }}
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
                  onClick={
                    totalMessages === LIMIT_MESSAGES
                      ? onNewChatClick
                      : () => setIsModalOpen(true)
                  }
                  sx={{
                    padding: '6px 8px',
                  }}
                >
                  {totalMessages === LIMIT_MESSAGES
                    ? 'Оформить подписку'
                    : 'Начать новый чат'}
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
          {totalMessages !== LIMIT_MESSAGES && (
            <List>
              {historyList.map((chat) => (
                <ListItem
                  key={chat.id}
                  disablePadding
                  sx={{ display: 'block', padding: 0 }}
                >
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
          )}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, backgroundColor: '#2a2a2a', height: '100vh' }}
        >
          {children}
        </Box>
      </Box>
      <ChatModal
        open={isModalOpen}
        handleClose={closeModal}
        title="Новый чат доступен после авторизации"
      >
        <div className="chat__modal-wrapp">
          <h4 className="chat__modal-title">Вам понравился наш чат бот?</h4>
          <p className="chat__modal-text">
            Авторизируйтесь и оформите ежемесячную подписку всего за{' '}
            <b>99.99 dogecoin-ов</b> в месяц и вы получите{' '}
            <b>неограниченное количество запросов</b>{' '}
            <BoltIcon sx={{ color: COLORS.lightGreen, verticalAlign: 'bottom' }} />
          </p>
          <Divider sx={{ my: 3 }} />
          <Tooltip title="*После нажатия будет логика Авторизации, после чего можно будет оформить подписку">
            <Button variant="contained" color="secondary" sx={{ fontWeight: 'bold' }}>
              Войти
            </Button>
          </Tooltip>
        </div>
      </ChatModal>
    </>
  );
};

export default Sidebar;
