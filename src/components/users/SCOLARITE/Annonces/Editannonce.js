import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnonce, editAnnonce } from '../../../../actions/annonce.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditAnnonceModal({ open, onClose, annonceId }) {
  const dispatch = useDispatch();
  const { annonceDetail } = useSelector(state => state.annonce);
  const [annonceData, setAnnonceData] = useState({
    title: '',
    description: '',
    responsable: '',
   
    schedule: '', // Note: This needs to be converted to a suitable format for input[type='datetime-local']
  
  });

  useEffect(() => {
    if (open && annonceId) {
      dispatch(getAnnonce(annonceId));
    }
  }, [dispatch, open, annonceId]);

  useEffect(() => {
    if (annonceDetail && open) {
      setAnnonceData({
        title: annonceDetail.title || '',
        description: annonceDetail.description || '',
        responsable: annonceDetail.responsable || '',
       
        schedule: annonceDetail.schedule ? annonceDetail.schedule.substr(0, 16) : '', // Adjust for datetime-local input
      
      });
    }
  }, [annonceDetail, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonceData({ ...annonceData, [name]: value });
  };

  const handleSave = () => {
    dispatch(editAnnonce(annonceId, annonceData))
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour de la annonceication:', error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Annonceication</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="title" label="Titre" type="text" fullWidth value={annonceData.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth multiline maxRows={4} value={annonceData.description} onChange={handleChange} />
        <TextField margin="dense" name="responsable" label="Responsable" type="text" fullWidth value={annonceData.responsable} onChange={handleChange} />
      
        <TextField margin="dense" name="schedule" label="Date et Heure" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={annonceData.schedule} onChange={handleChange} />
   
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
