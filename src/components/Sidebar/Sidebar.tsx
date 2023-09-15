import React, { ReactNode } from 'react';
import './Sidebar.css';
import {
  Box,
  Button,
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
import {
  selectChat,
  selectFetchingChats,
  selectHistory,
  selectTotalMessages,
  selectUser,
  startNewChat,
  unsetUser,
} from '../../features/Chat/chatsSlice';
import { COLORS, LIMIT_MESSAGES } from '../../utils/constants';
import { getChatById } from '../../features/Chat/chatThunks';
import SimpleBackdrop from '../SimpleBackdrop/SimpleBackdrop';

const drawerWidth = 260;
const smallScreenDrawerWidth = '92%';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#171717',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: smallScreenDrawerWidth,
  },
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
  const user = useAppSelector(selectUser);
  const selectedChat = useAppSelector(selectChat);
  const chatLoading = useAppSelector(selectFetchingChats);
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [showMenuButton, setShowMenuButton] = React.useState(false); // New state

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
    setShowMenuButton(false);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      setShowMenuButton(true);
    }, 300);
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
              ...(openDrawer && { display: 'none' }),
            }}
          >
            <MenuIcon color="info" />
          </IconButton>
        </div>
        <Drawer variant="permanent" open={openDrawer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '100%',
              paddingBottom: '80px',
            }}
          >
            <div>
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
              {totalMessages !== LIMIT_MESSAGES && (
                <List>
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
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button variant="contained" onClick={logout}>
                Выход
              </Button>
            </div>
          </div>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, backgroundColor: '#2a2a2a', height: '100vh' }}
        >
          {children}
        </Box>
      </Box>
      <SimpleBackdrop open={chatLoading} />
    </>
  );
};

export default Sidebar;
