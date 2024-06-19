// src/components/users/PROF/cours/Editcours.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { editCours } from '../../../../actions/cours.actions';

const EditCoursFormDialog = ({ open, onClose, courseId }) => {
  const [cours, setCours] = useState({
    title: '',
    description: ''
  });
const dispatch = useDispatch();
  useEffect(() => {
    if (courseId) {
      axios.get(`http://localhost:8080/cours/${courseId}`)
        .then(response => {
          setCours({
            title: response.data.title,
            description: response.data.description
          });
        })
        .catch(error => {
          console.error('There was an error fetching the course data!', error);
        });
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCours(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/cours/update/${courseId}`, cours)
      .then(response => {
        console.log('Course updated successfully:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('There was an error updating the course!', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={cours.title}
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
          value={cours.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCoursFormDialog;
