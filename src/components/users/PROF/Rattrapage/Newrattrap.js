import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRattrapage } from '../../../../actions/rattrapage.actions'; // Vérifiez le chemin
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RattrapageFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log("Current user in rattrapFormDialog:", currentUser.accessToken);

  const initialFormValues = {
    matiere: '',
    description: '',
    reponse: 'En attente',
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
    if (!formValues.matiere || !formValues.description  ||  !formValues.reponse) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }
    const completeRattrapageData = { ...formValues, user: currentUser.id };
    dispatch(addRattrapage(completeRattrapageData, currentUser.id))
      .then(() => {
        alert('Rattrapage ajoutée avec succès! ✅');
        onClose();
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de rattrapage:', error);
        alert('Erreur lors de l\'ajout de rattrapage ❌');
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter un rattrapage
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="matiere"
          label="matiere"
          type="text"
          fullWidth
          value={formValues.matiere}
          onChange={handleChange}
        />
        
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={2}
          value={formValues.description}
          onChange={handleChange}
        />
       
       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit} color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}
