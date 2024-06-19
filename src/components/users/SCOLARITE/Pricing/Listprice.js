import React from 'react';
import PricesTable from './PricesTable'; // Make sure the path is correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function PricesListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Prices</DialogTitle>
      <DialogContent>
        <PricesTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
