import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmplois, deleteEmploi } from '../../../../actions/emploi.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EmploiDetailModal from './Consultemploi';
import EditEmploiModal from './Editemploi';

export default function EmploisTable() {
  const dispatch = useDispatch();
  const { emplois } = useSelector(state => state.emploi);
  const [selectedEmploiId, setSelectedEmploiId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllEmplois());
  }, [dispatch]);

  useEffect(() => {
    // Lorsque les emplois sont mis à jour dans le store Redux
    console.log(emplois);
  }, [emplois]);

  const openDetailModal = (id) => {
    setSelectedEmploiId(id);
    setDetailModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedEmploiId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>User</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emplois.map((emploi) => (
              <TableRow key={emploi._id}>
                <TableCell>{emploi.title}</TableCell>
                <TableCell>{emploi.description}</TableCell>
                {/* Assurez-vous que emploi.user est un objet et qu'il a une propriété username */}
                <TableCell>{emploi.user && emploi.user.username}</TableCell>
                
                {/* Utilisez un lien pour le fichier si c'est un document PDF ou autre non-image */}
                <TableCell>
  {emploi.file && (
  <a href={`http://localhost:8080/uploads/${emploi.file}`} target="_blank" rel="noopener noreferrer">
    Voir le fichier
  </a>
)}
</TableCell>


                <TableCell>
                  <Button onClick={() => openDetailModal(emploi._id)}>Consult</Button>
                  <Button onClick={() => openEditModal(emploi._id)}>Edit</Button>
                  <Button onClick={() => dispatch(deleteEmploi(emploi._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedEmploiId && <EmploiDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} emploiId={selectedEmploiId} />}
      {selectedEmploiId && <EditEmploiModal open={editModalOpen} onClose={() => setEditModalOpen(false)} emploiId={selectedEmploiId} />}
    </>
  );
}
