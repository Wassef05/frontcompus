import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addReclamation } from '../../../../actions/reclamation.actions';

export default function ReclamationFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("Current user in attestFormDialog:", currentUser.accessToken);
  const initialFormValues = {
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    cin: '',
    description: '',
    type: '',
    reponse: 'En attente', // La valeur par défaut du statut, si nécessaire
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
    if (!formValues.nom || !formValues.prenom || !formValues.email || !formValues.matricule || !formValues.cin || !formValues.description || !formValues.type) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }
    const completeReclamationData = { ...formValues, user: currentUser.id };
    dispatch(addReclamation(completeReclamationData, currentUser.id))
      .then(() => {
        alert('Reclamation ajoutée avec succès! ✅');
        onClose();
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'reclamation:', error);
        alert('Erreur lors de l\'ajout de l\'reclamation ❌');
      });
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter une reclamation
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="nom"
          label="Nom"
          type="text"
          fullWidth
          value={formValues.nom}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="prenom"
          label="Prénom"
          type="text"
          fullWidth
          value={formValues.prenom}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="matricule"
          label="Matricule"
          type="text"
          fullWidth
          value={formValues.matricule}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cin"
          label="Cin"
          type="text"
          fullWidth
          value={formValues.cin}
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
       
        <TextField
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          value={formValues.type}
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
