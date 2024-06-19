import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnonces, deleteAnnonce } from '../../../../actions/annonce.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AnnonceDetailModal from './Consultannonce';
import EditAnnonceModal from './Editannonce';

export default function AnnoncesTable() {
  const dispatch = useDispatch();
  const { annonces } = useSelector(state => state.annonce);
  const [selectedAnnonceId, setSelectedAnnonceId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllAnnonces());
  }, [dispatch]);

  const openDetailModal = (id) => {
    setSelectedAnnonceId(id);
    setDetailModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedAnnonceId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
             
              <TableCell>Responsable</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Horaire</TableCell>
          
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {annonces.map((annonce) => (
              <TableRow key={annonce._id}>
                <TableCell>{annonce.title}</TableCell>
                
                <TableCell>{annonce.responsable}</TableCell>
                <TableCell>{annonce.description}</TableCell>
                <TableCell>{annonce.schedule}</TableCell>
             
                <TableCell>
                  <Button onClick={() => openDetailModal(annonce._id)}>Consult</Button>
                  <Button onClick={() => openEditModal(annonce._id)}>Edit</Button>
                  <Button onClick={() => dispatch(deleteAnnonce(annonce._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AnnonceDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} annonceId={selectedAnnonceId} />
      <EditAnnonceModal open={editModalOpen} onClose={() => setEditModalOpen(false)} annonceId={selectedAnnonceId} />
    </>
  );
}
