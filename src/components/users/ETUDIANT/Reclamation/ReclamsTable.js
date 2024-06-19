import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReclamationsByUser } from '../../../../actions/reclamation.actions';
import { deleteReclamation } from '../../../../actions/reclamation.actions';

import ReclamationDetailModal from './Consultreclam';
import EditReclamationModal from './Editreclam';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function ReclamationsTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReclamationId, setSelectedReclamationId] = useState(null);

  const state = useSelector(state => state);
  console.log("Redux State:", state);

  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { loading, error, reclamations } = useSelector(state => state.reclamation || {});

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getReclamationsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (error) return <p>Une erreur s'est produite : {error}</p>;

  const handleOpenDetailModal = (reclamationId) => {
    setSelectedReclamationId(reclamationId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedReclamationId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (reclamationId) => {
    setSelectedReclamationId(reclamationId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedReclamationId(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="tableau des Reclamations">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Matricule</TableCell>
              <TableCell>description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>reponse</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamations && reclamations.length > 0 ? (
              reclamations.map((reclamation) => (
                <TableRow key={reclamation._id}>
                  <TableCell>{format(new Date(reclamation.updatedAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{reclamation.nom}</TableCell>
                  <TableCell>{reclamation.prenom}</TableCell>
                  <TableCell>{reclamation.email}</TableCell>
                  <TableCell>{reclamation.matricule}</TableCell>
                  <TableCell>{reclamation.desription}</TableCell>
                  <TableCell>{reclamation.type}</TableCell>
                  <TableCell>{reclamation.reponse}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDetailModal(reclamation._id)}>Consulter</Button>
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(reclamation._id)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => dispatch(deleteReclamation(reclamation._id))}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">Aucune Reclamation à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ReclamationDetailModal open={showDetailModal} onClose={handleCloseDetailModal} reclamationId={selectedReclamationId} />
      <EditReclamationModal open={showEditModal} onClose={handleCloseEditModal} reclamationId={selectedReclamationId} /> 
    </>
  );

}
