import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, editEvent } from '../../../../actions/event.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditEventModal({ open, onClose, eventId }) {
  const dispatch = useDispatch();
  const { eventDetail } = useSelector(state => state.event);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
   
    type: '',
    schedule: '', // Note: This needs to be converted to a suitable format for input[type='datetime-local']
    location: ''
  });

  useEffect(() => {
    if (open && eventId) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, open, eventId]);

  useEffect(() => {
    if (eventDetail && open) {
      setEventData({
        title: eventDetail.title || '',
        description: eventDetail.description || '',
      
        type: eventDetail.type || '',
        schedule: eventDetail.schedule ? eventDetail.schedule.substr(0, 16) : '', // Adjust for datetime-local input
        location: eventDetail.location || ''
      });
    }
  }, [eventDetail, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSave = () => {
    dispatch(editEvent(eventId, eventData))
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour de la eventication:', error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Eventication</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="title" label="Titre" type="text" fullWidth value={eventData.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth multiline maxRows={4} value={eventData.description} onChange={handleChange} />
        <TextField margin="dense" name="responsable" label="Responsable" type="text" fullWidth value={eventData.responsable} onChange={handleChange} />
        <TextField margin="dense" name="type" label="Type" type="text" fullWidth value={eventData.type} onChange={handleChange} />
        <TextField margin="dense" name="schedule" label="Date et Heure" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={eventData.schedule} onChange={handleChange} />
        <TextField margin="dense" name="location" label="Lieu" type="text" fullWidth value={eventData.location} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
