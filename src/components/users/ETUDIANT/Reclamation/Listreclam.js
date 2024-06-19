import React from 'react';
import ReclamationsTable from './ReclamsTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ReclamationsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Reclamations</DialogTitle>
      <DialogContent>
        <ReclamationsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
