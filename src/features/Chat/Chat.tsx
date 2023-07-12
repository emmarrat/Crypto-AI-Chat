import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewMessage, selectChat } from './chatsSlice';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { COLORS } from '../../constants';
import generateId from '../../generateId';
const Chat = () => {
  const dispatch = useAppDispatch();
  const existingChat = useAppSelector(selectChat);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [existingChat]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = { role: 'user', text: messageText, id: generateId() };
    dispatch(addNewMessage(userMessage));
    setMessageText('');

    setIsLoading(true); // Данная конструкция создана только для демонстрации пока нет бека
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
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
          Please send a message to start the dialog...
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
    <Sidebar>
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
              placeholder="Ask me about crypto"
              inputProps={{ 'aria-label': 'Type your message' }}
              required
              autoFocus
              sx={{
                color: '#fff',
                border: 'none',
              }}
            />
            <div style={{ padding: '5px' }}>
              <IconButton
                type="submit"
                disabled={messageText.length === 0}
                sx={{ p: '10px', color: 'secondary.dark' }}
                aria-label="send message"
              >
                <SendIcon />
              </IconButton>
            </div>
          </Paper>
        </div>
      </div>
    </Sidebar>
  );
};

export default Chat;
