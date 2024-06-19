import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationById } from '../../../../actions/notification.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function NotificationDetailModal({ open, onClose, notificationId }) {
  const dispatch = useDispatch();

 
  const notificationDetail = useSelector(state => state.notification.notificationDetail || {});

  useEffect(() => {
    console.log("notifDetailModal - useEffect - open:", open, "notifId:", notificationId);
    if (open && notificationId) {
      dispatch(fetchNotificationById(notificationId));
    }
  }, [dispatch, open, notificationId]);
  console.log("notifnDetailModal - noitifDetail:", notificationDetail);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails de la Notification</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Type: {notificationDetail.type}</Typography>
        <Typography variant="body1">Statut: {notificationDetail.status}</Typography>
        <Typography variant="body1">Date de création: {notificationDetail.creationDate ? new Date(notificationDetail.creationDate).toLocaleDateString() : 'N/A'}</Typography>
        {/* Affichez ici d'autres détails de la notification ou de l'attestation/réclamation associée */}
        {notificationDetail.relatedRecordId && (
          <>
            <Typography variant="h6">Détails Associés:</Typography>
            <Typography variant="body1">Nom: {notificationDetail.relatedRecordId.nom}</Typography>
            <Typography variant="body1">Prénom: {notificationDetail.relatedRecordId.prenom}</Typography>
            <Typography variant="body1">Email: {notificationDetail.relatedRecordId.email}</Typography>
            <Typography variant="body1">Matricule: {notificationDetail.relatedRecordId.matricule}</Typography>
            <Typography variant="body1">Raison: {notificationDetail.relatedRecordId.raison}</Typography>
            <Typography variant="body1">Status: {notificationDetail.relatedRecordId.statut}</Typography>
            <Typography variant="body1">Type: {notificationDetail.relatedRecordId.type}</Typography>
            <Typography variant="body1">Matiere: {notificationDetail.relatedRecordId.matiere}</Typography>
            <Typography variant="body1">Description: {notificationDetail.relatedRecordId.description}</Typography>
            <Typography variant="body1">Response: {notificationDetail.relatedRecordId.response}</Typography>
            {/* Ajoutez ici d'autres détails pertinents */}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
