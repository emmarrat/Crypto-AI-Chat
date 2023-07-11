import React, {useEffect, useRef, useState} from 'react';
import Sidebar from "../Components/Sidebar/Sidebar";
import {IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';
import {MOCK_DATA_FIFTEEN} from "../constants";

interface Message {
  id: string,
  text: string,
  role: string
}

const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_DATA_FIFTEEN);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  const generateId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%-&*';
    let id = '';
    for (let i = 0; i < 12; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = { role: 'user', text: messageText, id: generateId() };
    console.log('your sending message = ', userMessage);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessageText('');
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return <h3>Please send a message to start the dialog...</h3>;
    }
    return messages.map((message, index) => {
      return (
        <div key={index} className={`chat__msg chat__msg-${message.role}`}>
          {message.text}
        </div>
      );
    });
  };

  return (
    <>
      <Sidebar>
        <div className="chat__container">
          <div className="chat__block chat__msg-wrapp" ref={containerRef}>
            {renderMessages()}
          </div>
          <div className="chat__block chat__form-wrapp">
            <Paper component="form" onSubmit={sendMessage} className="chat__form">
              <InputBase
                className="chat__input"
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value) }
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
      </Sidebar>
    </>
  );
};

export default Chat;



