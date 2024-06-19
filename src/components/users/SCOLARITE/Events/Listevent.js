import React from 'react';
import EventsTable from './EventsTable'; // Make sure the path is correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function EventsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Events</DialogTitle>
      <DialogContent>
        <EventsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
