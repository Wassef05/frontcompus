import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventBus from '../../../common/EventBus';

import AttestationFormDialog from "./Attestation/Newattestation";
import AttestationsListModal from "./Attestation/Listattestation";
import NoteFormDialog from "./Notes/Newnote";
import NotesListModal from './Notes/Listnote'; 
import ReclamationFormDialog from './Reclamation/Newreclam';
import ReclamationsListModal from './Reclamation/Listreclam';
import NoteInfosListModal from './NoteInfo/ListnoteInfo';
import CoursFormDialog from './Cours/Newcour';

import conversationService from '../../../services/conversationService';

import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
} from '@mui/material';
import "./boardetud.css";
import { online } from "./dummydata";
import Heading from "../../common/heading/Heading";
import BG from "../../../assets/dashetud.jpg";
import Header from "../../common/header/Header";
import Profile from '../../Profile'; // Import the Profile component
import MessageForm from '../PROF/conversation/MessageForm';
import ChatIcon from '@mui/icons-material/Chat';
import { addMessage } from '../../../actions/message.actions';
import ChatRoom from '../PROF/conversation/ChatRoom'; // Importing ChatRoom
import io from 'socket.io-client'; // Import socket.io-client
const socket = io('http://localhost:8080'); // Replace with your server URL

const EtudDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const [conversations, setConversations] = useState([]);

  const [isMessageFormOpen, setMessageFormOpen] = useState(false);
  const [recipientId, setRecipientId] = useState(null);

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handleOpenChat = (conversationId, recipientName) => {
    setSelectedConversation(conversationId);
    setRecipientName(recipientName);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedConversation(null);
    setRecipientName("");
  };

  const handleSendMessage = (receiverId, content) => {
    const formData = {
      receiver: receiverId,
      content,
    };
    dispatch(addMessage(formData)).then(() => {
      console.log("Message sent successfully");
    }).catch((error) => {
      console.error("Error sending message:", error);
    });
  };

const handleOpenMessageForm = (recipientId) => {
    setRecipientId(recipientId);
    setMessageFormOpen(true);
  };

  const handleCloseMessageForm = () => setMessageFormOpen(false);

  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  const [isNotesListOpen, setNotesListOpen] = useState(false);
  const [noteMenuAnchorEl, setNoteMenuAnchorEl] = useState(null);

  const handleOpenNoteForm = () => { setNoteFormOpen(true); handleCloseNoteMenu(); };
  const handleCloseNoteForm = () => setNoteFormOpen(false);
  const handleOpenNotesList = () => { setNotesListOpen(true); handleCloseNoteMenu(); };
  const handleCloseNotesList = () => setNotesListOpen(false);
  const handleNoteMenuClick = (event) => setNoteMenuAnchorEl(event.currentTarget);
  const handleCloseNoteMenu = () => setNoteMenuAnchorEl(null);

  const [isAttestationFormOpen, setAttestationFormOpen] = useState(false);
  const [isAttestationsListOpen, setAttestationsListOpen] = useState(false);
  const [attestationMenuAnchorEl, setAttestationMenuAnchorEl] = useState(null);

  const handleOpenAttestationForm = () => { setAttestationFormOpen(true); };
  const handleCloseAttestationForm = () => setAttestationFormOpen(false);
  const handleOpenAttestationsList = () => { setAttestationsListOpen(true); };
  const handleCloseAttestationsList = () => setAttestationsListOpen(false);
  const handleAttestationMenuClick = (event) => setAttestationMenuAnchorEl(event.currentTarget);
  const handleCloseAttestationMenu = () => setAttestationMenuAnchorEl(null);

  const [isReclamationFormOpen, setReclamationFormOpen] = useState(false);
  const [isReclamationsListOpen, setReclamationsListOpen] = useState(false);
  const [reclamationMenuAnchorEl, setReclamationMenuAnchorEl] = useState(null);

  const handleOpenReclamationForm = () => { setReclamationFormOpen(true); handleCloseReclamationMenu(); };
  const handleCloseReclamationForm = () => setReclamationFormOpen(false);
  const handleOpenReclamationsList = () => { setReclamationsListOpen(true); handleCloseReclamationMenu(); };
  const handleCloseReclamationsList = () => setReclamationsListOpen(false);
  const handleReclamationMenuClick = (event) => setReclamationMenuAnchorEl(event.currentTarget);
  const handleCloseReclamationMenu = () => setReclamationMenuAnchorEl(null);

  const [isCoursFormOpen, setCoursFormOpen] = useState(false);
  const [isCourssListOpen, setCourssListOpen] = useState(false);
  const [coursMenuAnchorEl, setCoursMenuAnchorEl] = useState(null);

  const handleOpenCoursForm = () => { setCoursFormOpen(true); handleCloseCoursMenu(); };
  const handleCloseCoursForm = () => setCoursFormOpen(false);
  const handleOpenCourssList = () => { setCourssListOpen(true); handleCloseCoursMenu(); };
  const handleCloseCourssList = () => setCourssListOpen(false);
  const handleCoursMenuClick = (event) => setCoursMenuAnchorEl(event.currentTarget);
  const handleCloseCoursMenu = () => setCoursMenuAnchorEl(null);

  const [isNoteInfoFormOpen, setNoteInfoFormOpen] = useState(false);
  const [isNoteInfosListOpen, setNoteInfosListOpen] = useState(false);
  const [noteInfoMenuAnchorEl, setNoteInfoMenuAnchorEl] = useState(null);

  const handleOpenNoteInfoForm = () => { setNoteInfoFormOpen(true); handleCloseNoteInfoMenu(); };
  const handleCloseNoteInfoForm = () => setNoteInfoFormOpen(false);
  const handleOpenNoteInfosList = () => { setNoteInfosListOpen(true); handleCloseNoteInfoMenu(); };
  const handleCloseNoteInfosList = () => setNoteInfosListOpen(false);
  const handleNoteInfoMenuClick = (event) => setNoteInfoMenuAnchorEl(event.currentTarget);
  const handleCloseNoteInfoMenu = () => setNoteInfoMenuAnchorEl(null);

  const cardClickHandlers = {
    "NOTE": handleNoteMenuClick,
    "EXTRACTION": handleAttestationMenuClick, 
    "CLAIM": handleReclamationMenuClick, 
    "PROFIL": handleOpenProfile,
    "NOTE INFO": handleNoteInfoMenuClick
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      conversationService
        .getConversations(currentUser.id)
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching conversations:", error);
        });

      // Join socket room for the current user
      socket.emit('join', { userId: currentUser.id });

      // Listen for incoming messages
      socket.on('receiveMessage', (message) => {
        console.log('Message received:', message);
        // Handle the received message (e.g., update the state or show a notification)
      });

      return () => {
        // Leave the socket room on component unmount
        socket.emit('leave', { userId: currentUser.id });
        socket.off('receiveMessage');
      };
    }
  }, [currentUser]);


  const handleLogout = () => {
    EventBus.dispatch("logout");
    navigate("/login");
  };

  if (!currentUser || !currentUser.roles.includes("ROLE_ETUDIANT")) {
    return <Navigate to="/login" />;
  }




    

  return (
    <section className='heroetud'>
      <Header />
      <div className="admin-dashboard" style={{ paddingTop: '10rem' }}>
        <h1 style={{ paddingRight: "5rem" }}>Student Dashboard</h1>
        <div className="buttons-group">
          <button onClick={handleOpenProfile} className="btn1">Profile</button>
          <button onClick={handleLogout} className="btn1">Logout</button>
        </div>
        {isProfileOpen && (
          <Dialog
            open={isProfileOpen}
            onClose={handleCloseProfile}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Profile</DialogTitle>
            <Profile />
          </Dialog>
        )}


        {/* Liste des conversations
        <Dialog
          open={isChatOpen}
          onClose={handleCloseChat}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Conversations</DialogTitle>
          <List>
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                const recipient = conversation.participants.find(
                  (p) => p._id !== currentUser.id
                );
                return (
                  <ListItem
                    button
                    key={conversation._id}
                    onClick={() =>
                      handleOpenChat(conversation._id, recipient.name)
                    }
                  >
                    <ChatIcon />
                    <ListItemText primary={recipient.name} />
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText primary="No conversations found" />
              </ListItem>
            )}
          </List>
        </Dialog> */}

        {/* Icone de messagerie */}
        <div className="chat-icon" onClick={() => setChatOpen(true)}>
          <ChatIcon style={{ fontSize: 40 }} />
        </div>

        <Dialog open={isMessageFormOpen} onClose={handleCloseMessageForm}>
          <DialogTitle>Envoyer un message</DialogTitle>
          <MessageForm
            recipientId={recipientId}
            onClose={handleCloseMessageForm}
            onSendMessage={handleSendMessage}
          />
        </Dialog>

{isChatOpen && (
          <ChatRoom
            open={isChatOpen}
            onClose={handleCloseChat}
            conversationId={selectedConversation}
            recipientName={recipientName}
          />
        )}
        <section className='online' style={{}}>
          <div className='container'>
            <Heading subtitle='WELCOME' title='Browse Your Services' />
            <div className='content grid3'>
              {online.map((val, index) => (
                <div key={index} className='box' onClick={(e) => cardClickHandlers[val.courseName]?.(e)}>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <img src={val.hoverCover} alt='' className='show' />
                  </div>
                  <h1>{val.courseName}</h1>
                  <span>{val.course}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NoteFormDialog open={isNoteFormOpen} onClose={handleCloseNoteForm} />
        <Menu anchorEl={noteMenuAnchorEl} open={Boolean(noteMenuAnchorEl)} onClose={handleCloseNoteMenu}>
          <MenuItem onClick={handleOpenNoteForm}>New Note </MenuItem>
          <MenuItem onClick={handleOpenNotesList}>Note's List</MenuItem>
        </Menu>

        <AttestationFormDialog open={isAttestationFormOpen} onClose={handleCloseAttestationForm} />
        <Menu anchorEl={attestationMenuAnchorEl} open={Boolean(attestationMenuAnchorEl)} onClose={handleCloseAttestationMenu}>
          <MenuItem onClick={handleOpenAttestationForm}>New Attestation</MenuItem>
          <MenuItem onClick={handleOpenAttestationsList}>Attestation's List</MenuItem>
        </Menu>

        <ReclamationFormDialog open={isReclamationFormOpen} onClose={handleCloseReclamationForm} />
        <Menu anchorEl={reclamationMenuAnchorEl} open={Boolean(reclamationMenuAnchorEl)} onClose={handleCloseReclamationMenu}>
          <MenuItem onClick={handleOpenReclamationForm}>New Reclamation</MenuItem>
          <MenuItem onClick={handleOpenReclamationsList}>Reclamation List</MenuItem>
        </Menu>

        <CoursFormDialog open={isCoursFormOpen} onClose={handleCloseCoursForm} />
        <Menu anchorEl={coursMenuAnchorEl} open={Boolean(coursMenuAnchorEl)} onClose={handleCloseCoursMenu}>
          <MenuItem onClick={handleOpenCoursForm}>New Cours</MenuItem>
          <MenuItem onClick={handleOpenCourssList}>Cours List</MenuItem>
        </Menu>

        <NotesListModal open={isNotesListOpen} onClose={handleCloseNotesList} />
        <AttestationsListModal open={isAttestationsListOpen} onClose={handleCloseAttestationsList} />
        <ReclamationsListModal open={isReclamationsListOpen} onClose={handleCloseReclamationsList} />
        <NoteInfosListModal open={isNoteInfosListOpen} onClose={handleCloseNoteInfosList} />
        <Menu anchorEl={noteInfoMenuAnchorEl} open={Boolean(noteInfoMenuAnchorEl)} onClose={handleCloseNoteInfoMenu}>
          <MenuItem onClick={handleOpenNoteInfosList}>NoteInfo's List</MenuItem>
        </Menu>
      </div>
    </section>
  );
};

export default EtudDashboard;
