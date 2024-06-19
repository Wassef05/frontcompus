import React from 'react';
import EmploisTable from './EmploisTable'; // Assurez-vous que le chemin est correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function EmploisListModal({ open, onClose }) {
  // Assurez-vous que `onClose` est bien défini et qu'il gère la fermeture du modal

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Emplois</DialogTitle>
      <DialogContent>
      <EmploisTable onClose={onClose} />

        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
