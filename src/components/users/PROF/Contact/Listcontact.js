import React from 'react';
import ContactProfsTable from './ContactsTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ContactProfsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des ContactProfs</DialogTitle>
      <DialogContent>
        <ContactProfsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
