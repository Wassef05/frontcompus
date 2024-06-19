import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import EventBus from '../../../common/EventBus';
import conversationService from '../../../services/conversationService';
import RattrapageFormDialog from './Rattrapage/Newrattrap';
import RattrapagesListModal from './Rattrapage/Listrattrap';
import {addMessage} from '../../../actions/message.actions'
import ImpressionProfFormDialog from './Impression/Newimpression';
import ImpressionProfsListModal from './Impression/Listimpression';

import MaterielProfFormDialog from './Materiel/NewMateriel';
import MaterielProfsListModal from './Materiel/Listmateriel';

import ContactProfFormDialog from './Contact/Newcontact';
import ContactProfsListModal from './Contact/Listcontact';


import NewCoursFormDialog from './cours/Newcours';
import ListCoursModal from './cours/Listcours';
import EditCoursFormDialog from './cours/Editcours';
import ConsultCoursModal from './cours/Consultcours';

import { Menu, MenuItem, List, ListItem, ListItemText, Dialog, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import "./boardprof.css"; // Assurez-vous que le chemin est correct
// import ChatInterface from './conversation/ChatInterface'; // Importer leimport "./boardprof.css"; // Assurez-vous que le chemin est correct
import { online } from "./dummydata"; // Supposons que cela existe pour l'exemple
import Heading from "../../common/heading/Heading";
import Header from '../../common/header/Header'; // Importez Header depuis le chemin correct
import Profile from '../../Profile'; // Import the Profile component
import MessageForm from './conversation/MessageForm';
import ChatRoom from './conversation/ChatRoom'; 
import io from 'socket.io-client'; // Import socket.io-client


const socket = io('http://localhost:8080'); // Replace with your server URL


const ProfDashboard = () => {
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

  const [isRattrapageFormOpen, setRattrapageFormOpen] = useState(false);
  const [isRattrapagesListOpen, setRattrapagesListOpen] = useState(false);
  const [rattrapagemenuAnchorEl, setRattrapageMenuAnchorEl] = useState(null);

  const handleOpenRattrapageForm = () => {
    setRattrapageFormOpen(true);
    handleCloseRattrapageMenu();
  };
  const handleCloseRattrapageForm = () => setRattrapageFormOpen(false);
  const handleOpenRattrapagesList = () => {
    setRattrapagesListOpen(true);
    handleCloseRattrapageMenu();
  };
  const handleCloseRattrapagesList = () => setRattrapagesListOpen(false);
  const handleRattrapageMenuClick = (event) =>
    setRattrapageMenuAnchorEl(event.currentTarget);
  const handleCloseRattrapageMenu = () => setRattrapageMenuAnchorEl(null);

  const [isImpressionProfFormOpen, setImpressionProfFormOpen] = useState(false);
  const [isImpressionProfsListOpen, setImpressionProfsListOpen] =
    useState(false);
  const [impressionprofmenuAnchorEl, setImpressionProfMenuAnchorEl] =
    useState(null);

  const handleOpenImpressionProfForm = () => {
    setImpressionProfFormOpen(true);
    handleCloseImpressionProfMenu();
  };
  const handleCloseImpressionProfForm = () => setImpressionProfFormOpen(false);
  const handleOpenImpressionProfsList = () => {
    setImpressionProfsListOpen(true);
    handleCloseImpressionProfMenu();
  };
  const handleCloseImpressionProfsList = () =>
    setImpressionProfsListOpen(false);
  const handleImpressionProfMenuClick = (event) =>
    setImpressionProfMenuAnchorEl(event.currentTarget);
  const handleCloseImpressionProfMenu = () =>
    setImpressionProfMenuAnchorEl(null);

  const [isMaterielProfFormOpen, setMaterielProfFormOpen] = useState(false);
  const [isMaterielProfsListOpen, setMaterielProfsListOpen] = useState(false);
  const [MaterielprofmenuAnchorEl, setMaterielProfMenuAnchorEl] =
    useState(null);

  const handleOpenMaterielProfForm = () => {
    setMaterielProfFormOpen(true);
    handleCloseMaterielProfMenu();
  };
  const handleCloseMaterielProfForm = () => setMaterielProfFormOpen(false);
  const handleOpenMaterielProfsList = () => {
    setMaterielProfsListOpen(true);
    handleCloseMaterielProfMenu();
  };
  const handleCloseMaterielProfsList = () => setMaterielProfsListOpen(false);
  const handleMaterielProfMenuClick = (event) =>
    setMaterielProfMenuAnchorEl(event.currentTarget);
  const handleCloseMaterielProfMenu = () => setMaterielProfMenuAnchorEl(null);

  const [isContactProfFormOpen, setContactProfFormOpen] = useState(false);
  const [isContactProfsListOpen, setContactProfsListOpen] = useState(false);
  const [ContactProfmenuAnchorEl, setContactProfMenuAnchorEl] = useState(null);

  const handleOpenContactProfForm = () => {
    setContactProfFormOpen(true);
    handleCloseContactProfMenu();
  };
  const handleCloseContactProfForm = () => setContactProfFormOpen(false);
  const handleOpenContactProfsList = () => {
    setContactProfsListOpen(true);
    handleCloseContactProfMenu();
  };
  const handleCloseContactProfsList = () => setContactProfsListOpen(false);
  const handleContactProfMenuClick = (event) =>
    setContactProfMenuAnchorEl(event.currentTarget);
  const handleCloseContactProfMenu = () => setContactProfMenuAnchorEl(null);

  // const [isMessageFormOpen, setMessageFormOpen] = useState(false);
  // const [recipientId, setRecipientId] = useState(null); // Define recipientId state here


  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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


  const [isAddCoursOpen, setAddCoursOpen] = useState(false);
  const [isListCoursOpen, setListCoursOpen] = useState(false);
  const [isEditCoursOpen, setIsEditCoursOpen] = useState(false);
  const [isConsultCoursOpen, setConsultCoursOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenNewCours = () => setAddCoursOpen(true);
  const handleCloseAddCours = () => setAddCoursOpen(false);
  const handleOpenListCours = () => setListCoursOpen(true);
  const handleCloseListCours = () => setListCoursOpen(false);
  const handleOpenEditCours = (cours) => {
    setSelectedCourse(cours);
    setIsEditCoursOpen(true);
  };
  const handleCloseEditCours = () => setIsEditCoursOpen(false);
  const handleOpenConsultCours = (cours) => {
    setSelectedCourse(cours);
    setConsultCoursOpen(true);
  };
  const handleCloseConsultCours = () => setConsultCoursOpen(false);

  const [coursMenuAnchorEl, setCoursMenuAnchorEl] = useState(null);
  const handleCoursMenuClick = (event) =>
    setCoursMenuAnchorEl(event.currentTarget);
  const handleCloseCoursMenu = () => setCoursMenuAnchorEl(null);

  const handleEditCours = (cours) => {
    console.log("Editing course:", cours);
    setSelectedCourse(cours);
    handleOpenEditCours(cours);
  };

  const handleConsultCours = (cours) => {
    setSelectedCourse(cours);
    handleOpenConsultCours(cours);
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

  const cardClickHandlers = {
    CATCH_UP: handleRattrapageMenuClick,
    PRINTING: handleImpressionProfMenuClick,
    EQUIPEMENT: handleMaterielProfMenuClick,
    CONTACT: handleContactProfMenuClick,
    COURSE: handleCoursMenuClick,
  };

  const handleLogout = () => {
    EventBus.dispatch("logout");
    navigate("/login");
  };

  if (!currentUser || !currentUser.roles.includes("ROLE_PROF")) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="heroprof">
      <Header />
      <div className="prof-dashboard">
        <h1 className="dashboard-title">Dashboard Trainer</h1>
        <div className="buttons-group">
        <button onClick={handleOpenProfile} className="btn1 ">Profile</button>

          <button onClick={handleLogout} className="btn1 ">Logout</button>
        </div>
        {/* Dialog for Profile */}
        {isProfileOpen && (
          <Dialog
            open={isProfileOpen}
            onClose={handleCloseProfile}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Profile</DialogTitle>
            <Profile />
            {/* You can pass props to Profile component if needed */}
          </Dialog>
        )}
        <section className="online">
          <div className="container">
            <Heading subtitle="WELCOME" title="Browse Your Services" />
            <div className="content grid3">
              {online.map((val) => (
                <div
                  className="box"
                  onClick={(e) => cardClickHandlers[val.courseName]?.(e)}
                >
                  <div className="img">
                    <img src={val.cover} alt="" />
                    <img src={val.hoverCover} alt="" className="show" />
                  </div>
                  <h1>{val.courseName}</h1>
                  <span>{val.course}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
       


<div className="chat-icon" onClick={() => setChatOpen(true)}>
          <ChatIcon style={{ fontSize: 40 }} />
        </div>

        <MessageForm
          open={isMessageFormOpen}
          onClose={handleCloseMessageForm}
          recipientId={recipientId}
        />

{isChatOpen && (
          <ChatRoom
            open={isChatOpen}
            onClose={handleCloseChat}
            conversationId={selectedConversation}
            recipientName={recipientName}
          />
        )}

        
        <RattrapageFormDialog
          open={isRattrapageFormOpen}
          onClose={handleCloseRattrapageForm}
        />
        <RattrapagesListModal
          open={isRattrapagesListOpen}
          onClose={handleCloseRattrapagesList}
        />
        <Menu
          anchorEl={rattrapagemenuAnchorEl}
          open={Boolean(rattrapagemenuAnchorEl)}
          onClose={handleCloseRattrapageMenu}
        >
          <MenuItem onClick={handleOpenRattrapageForm}>New Rattrapage</MenuItem>
          <MenuItem onClick={handleOpenRattrapagesList}>
            List's Rattrapages
          </MenuItem>
        </Menu>

        <ImpressionProfFormDialog
          open={isImpressionProfFormOpen}
          onClose={handleCloseImpressionProfForm}
        />
        <ImpressionProfsListModal
          open={isImpressionProfsListOpen}
          onClose={handleCloseImpressionProfsList}
        />
        <Menu
          anchorEl={impressionprofmenuAnchorEl}
          open={Boolean(impressionprofmenuAnchorEl)}
          onClose={handleCloseImpressionProfMenu}
        >
          <MenuItem onClick={handleOpenImpressionProfForm}>
            New ImpressionProf
          </MenuItem>
          <MenuItem onClick={handleOpenImpressionProfsList}>
            List's ImpressionProfs
          </MenuItem>
        </Menu>

        <MaterielProfFormDialog
          open={isMaterielProfFormOpen}
          onClose={handleCloseMaterielProfForm}
        />
        <MaterielProfsListModal
          open={isMaterielProfsListOpen}
          onClose={handleCloseMaterielProfsList}
        />
        <Menu
          anchorEl={MaterielprofmenuAnchorEl}
          open={Boolean(MaterielprofmenuAnchorEl)}
          onClose={handleCloseMaterielProfMenu}
        >
          <MenuItem onClick={handleOpenMaterielProfForm}>
            New MaterielProf
          </MenuItem>
          <MenuItem onClick={handleOpenMaterielProfsList}>
            List's MaterielProfs
          </MenuItem>
        </Menu>

        <ContactProfFormDialog
          open={isContactProfFormOpen}
          onClose={handleCloseContactProfForm}
        />
        <ContactProfsListModal
          open={isContactProfsListOpen}
          onClose={handleCloseContactProfsList}
        />
        <Menu
          anchorEl={ContactProfmenuAnchorEl}
          open={Boolean(ContactProfmenuAnchorEl)}
          onClose={handleCloseContactProfMenu}
        >
          <MenuItem onClick={handleOpenContactProfForm}>
            New ContactProf
          </MenuItem>
          <MenuItem onClick={handleOpenContactProfsList}>
            List's ContactProfs
          </MenuItem>
        </Menu>

        <NewCoursFormDialog
          open={isAddCoursOpen}
          onClose={handleCloseAddCours}
        />
        <ListCoursModal
          open={isListCoursOpen}
          onClose={handleCloseListCours}
          onEdit={handleEditCours}
          onConsult={handleConsultCours}
        />
        <EditCoursFormDialog
          open={isEditCoursOpen}
          onClose={handleCloseEditCours}
          courseId={selectedCourse?._id}
        />
        <ConsultCoursModal
          open={isConsultCoursOpen}
          onClose={handleCloseConsultCours}
          course={selectedCourse}
          courseId={selectedCourse?._id}
        />

        <Menu
          anchorEl={coursMenuAnchorEl}
          open={Boolean(coursMenuAnchorEl)}
          onClose={handleCloseCoursMenu}
        >
          <MenuItem onClick={handleOpenNewCours}>New Cours</MenuItem>
          <MenuItem onClick={handleOpenListCours}>List's Cours</MenuItem>
        </Menu>

       
       

      </div>
    </section>
  );
};

export default ProfDashboard;
