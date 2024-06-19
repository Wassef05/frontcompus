import React from 'react';
import ImpressionProfsTable from './ImpressionsTable'; // Assurez-vous que le chemin d'accès est correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ImpressionProfsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des ImpressionProfs</DialogTitle>
      <DialogContent>
        <ImpressionProfsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
