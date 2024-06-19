import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCertif, editCertif } from '../../../../actions/certif.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditCertifModal({ open, onClose, certifId }) {
  const dispatch = useDispatch();
  const { certifDetail } = useSelector(state => state.certif);
  const [certifData, setCertifData] = useState({
    title: '',
    description: '',
    responsable: '',
    type: '',
    schedule: '', // Note: This needs to be converted to a suitable format for input[type='datetime-local']
    location: ''
  });

  useEffect(() => {
    if (open && certifId) {
      dispatch(getCertif(certifId));
    }
  }, [dispatch, open, certifId]);

  useEffect(() => {
    if (certifDetail && open) {
      setCertifData({
        title: certifDetail.title || '',
        description: certifDetail.description || '',
        responsable: certifDetail.responsable || '',
        type: certifDetail.type || '',
        schedule: certifDetail.schedule ? certifDetail.schedule.substr(0, 16) : '', // Adjust for datetime-local input
        location: certifDetail.location || ''
      });
    }
  }, [certifDetail, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertifData({ ...certifData, [name]: value });
  };

  const handleSave = () => {
    dispatch(editCertif(certifId, certifData))
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour de la certification:', error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Certification</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="title" label="Titre" type="text" fullWidth value={certifData.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth multiline maxRows={4} value={certifData.description} onChange={handleChange} />
        <TextField margin="dense" name="responsable" label="Responsable" type="text" fullWidth value={certifData.responsable} onChange={handleChange} />
        <TextField margin="dense" name="type" label="Type" type="text" fullWidth value={certifData.type} onChange={handleChange} />
        <TextField margin="dense" name="schedule" label="Date et Heure" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={certifData.schedule} onChange={handleChange} />
        <TextField margin="dense" name="location" label="Lieu" type="text" fullWidth value={certifData.location} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
