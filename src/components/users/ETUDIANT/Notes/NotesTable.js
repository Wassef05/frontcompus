import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getNotesByUser } from '../../../../actions/note.actions';
import { deleteNote } from '../../../../actions/note.actions';
import NoteDetailModal from './Consultnote';
import EditNoteModal from './Editnote';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function NotesTable({ onClose }) {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const state = useSelector(state => state);
  console.log("Redux State:", state);

  const { user: currentUser } = useSelector((state) => state.auth || {});
  const { loading, error } = useSelector(state => state.note || {});
  const notes = useSelector(state => state.note.notes || []);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch( getNotesByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);
  console.log("Current notes:", notes);
  

  // if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Une erreur s'est produite : {error}</p>;

  const handleOpenDetailModal = (noteId) => {
    setSelectedNoteId(noteId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedNoteId(null);
    setShowDetailModal(false);
  };

  const handleOpenEditModal = (noteId) => {
    setSelectedNoteId(noteId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedNoteId(null);
    setShowEditModal(false);
  };
  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="tableau des notes">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Titre</TableCell>
            <TableCell>Contenu</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <TableRow key={note._id}>
                <TableCell>{format(new Date(note.createdAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.content}</TableCell>
                <TableCell>
                <Button variant="contained" onClick={() => handleOpenDetailModal(note._id)}>Consulter</Button>
                <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(note._id)}>Modifier</Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch(deleteNote(note._id))}>Supprimer</Button>
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
     <NoteDetailModal open={showDetailModal} onClose={handleCloseDetailModal} noteId={selectedNoteId} />
     <EditNoteModal open={showEditModal} onClose={handleCloseEditModal} noteId={selectedNoteId} />
     </>
  );
}
