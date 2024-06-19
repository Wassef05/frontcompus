import React, { useState } from 'react';
import { Button } from '@mui/material';
import ListeCours from './ListeCours';
import NewCours from './NewCours';
import EditCours from './EditCours';

const CoursTable = () => {
  const [selectedCours, setSelectedCours] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const handleEdit = (cours) => {
    console.log('handleEdit called with:', cours);
    setSelectedCours(cours);
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    setSelectedCours(null);
    setIsEditMode(false);
  };

  const handleOpenList = () => {
    console.log('handleOpenList called');
    setIsListOpen(true);
  };

  const handleCloseList = () => {
    console.log('handleCloseList called');
    setIsListOpen(false);
  };

  const handleOpenNew = () => {
    console.log('handleOpenNew called');
    setIsNewOpen(true);
  };

  const handleCloseNew = () => {
    console.log('handleCloseNew called');
    setIsNewOpen(false);
  };

  console.log('CoursTable render, handleEdit:', handleEdit);

  return (
    <div>
      <Button onClick={handleOpenList}>Liste des Cours</Button>
      <Button onClick={handleOpenNew}>Ajouter un Cours</Button>
      <ListeCours open={isListOpen} onClose={handleCloseList} onEdit={handleEdit} />
      <NewCours open={isNewOpen} onClose={handleCloseNew} />
      {selectedCours && (
        <EditCours open={isEditMode} onClose={handleCloseEdit} coursId={selectedCours._id} />
      )}
    </div>
  );
};

export default CoursTable;
