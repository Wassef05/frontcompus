import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { getEmploi, editEmploi } from '../../../../actions/emploi.actions';

export default function EditEmploiModal({ open, onClose, emploiId }) {
  const dispatch = useDispatch();
  const emploiDetail = useSelector(state => state.emploi.emploiDetail || {});

  const [emploiData, setEmploiData] = useState({
    title: '',
    description: '',
    user: '',
    file: null,
  });

  useEffect(() => {
    if (open && emploiId) {
      dispatch(getEmploi(emploiId));
    }
  }, [dispatch, open, emploiId]);

  useEffect(() => {
    if (open) {
      setEmploiData({
        title: emploiDetail.title || '',
        description: emploiDetail.description || '',
        user: emploiDetail.user || '',
        // Assurez-vous que le backend renvoie le bon format pour `user`
      });
    }
  }, [emploiDetail, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploiData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmploiData(prevState => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(emploiData).forEach(key => {
      if (key !== 'file') {
        formData.append(key, emploiData[key]);
      }
    });
    if (emploiData.file) {
      formData.append('file', emploiData.file);
    }

    dispatch(editEmploi(emploiId, formData))
      .then(() => {
        alert('Emploi mis à jour avec succès!');
        onClose();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'emploi:', error);
        alert('Erreur lors de la mise à jour de l\'emploi.');
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6">Editer l'Emploi</Typography>
        <TextField
          margin="dense"
          name="title"
          label="Titre"
          type="text"
          fullWidth
          value={emploiData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={emploiData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="user"
          label="User"
          type="text"
          fullWidth
          value={emploiData.user}
          onChange={handleChange}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "20px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit} color="primary">Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
}
