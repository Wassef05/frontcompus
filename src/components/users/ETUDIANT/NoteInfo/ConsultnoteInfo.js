import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNoteInfoById } from '../../../../actions/noteInfo.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function NoteInfoDetailModal({ open, onClose, noteInfoId }) {
  const dispatch = useDispatch();

  // Vérifiez le chemin d'accès correct dans le state Redux
  const noteInfoDetail = useSelector(state => state.noteInfo.noteInfoDetail || {});

  useEffect(() => {
    console.log("NoteDetailModal - useEffect - open:", open, "noteInfoId:", noteInfoId);
    if (open) {
      dispatch(fetchNoteInfoById(noteInfoId));
    }
  }, [dispatch, open, noteInfoId]);

  console.log("NoteDetailModal - noteInfoDetail:", noteInfoDetail);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Note Détails</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Titre: {noteInfoDetail.type}</Typography>
        <Typography variant="body1">Contenu: {noteInfoDetail.content}</Typography>

        {noteInfoDetail.relatedRecordId && (
          <>
            <Typography variant="h6">Détails Associés:</Typography>
           
            <Typography variant="body1">Title: {noteInfoDetail.relatedRecordId.title}</Typography>
            <Typography variant="body1">Description: {noteInfoDetail.relatedRecordId.description}</Typography>
            <Typography variant="body1">Responsable: {noteInfoDetail.relatedRecordId.responsable}</Typography>
            <Typography variant="body1">Type: {noteInfoDetail.relatedRecordId.type}</Typography>
         
        
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}