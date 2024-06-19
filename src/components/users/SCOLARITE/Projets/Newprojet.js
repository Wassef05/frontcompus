import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { addProjet } from '../../../../actions/projet.scol.actions';

export default function ProjetFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  
  const initialFormValues = {
    title: '',
    description: '',
    files: [], // Champ pour stocker les fichiers sélectionnés
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convertir la FileList en un tableau
    setFormValues({ ...formValues, files }); // Mettre à jour les fichiers dans le state
  };

  const handleSubmit = () => {
    // Créer un FormData pour envoyer les fichiers
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    // Ajouter chaque fichier au FormData
    formValues.files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    // Options de la requête axios
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    // Envoyer la requête avec le FormData contenant les fichiers
    dispatch(addProjet(formData, config)).then(() => {
      alert('Projet ajoutée avec succès! ✅');
      onClose();
      setFormValues(initialFormValues);
    }).catch((error) => {
      console.error('Erreur lors de l\'ajout de la projet.scol:', error);
      alert('Erreur lors de l\'ajout de la projet.scol ❌');
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>Ajouter un Projet</Typography>
        <TextField autoFocus margin="dense" name="title" label="Titre" type="text" fullWidth value={formValues.title} onChange={handleChange} />
        <TextField margin="dense" name="description" label="Description" type="text" fullWidth multiline maxRows={4} value={formValues.description} onChange={handleChange} />
        {/* Champ pour sélectionner les fichiers */}
        <input type="file" multiple onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit} color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}
