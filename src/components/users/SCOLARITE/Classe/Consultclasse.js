import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasseById } from '../../actions/classe.actions'; // Ajustez le chemin selon votre structure
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ClasseDetailModal({ open, onClose, classeId }) {
  const dispatch = useDispatch();
  // Assurez-vous que la structure de votre state correspond à cette implémentation
  const { classeDetail } = useSelector(state => state.classe);

  useEffect(() => {
    if (open) {
      dispatch(getClasseById(classeId));
    }
  }, [dispatch, open, classeId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails de la Classe</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Nom de la Classe: {classeDetail.nomClasse}</Typography>
        <Typography variant="body1">Niveau: {classeDetail.niveau}</Typography>
        <Typography variant="body1">Année Scolaire: {classeDetail.anneeScolaire}</Typography>
        {/* Assurez-vous que vous avez une façon d'afficher le nom du professeur, pas juste son ID */}
        <Typography variant="body1">Professeur: {classeDetail.professeur}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
