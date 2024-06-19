import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRattrapagesByUser, deleteRattrapage } from '../../../../actions/rattrapage.actions';

import RattrapageDetailModal from './Consultrattrap'; 
import EditRattrapageModal from './Editrattrap'; 

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function RattrapsTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRattrapageId, setSelectedRattrapageId] = useState(null);

  const state = useSelector(state => state);
  console.log("Redux State:", state);

  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { loading, error, rattrapages } = useSelector(state => state.rattrapage || {});

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getRattrapagesByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (error) return <p>Une erreur s'est produite : {error}</p>;


  const handleOpenDetailModal = (rattrapageId) => {
    setSelectedRattrapageId(rattrapageId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedRattrapageId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (rattrapageId) => {
    setSelectedRattrapageId(rattrapageId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedRattrapageId(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="tableau des rattrapages">
          <TableHead>
            <TableRow>
              <TableCell>date</TableCell>
              <TableCell>matiere</TableCell>
              <TableCell>description</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rattrapages && rattrapages.length > 0 ? (
              rattrapages.map((rattrapage) => (
                <TableRow key={rattrapage._id}>
                 <TableCell>{format(new Date(rattrapage.updatedAt), 'dd/MM/yyyy HH:mm')}</TableCell>

                  <TableCell>{rattrapage.matiere}</TableCell>
                  <TableCell>{rattrapage.description}</TableCell>
                  <TableCell>{rattrapage.reponse}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDetailModal(rattrapage._id)}>Consulter</Button>
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(rattrapage._id)}>Modifier</Button>
                    <Button variant="contained" color="secondary" onClick={() => dispatch(deleteRattrapage(rattrapage._id))}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">Aucun rattrapage à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <RattrapageDetailModal open={showDetailModal} onClose={handleCloseDetailModal} rattrapageId={selectedRattrapageId} />
      <EditRattrapageModal open={showEditModal} onClose={handleCloseEditModal} rattrapageId={selectedRattrapageId} />
    </>
  );
}
