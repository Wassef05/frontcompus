import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addAttestation } from '../../../../actions/attestation.actions';

export default function AttestationFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("Current user in attestFormDialog:", currentUser.accessToken);
  const initialFormValues = {
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    cin: '',
    raison: '',
    type: '',
    statut: 'En attente', // La valeur par défaut du statut, si nécessaire
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
    if (!formValues.nom || !formValues.prenom || !formValues.email || !formValues.matricule || !formValues.cin || !formValues.raison || !formValues.type) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }
    const completeAttestationData = { ...formValues, user: currentUser.id };
    dispatch(addAttestation(completeAttestationData, currentUser.id))
      .then(() => {
        alert('Attestation ajoutée avec succès! ✅');
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
          label="CIN"
          type="text"
          fullWidth
          value={formValues.cin}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="raison"
          label="Raison"
          type="text"
          fullWidth
          multiline
          rows={2}
          value={formValues.raison}
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