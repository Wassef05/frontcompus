import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRattrapage } from '../../../../actions/rattrapage.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ConsultRattrapModal({ open, onClose, rattrapageId }) {
  const dispatch = useDispatch();
  const rattrapageDetail = useSelector(state => state.rattrapage.rattrapageDetail || {});

  useEffect(() => {
    console.log("RattrapagenDetailModal - useEffect - open:", open, "rattrapageId:", rattrapageId);

    if (open) {
      dispatch(getRattrapage(rattrapageId));
    }
  }, [dispatch, open, rattrapageId]);
  console.log("RattrapageDetailModal - rattrapageDetail:", rattrapageDetail);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détails du Rattrapage</DialogTitle>
      <DialogContent>
        <Typography variant="h6">matiere: {rattrapageDetail.matiere}</Typography>
        <Typography variant="body1">description: {rattrapageDetail.description}</Typography>
        <Typography variant="body1">Reponse: {rattrapageDetail.reponse}</Typography>
        {/* Vous pouvez ajouter d'autres détails ici */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
