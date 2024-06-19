import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addNote } from '../../../../actions/note.actions';

export default function NoteFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  // Récupérer les informations de l'utilisateur connecté depuis l'état Redux
  const { user: currentUser } = useSelector((state) => state.auth);// Remplacez 'userLogin' par le nom approprié de votre état d'authentification
  console.log("Current user in NoteFormDialog:", currentUser.accessToken);
  // Initialiser les valeurs du formulaire pour le titre et le contenu de la note
  const initialFormValues = {
    title: '',
    content: '',
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Gérer la soumission du formulaire pour créer une nouvelle note
  const handleSubmit = () => {
    if (!formValues.title || !formValues.content) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const completeNoteData = { ...formValues, user: currentUser.id };

    dispatch(addNote(completeNoteData, currentUser.id))
        .then(() => {
            alert('Note ajoutée avec succès! ✅');
            onClose();
            setFormValues(initialFormValues);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'ajout de la note:', error);
            alert('Erreur lors de l\'ajout de la note ❌');
        });
};
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter une Note
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Titre"
          type="text"
          fullWidth
          value={formValues.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="content"
          label="Contenu"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={formValues.content}
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
