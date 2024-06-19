import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterielProfsByUser, deleteMaterielProf } from '../../../../actions/materiel.prof.actions';

// Import or define MaterielProfDetailModal and EditMaterielProfModal

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns'; // Assuming you use date-fns for formatting dates

export default function MaterielProfsTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaterielProfId, setSelectedMaterielProfId] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { loading, error, materielProfs } = useSelector(state => state.materielProf || {});

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getMaterielProfsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (error) return <p>Une erreur s'est produite : {error}</p>;

  const handleOpenDetailModal = (materielProfId) => {
    setSelectedMaterielProfId(materielProfId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedMaterielProfId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (materielProfId) => {
    setSelectedMaterielProfId(materielProfId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedMaterielProfId(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="tableau des demandes de materiel">
          <TableHead>
            <TableRow>
              <TableCell>Materiel</TableCell>
              <TableCell>Remarque</TableCell>
              <TableCell>Date prévue</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materielProfs && materielProfs.length > 0 ? (
              materielProfs.map((materielProf) => (
                <TableRow key={materielProf._id}>
                  <TableCell>{materielProf.materiel}</TableCell>
                  <TableCell>{materielProf.remarque}</TableCell>
                  <TableCell>{format(new Date(materielProf.schedule), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{materielProf.location}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDetailModal(materielProf._id)}>Consulter</Button>
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(materielProf._id)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => dispatch(deleteMaterielProf(materielProf._id))}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">Aucune demande de materiel à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Implement or replace with MaterielProfDetailModal and EditMaterielProfModal as needed */}
    </>
  );
}
