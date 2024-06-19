import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addContactProf } from '../../../../actions/contact.prof.actions';

export default function ContactProfFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log("Current user in attestFormDialog:", currentUser.accessToken);
  const initialFormValues = {
   objet:'',
   message:'',
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formValues.objet || !formValues.message ) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }
    const completeContactProfData = { ...formValues, user: currentUser.id };
    dispatch(addContactProf(completeContactProfData, currentUser.id))
      .then(() => {
        alert('ContactProf ajoutée avec succès! ✅');
        onClose();
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'attestation:', error);
        alert('Erreur lors de l\'ajout de l\'attestation ❌');
      });
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter une attestation
        </Typography>
        <TextField
          margin="dense"
          name="objet"
          label="Objet"
          type="text"
          fullWidth
          value={formValues.objet}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="message"
          label="Message"
          type="text"
          fullWidth
          value={formValues.message}
          onChange={handleChange}
        />
       
      
       
       
      
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}