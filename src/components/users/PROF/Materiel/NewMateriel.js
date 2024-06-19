import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addMaterielProf } from '../../../../actions/materiel.prof.actions';


export default function MaterielProfFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const initialFormValues = {
    materiel: '',
    remarque: '',
    schedule: '', // Utilize dayjs or a similar library if handling dates
    location: ''
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
    if (!formValues.materiel || !formValues.remarque || !formValues.schedule || !formValues.location) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }
    const completeMaterielProfData = { ...formValues, user: currentUser.id };
    dispatch(addMaterielProf(completeMaterielProfData, currentUser.id))
      .then(() => {
        alert('MaterielProf ajoutée avec succès! ✅');
        onClose();
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'MaterielProf:', error);
        alert('Erreur lors de l\'ajout de l\'MaterielProf ❌');
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter une demande materiel
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="materiel"
          label="Materiel"
          type="text"
          fullWidth
          value={formValues.materiel}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="remarque"
          label="Remarque"
          type="text"
          fullWidth
          value={formValues.remarque}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="schedule"
          label="Date et Heure"
          type="datetime-local"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={formValues.schedule}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Lieu"
          type="text"
          fullWidth
          value={formValues.location}
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
