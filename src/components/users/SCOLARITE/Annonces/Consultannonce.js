import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnonce } from '../../../../actions/annonce.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function AnnonceDetailModal({ open, onClose, annonceId }) {
  const dispatch = useDispatch();
  const { annonceDetail } = useSelector(state => state.annonce);

  useEffect(() => {
    if (open) {
      dispatch(getAnnonce(annonceId));
    }
  }, [dispatch, open, annonceId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Annonce Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {annonceDetail.title}</Typography>
        <Typography variant="body1">Description: {annonceDetail.description}</Typography>
        <Typography variant="body1">Responsable: {annonceDetail.responsable}</Typography>
      
        <Typography variant="body1">Date et Heure: {new Date(annonceDetail.schedule).toLocaleString()}</Typography>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
