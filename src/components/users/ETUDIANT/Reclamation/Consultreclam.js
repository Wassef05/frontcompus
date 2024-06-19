import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReclamation } from '../../../../actions/reclamation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ReclamationDetailModal({ open, onClose, reclamationId }) {
  const dispatch = useDispatch();

  // Vérifiez le chemin d'accès correct dans le state Redux pour les détails de l'reclamation
  const reclamationDetail = useSelector(state => state.reclamation.reclamationDetail || {});

  useEffect(() => {
    console.log("ReclamationDetailModal - useEffect - open:", open, "reclamationId:", reclamationId);
    if (open) {
      dispatch(getReclamation(reclamationId));
    }
  }, [dispatch, open, reclamationId]);

  console.log("ReclamationDetailModal - reclamationDetail:", reclamationDetail);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails de Reclamation</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Nom: {reclamationDetail.nom}</Typography>
        <Typography variant="body1">Prénom: {reclamationDetail.prenom}</Typography>
        <Typography variant="body1">Email: {reclamationDetail.email}</Typography>
        <Typography variant="body1">Matricule: {reclamationDetail.matricule}</Typography>
        <Typography variant="body1">CIN: {reclamationDetail.cin}</Typography>
        <Typography variant="body1">Description: {reclamationDetail.description}</Typography>
        <Typography variant="body1">Type: {reclamationDetail.type}</Typography>
        <Typography variant="body1">Reponse: {reclamationDetail.reponse}</Typography>
        <Typography variant="body1">Mis à jour le: {reclamationDetail.updatedAt ? new Date(reclamationDetail.updatedAt).toLocaleDateString() : 'N/A'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
