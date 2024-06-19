import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttestation } from '../../../../actions/attestation.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function AttestationDetailModal({ open, onClose, attestationId }) {
  const dispatch = useDispatch();

  // Vérifiez le chemin d'accès correct dans le state Redux pour les détails de l'attestation
  const attestationDetail = useSelector(state => state.attestation.attestationDetail || {});

  useEffect(() => {
    console.log("AttestationDetailModal - useEffect - open:", open, "attestationId:", attestationId);
    if (open) {
      dispatch(getAttestation(attestationId));
    }
  }, [dispatch, open, attestationId]);

  console.log("AttestationDetailModal - attestationDetail:", attestationDetail);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails de l'Attestation</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Nom: {attestationDetail.nom}</Typography>
        <Typography variant="body1">Prénom: {attestationDetail.prenom}</Typography>
        <Typography variant="body1">Email: {attestationDetail.email}</Typography>
        <Typography variant="body1">Matricule: {attestationDetail.matricule}</Typography>
        <Typography variant="body1">CIN: {attestationDetail.cin}</Typography>
        <Typography variant="body1">Raison: {attestationDetail.raison}</Typography>
        <Typography variant="body1">Type: {attestationDetail.type}</Typography>
        <Typography variant="body1">Statut: {attestationDetail.statut}</Typography>
        <Typography variant="body1">Mis à jour le: {attestationDetail.updatedAt ? new Date(attestationDetail.updatedAt).toLocaleDateString() : 'N/A'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
