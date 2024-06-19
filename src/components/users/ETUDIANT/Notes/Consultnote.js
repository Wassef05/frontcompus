import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNote } from '../../../../actions/note.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function NoteDetailModal({ open, onClose, noteId }) {
  const dispatch = useDispatch();

  // Vérifiez le chemin d'accès correct dans le state Redux
  const noteDetail = useSelector(state => state.note.noteDetail || {});

  useEffect(() => {
    console.log("NoteDetailModal - useEffect - open:", open, "noteId:", noteId);
    if (open) {
      dispatch(getNote(noteId));
    }
  }, [dispatch, open, noteId]);

  console.log("NoteDetailModal - noteDetail:", noteDetail);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Note Détails</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {noteDetail.title}</Typography>
        <Typography variant="body1">Contenu: {noteDetail.content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}