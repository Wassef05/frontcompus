import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../../../actions/event.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function EventDetailModal({ open, onClose, eventId }) {
  const dispatch = useDispatch();
  const { eventDetail } = useSelector(state => state.event);

  useEffect(() => {
    if (open) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, open, eventId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Eventication Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {eventDetail.title}</Typography>
        <Typography variant="body1">Description: {eventDetail.description}</Typography>
       
        <Typography variant="body1">Type: {eventDetail.type}</Typography>
        <Typography variant="body1">Date et Heure: {new Date(eventDetail.schedule).toLocaleString()}</Typography>
        <Typography variant="body1">Lieu: {eventDetail.location}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
