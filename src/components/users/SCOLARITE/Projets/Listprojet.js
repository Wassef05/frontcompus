import React from 'react';
import ProjetsTable from './ProjetsTable'; // Make sure the path is correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ProjetsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste formulaires des Projets</DialogTitle>
      <DialogContent>
        <ProjetsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
