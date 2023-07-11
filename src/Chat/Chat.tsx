import React, {useEffect, useRef, useState} from 'react';
import Sidebar from "../Components/Sidebar/Sidebar";
import {IconButton, InputBase, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './Chat.css';

const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<{ id: string, text: string, role: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('your sending message = ', messageText);
    setMessageText('');
  };
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  return (
    <>
      <Sidebar>
        <div className="chat__container">
          <Paper
            component="form"
            onSubmit={sendMessage}
            className="chat__input-wrapp"
          >
            <InputBase
              className="chat__input"
              type="text"
              value={messageText}
              onChange={changeMessage}
              placeholder="Ask me about crypto"
              inputProps={{'aria-label': 'Type your message'}}
              required
            />
            <div style={{padding: '5px'}}>
              <IconButton
                type="submit"
                disabled={messageText.length === 0}
                sx={{p: '10px', color: 'secondary.dark'}}
                aria-label="send message"
              >
                <SendIcon/>
              </IconButton>
            </div>

          </Paper>

        </div>
      </Sidebar>
    </>

  );
};

export default Chat;