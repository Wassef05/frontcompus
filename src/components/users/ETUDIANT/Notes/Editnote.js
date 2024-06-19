import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, getNote } from '../../../../actions/note.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditNoteModal({ open, onClose, noteId }) {
  const [noteData, setNoteData] = useState({ title: '', content: '' });
  const dispatch = useDispatch();
  const noteDetail = useSelector(state => state.note.noteDetail || {});

  useEffect(() => {
    if (open) {
      dispatch(getNote(noteId));
    }
  }, [dispatch, open, noteId]);

  useEffect(() => {
    if (noteDetail) {
      setNoteData({ title: noteDetail.title, content: noteDetail.content });
    }
  }, [noteDetail]);

  const handleSave = () => {
    dispatch(editNote(noteId, noteData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier la Note</DialogTitle>
      <DialogContent>
        <TextField
          label="Titre"
          fullWidth
          margin="normal"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        />
        <TextField
          label="Contenu"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Enregistrer
        </Button>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}
