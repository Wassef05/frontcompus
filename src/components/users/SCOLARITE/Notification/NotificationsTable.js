import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, updateNotificationStatus, deleteNotification } from '../../../../actions/notification.actions';
import NotificationDetailModal from './Consulnotification';
import EditNotificationStatusModal from './Editnotification';
import EditReclamationResponseModal from './Editnotificationone';
import EditRattrapageResponseModal from './Editnotificationratrap'; // Assurez-vous que le chemin est correct
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { FiEye, FiEdit, FiCheckSquare, FiTrash2 } from 'react-icons/fi';


export default function NotificationsTable() {
  const dispatch = useDispatch();
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [openEditStatusModal, setOpenEditStatusModal] = useState(false);

  const [openEditResponseModal, setOpenEditResponseModal] = useState(false);

  const [openEditRattrapageResponseModal, setOpenEditRattrapageResponseModal] = useState(false); 

  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [selectedAttestationId, setSelectedAttestationId] = useState('');
  const [selectedReclamationId, setSelectedReclamationId] = useState('');
  const [selectedRattrapageId, setSelectedRattrapageId] = useState('');

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const notifications = useSelector(state => state.notification.notifications || []);
  const handleDeleteNotification = (id) => {
    // Confirmation avant la suppression
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
      dispatch(deleteNotification(id));
      // Rafraîchissement des notifications
    }
  };
 
  
  const handleOpenDetailModal = (id) => {
    setSelectedNotificationId(id);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedNotificationId(null);
  };

  const handleOpenEditStatusModal = (id, type) => {
    if (type === 'Attestation') {
      setSelectedAttestationId(id);
      setOpenEditStatusModal(true);
    } else if (type === 'Reclamation') {
      setSelectedReclamationId(id);
      setOpenEditResponseModal(true);
    } else if (type == 'Rattrapage'){
      setSelectedRattrapageId(id);
      setOpenEditRattrapageResponseModal(true);
    }
  };

  const handleCloseEditStatusModal = () => {
    setOpenEditStatusModal(false);
    setSelectedAttestationId('');
  };

  const handleCloseEditResponseModal = () => {
    setOpenEditResponseModal(false);
    setSelectedReclamationId('');
  };

  const handleCloseEditRattrapageResponseModal = () => {
    setOpenEditRattrapageResponseModal(false);
    setSelectedRattrapageId('');
  };
  

  // const handleOpenEditRattrapageResponseModal = () => {
  //   setSelectedRattrapageId('');
  //   setOpenEditRattrapageResponseModal(false);
  // };

 
  const handleMarkAsRead = (id) => {
    dispatch(updateNotificationStatus(id, 'lu'));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="notifications table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Détails</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification._id}>
                <TableCell>{format(new Date(notification.creationDate), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{notification.type}</TableCell>
                <TableCell>{notification.status}</TableCell>
                <TableCell>
                  Nom: {notification.relatedRecordId.nom}<br/>
                  Prénom: {notification.relatedRecordId.prenom}<br/>
                  Email: {notification.relatedRecordId.email}<br/>
                  Matricule: {notification.relatedRecordId.matricule}

                  {notification.type === 'Rattrapage' && (
                    <>
                    
                      matiere: {notification.relatedRecordId.matiere}<br/>
                      description: {notification.relatedRecordId.description}<br/>
                      Réponse: {notification.relatedRecordId.reponse}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleMarkAsRead(notification._id)} title="Marquer comme lu">
                    <FiCheckSquare style={{ color: 'green' }}/>
                  </IconButton>
                  <IconButton onClick={() => handleOpenDetailModal(notification._id)} title="Consulter">
                    <FiEye style={{ color: 'blue' }}/>
                  </IconButton>
                  <IconButton onClick={() => handleOpenEditStatusModal(notification.relatedRecordId._id, notification.type)} title="Modifier">
                    <FiEdit style={{ color: 'orange' }}/>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNotification(notification._id)} title="Supprimer">
                  <FiTrash2 style={{ color: 'red' }}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NotificationDetailModal open={openDetailModal} onClose={handleCloseDetailModal} notificationId={selectedNotificationId} />
      <EditNotificationStatusModal open={openEditStatusModal} onClose={handleCloseEditStatusModal} attestationId={selectedAttestationId} />
    
      <EditReclamationResponseModal open={openEditResponseModal} onClose={handleCloseEditResponseModal} reclamationId={selectedReclamationId} />
      <EditRattrapageResponseModal open={openEditRattrapageResponseModal} onClose={handleCloseEditRattrapageResponseModal} rattrapageId={selectedRattrapageId} />

    </>
  );
}
