import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAttestation, getAttestation } from '../../../../actions/attestation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditAttestationModal({ open, onClose, attestationId }) {
  const [attestationData, setAttestationData] = useState({
    nom: '', prenom: '', email: '', matricule: '', cin: '', raison: '', type: '', statut: ''
  });
  const dispatch = useDispatch();
  const attestationDetail = useSelector(state => state.attestation.attestationDetail || {});

  useEffect(() => {
    if (open) {
      dispatch(getAttestation(attestationId));
    }
  }, [dispatch, open, attestationId]);

  useEffect(() => {
    if (attestationDetail) {
      setAttestationData({ 
        nom: attestationDetail.nom,
        prenom: attestationDetail.prenom,
        email: attestationDetail.email,
        matricule: attestationDetail.matricule,
        cin: attestationDetail.cin,
        raison: attestationDetail.raison,
        type: attestationDetail.type,
        // statut: attestationDetail.statut
      });
    }
  }, [attestationDetail]);

  const handleSave = () => {
    dispatch(editAttestation(attestationId, attestationData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier l'Attestation</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={attestationData.nom}
          onChange={(e) => setAttestationData({ ...attestationData, nom: e.target.value })}
        />
        <TextField
          label="Prénom"
          fullWidth
          margin="normal"
          value={attestationData.prenom}
          onChange={(e) => setAttestationData({ ...attestationData, prenom: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={attestationData.email}
          onChange={(e) => setAttestationData({ ...attestationData, email: e.target.value })}
        />
        <TextField
          label="Matricule"
          fullWidth
          margin="normal"
          value={attestationData.matricule}
          onChange={(e) => setAttestationData({ ...attestationData, matricule: e.target.value })}
        />
        <TextField
          label="CIN"
          fullWidth
          margin="normal"
          value={attestationData.cin}
          onChange={(e) => setAttestationData({ ...attestationData, cin: e.target.value })}
        />
        <TextField
          label="Raison"
          fullWidth
          margin="normal"
          value={attestationData.raison}
          onChange={(e) => setAttestationData({ ...attestationData, raison: e.target.value })}
        />
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          value={attestationData.type}
          onChange={(e) => setAttestationData({ ...attestationData, type: e.target.value })}
        />
        <TextField
          label="Statut"
          fullWidth
          margin="normal"
          value={attestationData.statut}
          onChange={(e) => setAttestationData({ ...attestationData, statut: e.target.value })}
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
