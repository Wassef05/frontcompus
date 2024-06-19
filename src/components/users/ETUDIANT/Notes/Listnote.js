import React from 'react';
import NotesTable from './NotesTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function NotesListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Notes</DialogTitle>
      <DialogContent>
        <NotesTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
