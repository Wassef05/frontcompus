import React from 'react';
import MaterielProfsTable from './MaterielsTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function MaterielProfsListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des MaterielProfs</DialogTitle>
      <DialogContent>
        <MaterielProfsTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
