import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Button, Divider, IconButton, InputBase, Paper } from '@mui/material';
import './Chat.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewMessage, selectChat, selectTotalMessages } from './chatsSlice';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SendIcon from '@mui/icons-material/Send';
import BoltIcon from '@mui/icons-material/Bolt';
import { COLORS, LIMIT_MESSAGES } from '../../constants';
import generateId from '../../generateId';
import ChatModal from '../../components/ChatModal/ChatModal';

const Chat = () => {
  const dispatch = useAppDispatch();
  const existingChat = useAppSelector(selectChat);
  const totalMessages = useAppSelector(selectTotalMessages);

  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
    if (totalMessages === LIMIT_MESSAGES) {
      setIsModalOpen(true);
    }
  }, [existingChat, totalMessages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = { role: 'user', text: messageText, id: generateId() };

    const botMessage = {
      // Данная конструкция создана только для демонстрации пока нет бека
      role: 'assistant',
      text: 'i do not have access to the server, sorry :(',
      id: generateId(),
    };
    dispatch(addNewMessage(userMessage));
    setMessageText('');
    setIsLoading(true); // Данная конструкция создана только для демонстрации пока нет бека
    setTimeout(() => {
      setIsLoading(false);
      dispatch(addNewMessage(botMessage)); // Данная конструкция создана только для демонстрации пока нет бека
    }, 2000);
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const renderMessages = () => {
    if (existingChat.length === 0) {
      return (
        <h3 className="chat__msg chat__empty-msg">
          Пожалуйста, отправьте сообщение для начала диалога...
        </h3>
      );
    }
    return existingChat.map((message) => (
      <div key={message.id} className={`chat__msg chat__msg-${message.role}`}>
        <div className="chat__item">
          <div className="chat__item-inner">
            <div className="chat__avatar">
              {message.role === 'user' ? (
                <PersonRoundedIcon sx={{ color: COLORS.lightGreen }} />
              ) : (
                <SmartToyRoundedIcon sx={{ color: COLORS.lightGreen }} />
              )}
            </div>
            <p className="chat__text"> {message.text}</p>
          </div>
        </div>
      </div>
    ));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderLoadingAnimation = () => {
    if (isLoading) {
      return (
        <div className="chat__msg chat__msg-assistant">
          <div
            style={{
              maxWidth: '50rem',
              margin: 'auto',
            }}
          >
            <div className="chat__item-inner">
              <div className="chat__avatar">
                <SmartToyRoundedIcon sx={{ color: COLORS.lightGreen }} />
              </div>
              <div className="loading-animation">
                <div className="circle" />
                <div className="circle" />
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Sidebar>
        {totalMessages === LIMIT_MESSAGES ? (
          <div className="chat__block chat__msg-wrapp chat__empty">
            <h3 className="chat__msg chat__empty-msg">
              У вас превышен лимит запросов! <br />
              Чтобы продолжить пользоваться чат ботом, необходимо оформить подписку
            </h3>
          </div>
        ) : (
          <div className="chat__container">
            <div
              className={`chat__block chat__msg-wrapp ${
                existingChat.length > 0 ? 'chat__started' : 'chat__empty'
              }`}
              ref={containerRef}
            >
              {renderMessages()}
              {renderLoadingAnimation()}
            </div>
            <div className="chat__block chat__form-wrapp chat__item">
              <Paper
                component="form"
                onSubmit={sendMessage}
                className="chat__form"
                sx={{
                  border: 'none',
                }}
              >
                <InputBase
                  className="chat__input"
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Спроси меня о крипте"
                  inputProps={{ 'aria-label': 'Type your message' }}
                  required
                  autoFocus
                  sx={{
                    color: '#fff',
                    border: 'none',
                  }}
                  disabled={totalMessages === LIMIT_MESSAGES}
                />
                <div style={{ padding: '5px' }}>
                  <IconButton
                    type="submit"
                    disabled={
                      messageText.length === 0 || totalMessages === LIMIT_MESSAGES
                    }
                    sx={{ p: '10px', color: 'secondary.dark' }}
                    aria-label="send message"
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </Paper>
            </div>
          </div>
        )}
      </Sidebar>
      <ChatModal
        open={isModalOpen}
        handleClose={closeModal}
        title="Превышен лимит запросов"
      >
        <div className="chat__modal-wrapp">
          <h3 className="chat__modal-title">Вам понравился наш чат бот?</h3>
          <p className="chat__modal-text">
            Оформите ежемесячную подписку всего за <b>99.99 dogecoin-ов</b> в месяц и вы
            получите <b>неограниченное количество запросов</b>{' '}
            <BoltIcon sx={{ color: COLORS.lightGreen, verticalAlign: 'bottom' }} />
          </p>
          <Divider sx={{ my: 3 }} />
          <Button variant="contained" color="secondary" sx={{ fontWeight: 'bold' }}>
            Оформить подписку
          </Button>
        </div>
      </ChatModal>
    </>
  );
};

export default Chat;
