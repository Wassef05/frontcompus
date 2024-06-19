import React from 'react';
import AttestationsTable from './AttestationsTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function AttestationsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Attestations</DialogTitle>
      <DialogContent>
        <AttestationsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
