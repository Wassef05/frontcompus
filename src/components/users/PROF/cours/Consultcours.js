import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import axios from 'axios';

const ConsultCoursModal = ({ open, onClose, courseId }) => {
  console.log(courseId)

  const [cours, setCours] = useState({
    title: '',
    description: '',
    fileUrl: '',

  });

  useEffect(() => {
    if (courseId) {
      axios.get(`http://localhost:8080/cours/${courseId}`)
        .then(response => {
          setCours({
            title: response.data.title,
            description: response.data.description,
            fileUrl: response.data.fileUrl,

          });
        })
        .catch(error => {
          console.error('There was an error fetching the course data!', error);
        });
    }
  }, [courseId]);
  console.log ("cours" ,cours.title);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Consultation du Cours</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre du cours: {cours.title}</Typography>
        <Typography variant="body1">Description du cours: {cours.description}</Typography>
        {cours.fileUrl && (
          <div>
            <Typography variant="body2">Fichier associé:</Typography>
            <a href={cours.fileUrl} target="_blank" rel="noopener noreferrer">
              Télécharger le fichier
            </a>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsultCoursModal;
