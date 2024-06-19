import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmploi } from '../../../../actions/emploi.actions'; // Assurez-vous que le chemin est correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function EmploiDetailModal({ open, onClose, emploiId }) {
  const dispatch = useDispatch();
  const { emploiDetail } = useSelector(state => state.emploi); // Vérifiez que cela correspond à la structure de votre état Redux

  useEffect(() => {
    if (open && emploiId) {
      dispatch(getEmploi(emploiId));
    }
  }, [dispatch, open, emploiId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails de l'Emploi</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {emploiDetail.title}</Typography>
        <Typography variant="body1">Description: {emploiDetail.description}</Typography>
        <Typography variant="body1">User: {emploiDetail.user && emploiDetail.user.username}</Typography>


        <Typography variant="body1">
          Fichier: 
          {emploiDetail.file ? (
            <a href={`http://localhost:8080/uploads/${emploiDetail.file}`} target="_blank" rel="noopener noreferrer">
              Voir le fichier
            </a>
          ) : "Aucun fichier"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
