import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNoteInfos } from "../../../../actions/noteInfo.actions";
import NoteInfoDetailModal from './ConsultnoteInfo';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function NoteinfosTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNoteInfoId, setSelectedNoteInfoId] = useState(null);

  useEffect(() => {
    dispatch(fetchNoteInfos());
  }, [dispatch]);

  const notes = useSelector(state => state.noteInfo.noteInfos || []);

  const handleOpenDetailModal = (noteInfoId) => {
    setSelectedNoteInfoId(noteInfoId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedNoteInfoId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (noteInfoId) => {
    setSelectedNoteInfoId(noteInfoId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedNoteInfoId(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="tableau des notes">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Contenu</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <TableRow key={note._id}>
                <TableCell>{format(new Date(note.creationDate), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{note.type}</TableCell>
                <TableCell>
                  title: {note.relatedRecordId.title}<br/>
                  description: {note.relatedRecordId.description}<br/>
                  responsable: {note.relatedRecordId.responsable}<br/>
                  type: {note.relatedRecordId.type}

                
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleOpenDetailModal(note._id)}>Consulter</Button>
                  <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(note._id)}>Modifier</Button>
                </TableCell>
              </TableRow>
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">Aucune note à afficher</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <NoteInfoDetailModal open={showDetailModal} onClose={handleCloseDetailModal} noteInfoId={selectedNoteInfoId} />
    </>
  );
}
