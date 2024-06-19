
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch ,useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Input } from '@mui/material';
import { addCours } from '../../../../actions/cours.actions';

const NewCours = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Extraction de l'utilisateur depuis le store Redux

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    console.log('User:', user);
    formData.append('user', user.id); // Ajout de l'ID utilisateur si nécessaire
    if (file) {
      formData.append('file', file);
    }
    if (image) {
      formData.append('image', image);
    }
  
    // Log the formData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      await dispatch(addCours(formData));
           alert('Cours ajouté avec succès! ✅');

      onClose();
      reset();
    
    } catch (error) {
      console.error('Error creating cours:', error);
     alert("Erreur lors de l'ajout du cours ❌");

    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Cours</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Cours Title"
            fullWidth
            margin="normal"
            {...register('title', { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register('description', { required: true })}
          />
          <Input
            type="file"
            fullWidth
            margin="normal"
            inputProps={{ accept: 'application/pdf,video/*' }}
            onChange={onFileChange}
          />
           <Input
            type="file"
            fullWidth
            margin="normal"
            inputProps={{ accept: 'application/image' }}
            onChange={onImageChange}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCours;

