import React from 'react';
import AnnoncesTable from './AnnoncesTable'; // Make sure the path is correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function AnnoncesListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Annonces</DialogTitle>
      <DialogContent>
        <AnnoncesTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
