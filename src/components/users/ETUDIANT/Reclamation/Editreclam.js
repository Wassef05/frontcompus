import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReclamation, getReclamation } from '../../../../actions/reclamation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditReclamationModal({ open, onClose, reclamationId }) {
  const [reclamationData, setReclamationData] = useState({
    nom: '', prenom: '', email: '', matricule: '', cin: '', description: '', type: '', reponse: ''
  });
  const dispatch = useDispatch();
  const reclamationDetail = useSelector(state => state.reclamation.reclamationDetail || {});

  useEffect(() => {
    if (open) {
      dispatch(getReclamation(reclamationId));
    }
  }, [dispatch, open, reclamationId]);

  useEffect(() => {
    if (reclamationDetail) {
      setReclamationData({ 
        nom: reclamationDetail.nom,
        prenom: reclamationDetail.prenom,
        email: reclamationDetail.email,
        matricule: reclamationDetail.matricule,
        cin: reclamationDetail.cin,
        description: reclamationDetail.description,
        type: reclamationDetail.type,

    
        // statut: reclamationDetail.statut
      });
    }
  }, [reclamationDetail]);

  const handleSave = () => {
    dispatch(editReclamation(reclamationId, reclamationData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier l'Reclamation</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={reclamationData.nom}
          onChange={(e) => setReclamationData({ ...reclamationData, nom: e.target.value })}
        />
        <TextField
          label="Prénom"
          fullWidth
          margin="normal"
          value={reclamationData.prenom}
          onChange={(e) => setReclamationData({ ...reclamationData, prenom: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={reclamationData.email}
          onChange={(e) => setReclamationData({ ...reclamationData, email: e.target.value })}
        />
        <TextField
          label="Matricule"
          fullWidth
          margin="normal"
          value={reclamationData.matricule}
          onChange={(e) => setReclamationData({ ...reclamationData, matricule: e.target.value })}
        />
        <TextField
          label="CIN"
          fullWidth
          margin="normal"
          value={reclamationData.cin}
          onChange={(e) => setReclamationData({ ...reclamationData, cin: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={reclamationData.description}
          onChange={(e) => setReclamationData({ ...reclamationData, raison: e.target.value })}
        />
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          value={reclamationData.type}
          onChange={(e) => setReclamationData({ ...reclamationData, type: e.target.value })}
        />
        <TextField
          label="Statut"
          fullWidth
          margin="normal"
          value={reclamationData.statut}
          onChange={(e) => setReclamationData({ ...reclamationData, statut: e.target.value })}
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
