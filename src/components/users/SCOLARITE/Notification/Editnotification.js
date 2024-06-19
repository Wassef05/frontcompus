import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAttestationStatus } from '../../../../actions/attestation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditNotificationStatusModal({ open, onClose, attestationId }) {
  const [newStatus, setNewStatus] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (attestationId && newStatus) {
      dispatch(updateAttestationStatus(attestationId, newStatus));
    }
    onClose(); // Ferme le modal après l'envoi
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier le Statut de l'Attestation</DialogTitle>
      <DialogContent>
        <TextField
          label="Nouveau Statut"
          fullWidth
          margin="normal"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          // Vous pouvez ajouter des options pour les statuts si nécessaire
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Enregistrer
        </Button>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}
