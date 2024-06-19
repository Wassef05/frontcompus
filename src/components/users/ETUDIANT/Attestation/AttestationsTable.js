import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttestationsByUser } from '../../../../actions/attestation.actions';
import { deleteAttestation } from '../../../../actions/attestation.actions';

import AttestationDetailModal from './Consultattestation';
import EditAttestationModal from './Editattestation';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function AttestationsTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAttestationId, setSelectedAttestationId] = useState(null);

  const state = useSelector(state => state);
  console.log("Redux State:", state);

  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { loading, error, attestations } = useSelector(state => state.attestation || {});

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getAttestationsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (error) return <p>Une erreur s'est produite : {error}</p>;

  const handleOpenDetailModal = (attestationId) => {
    setSelectedAttestationId(attestationId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedAttestationId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (attestationId) => {
    setSelectedAttestationId(attestationId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedAttestationId(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="tableau des attestations">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Matricule</TableCell>
              <TableCell>Raison</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attestations && attestations.length > 0 ? (
              attestations.map((attestation) => (
                <TableRow key={attestation._id}>
                  <TableCell>{format(new Date(attestation.updatedAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{attestation.nom}</TableCell>
                  <TableCell>{attestation.prenom}</TableCell>
                  <TableCell>{attestation.email}</TableCell>
                  <TableCell>{attestation.matricule}</TableCell>
                  <TableCell>{attestation.raison}</TableCell>
                  <TableCell>{attestation.type}</TableCell>
                  <TableCell>{attestation.statut}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDetailModal(attestation._id)}>Consulter</Button>
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(attestation._id)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => dispatch(deleteAttestation(attestation._id))}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">Aucune attestation à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AttestationDetailModal open={showDetailModal} onClose={handleCloseDetailModal} attestationId={selectedAttestationId} />
      <EditAttestationModal open={showEditModal} onClose={handleCloseEditModal} attestationId={selectedAttestationId} />
    </>
  );

}
