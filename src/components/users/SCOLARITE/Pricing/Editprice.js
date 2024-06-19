import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrice, editPrice } from '../../../../actions/pricing.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditPriceModal({ open, onClose, priceId }) {
  const dispatch = useDispatch();
  const { priceDetail } = useSelector(state => state.price);
  const [priceData, setPriceData] = useState({
    title: '',
    description: '',
     price:'',
  });

  useEffect(() => {
    if (open && priceId) {
      dispatch(getPrice(priceId));
    }
  }, [dispatch, open, priceId]);

  useEffect(() => {
    if (priceDetail && open) {
      setPriceData({
        title: priceDetail.title || '',
        description: priceDetail.description || '',
      
        price: priceDetail.price || '',
       
      });
    }
  }, [priceDetail, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceData({ ...priceData, [name]: value });
  };

  const handleSave = () => {
    dispatch(editPrice(priceId, priceData))
      .then(() => onClose())
      .catch(error => console.error('Erreur lors de la mise à jour de la priceication:', error));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Priceication</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="title" label="Titre" type="text" fullWidth value={priceData.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth multiline maxRows={4} value={priceData.description} onChange={handleChange} />
        <TextField margin="dense" name="price" label="Price" type="string" fullWidth value={priceData.price} onChange={handleChange} />
 
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
