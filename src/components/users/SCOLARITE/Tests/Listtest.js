import React from 'react';
import TestsTable from './TestsTable'; // Make sure the path is correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function TestsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste formulaires des Stages</DialogTitle>
      <DialogContent>
        <TestsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
