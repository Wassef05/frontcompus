import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrice } from '../../../../actions/pricing.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function PriceDetailModal({ open, onClose, priceId }) {
  const dispatch = useDispatch();
  const { priceDetail } = useSelector(state => state.price);

  useEffect(() => {
    if (open) {
      dispatch(getPrice(priceId));
    }
  }, [dispatch, open, priceId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Priceication Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {priceDetail.title}</Typography>
        <Typography variant="body1">Description: {priceDetail.description}</Typography>
       
        <Typography variant="body1">Type: {priceDetail.type}</Typography>
        <Typography variant="body1">Date et Heure: {new Date(priceDetail.schedule).toLocaleString()}</Typography>
        <Typography variant="body1">Lieu: {priceDetail.location}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}
