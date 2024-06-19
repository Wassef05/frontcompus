import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';

const socket = io('http://localhost:8080'); // Assurez-vous que l'URL correspond à celle de votre serveur

const ChatRoomDialog = ({ open, onClose, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(receiverId);
  const user = useSelector(state => state.auth.user);
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (message.receiver === selectedReceiver || message.sender === selectedReceiver) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedReceiver]);

  const sendMessage = () => {
    if (message.trim() && selectedReceiver) {
      const messageData = {
        sender: user._id,
        receiver: selectedReceiver,
        content: message,
        timestamp: new Date(),
      };
      socket.emit('sendMessage', messageData);
      setMessage('');
      setMessages([...messages, messageData]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Chat Room</DialogTitle>
      <DialogContent>
        <div className="chat-room">
          <div className="recipient-list">
            <Select
              value={selectedReceiver}
              onChange={(e) => setSelectedReceiver(e.target.value)}
              required
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>Sélectionner...</MenuItem>
              {!loading && users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender === user._id ? 'You' : users.find(u => u._id === msg.sender)?.username || 'Unknown'}</strong>: {msg.content} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
              </div>
            ))}
          </div>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={sendMessage} variant="contained" color="primary">Send</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatRoomDialog;
