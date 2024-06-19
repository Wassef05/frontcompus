import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCertifs, deleteCertif } from '../../../../actions/certif.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import CertifDetailModal from './Consultcertif';
import EditCertifModal from './Editcertif';

export default function CertifsTable() {
  const dispatch = useDispatch();
  const { certifs } = useSelector(state => state.certif);
  const [selectedCertifId, setSelectedCertifId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCertifs());
  }, [dispatch]);

  const openDetailModal = (id) => {
    setSelectedCertifId(id);
    setDetailModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedCertifId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Horaire</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certifs.map((certif) => (
              <TableRow key={certif._id}>
                <TableCell>{certif.title}</TableCell>
                <TableCell>{certif.type}</TableCell>
                <TableCell>{certif.responsable}</TableCell>
                <TableCell>{certif.description}</TableCell>
                <TableCell>{certif.schedule}</TableCell>
                <TableCell>{certif.location}</TableCell>
                <TableCell>
                  <Button onClick={() => openDetailModal(certif._id)}>Consult</Button>
                  <Button onClick={() => openEditModal(certif._id)}>Edit</Button>
                  <Button onClick={() => dispatch(deleteCertif(certif._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CertifDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} certifId={selectedCertifId} />
      <EditCertifModal open={editModalOpen} onClose={() => setEditModalOpen(false)} certifId={selectedCertifId} />
    </>
  );
}
