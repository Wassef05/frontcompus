import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReclamationResponse } from '../../../../actions/reclamation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditReclamationResponseModal({ open, onClose, reclamationId }) {
  const [newResponse, setNewResponse] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (reclamationId && newResponse) {
      dispatch(updateReclamationResponse(reclamationId, newResponse));
    }
    onClose(); // Ferme le modal après l'envoi
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier la Réponse de la Réclamation</DialogTitle>
      <DialogContent>
        <TextField
          label="Nouvelle Réponse"
          fullWidth
          margin="normal"
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
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
