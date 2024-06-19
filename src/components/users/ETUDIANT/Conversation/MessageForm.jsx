// // src/components/users/etudiant/conversation/MessageForms.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMessage } from '../../../../actions/message.actions';
// import { getUsers } from '../../../../actions/user.actions';
// import { Dialog, DialogTitle, Select, MenuItem, TextareaAutosize, Button } from '@mui/material';
// import MessageList from './MessageList'; // Import the MessageList component
// import './MessageForms.css'; // Import the CSS file

// const SendMessageForm = ({ open, onClose }) => {
//   const [receiver, setReceiver] = useState('');
//   const [content, setContent] = useState('');
//   const [localMessages, setLocalMessages] = useState([]);
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.user.users);
//   const loading = useSelector((state) => state.user.loading);

//   useEffect(() => {
//     dispatch(getUsers());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = { receiver, content };
//     try {
//       await dispatch(addMessage(formData));
//       alert('Message sent successfully');
//       setLocalMessages((prevMessages) => [...prevMessages, formData]);
//       setContent('');
//     } catch (error) {
//       alert('Failed to send message');
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Envoyer le message</DialogTitle>
//       <div className="send-message-form">
//         <div className="recipient-list">
//           <Select
//             value={receiver}
//             onChange={(e) => setReceiver(e.target.value)}
//             required
//             fullWidth
//             displayEmpty
//           >
//             <MenuItem value="" disabled>Sélectionner...</MenuItem>
//             {!loading && users.map((user) => (
//               <MenuItem key={user._id} value={user._id}>
//                 {user.username}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>
//         <div className="message-area">
//           {receiver && <MessageList receiverId={receiver} additionalMessages={localMessages} />}
//           <form onSubmit={handleSubmit} className="message-form">
//             <TextareaAutosize
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Contenu du message"
//               required
//               minRows={3}
//               style={{ width: '100%', marginTop: '16px' }}
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
//               Envoyer le message
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default SendMessageForm;