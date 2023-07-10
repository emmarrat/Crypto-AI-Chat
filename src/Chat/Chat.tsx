import React, {useEffect, useRef, useState} from 'react';
import Sidebar from "../Components/Sidebar/Sidebar";
import {Box, Button, IconButton, InputBase, Paper, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

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
        <div style={{
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto'
        }}>
          <Paper
            component="form"
            sx={{display: 'flex', alignItems: 'center', width: '100%'}}
            onSubmit={sendMessage}
          >
            <InputBase
              type="text"
              value={messageText}
              onChange={changeMessage}
              sx={{flex: 1, padding: '10px 15px'}}
              placeholder="Ask me about crypto"
              inputProps={{'aria-label': 'type your message'}}
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