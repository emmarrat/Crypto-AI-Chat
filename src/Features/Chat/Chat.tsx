import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewMessage, selectChat } from './chatsSlice';
const Chat = () => {
  const dispatch = useAppDispatch();
  const existingChat = useAppSelector(selectChat);
  const [messageText, setMessageText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [existingChat?.chat]);

  const generateId = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%-&*';
    let id = '';
    for (let i = 0; i < 20; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = { role: 'user', text: messageText, id: generateId() };
    dispatch(addNewMessage(userMessage));
    setMessageText('');
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const renderMessages = () => {
    if (!existingChat) return;

    if (existingChat.chat.length === 0) {
      return <h3>Please send a message to start the dialog...</h3>;
    }
    return existingChat.chat.map((message) => (
      <div key={message.id} className={`chat__msg chat__msg-${message.role}`}>
        {message.text}
      </div>
    ));
  };

  return (
    <Sidebar>
      {existingChat && (
        <div className="chat__container">
          <div
            className={`chat__block chat__msg-wrapp ${
              existingChat.chat.length > 0 ? 'chat__started' : 'chat__empty'
            }`}
            ref={containerRef}
          >
            {renderMessages()}
          </div>
          <div className="chat__block chat__form-wrapp">
            <Paper component="form" onSubmit={sendMessage} className="chat__form">
              <InputBase
                className="chat__input"
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Ask me about crypto"
                inputProps={{ 'aria-label': 'Type your message' }}
                required
                autoFocus
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
      )}
    </Sidebar>
  );
};

export default Chat;
