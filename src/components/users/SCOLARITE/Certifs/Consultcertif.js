import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCertif } from '../../../../actions/certif.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function CertifDetailModal({ open, onClose, certifId }) {
  const dispatch = useDispatch();
  const { certifDetail } = useSelector(state => state.certif);

  useEffect(() => {
    if (open) {
      dispatch(getCertif(certifId));
    }
  }, [dispatch, open, certifId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Certification Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {certifDetail.title}</Typography>
        <Typography variant="body1">Description: {certifDetail.description}</Typography>
        <Typography variant="body1">Responsable: {certifDetail.responsable}</Typography>
        <Typography variant="body1">Type: {certifDetail.type}</Typography>
        <Typography variant="body1">Date et Heure: {new Date(certifDetail.schedule).toLocaleString()}</Typography>
        <Typography variant="body1">Lieu: {certifDetail.location}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
