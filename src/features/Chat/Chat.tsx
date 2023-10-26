import React, { useEffect, useRef, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import './Chat.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addNewMessage,
  selectChat,
  selectSendingMsg,
  selectTotalMessages,
} from './chatsSlice';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SendIcon from '@mui/icons-material/Send';
import { COLORS, LIMIT_MESSAGES } from '../../utils/constants';
import { ChatRequestBody } from '../../types';
import { sendMessage } from './chatThunks';

const Chat = () => {
  const dispatch = useAppDispatch();
  const existingChat = useAppSelector(selectChat);
  const totalMessages = useAppSelector(selectTotalMessages);
  const isLoading = useAppSelector(selectSendingMsg);
  const [messageText, setMessageText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendingMessage: ChatRequestBody = {
      prompt: messageText,
    };
    await dispatch(addNewMessage(messageText));
    setMessageText('');
    await dispatch(sendMessage(sendingMessage)).unwrap;
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
            <p className="chat__text"> {message.content}</p>
          </div>
        </div>
      </div>
    ));
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

  return totalMessages === LIMIT_MESSAGES ? (
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
          onSubmit={submitMessage}
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
                messageText.length === 0 || totalMessages === LIMIT_MESSAGES || isLoading
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
  );
};

export default Chat;
