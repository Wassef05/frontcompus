import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRattrapage, editRattrapage } from '../../../../actions/rattrapage.actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function EditRattrapageModal({ open, onClose, rattrapageId }) {
  const [rattrapageData, setRattrapageData] = useState({
    matiere: '',
    description: '',
    reponse: '',
  });
  const dispatch = useDispatch();
  const rattrapageDetail = useSelector(state => state.rattrapage.rattrapageDetail || {});



  useEffect(() => {
    if (open) {
      dispatch(getRattrapage(rattrapageId));
    }
  }, [dispatch, open, rattrapageId]);

  useEffect(() => {
    if (rattrapageDetail) {
      setRattrapageData({
        matiere: rattrapageDetail.matiere ,
        description: rattrapageDetail.description ,
        reponse: rattrapageDetail.reponse,
      });
    }
  }, [rattrapageDetail]);

  const handleSave = () => {
    dispatch(editRattrapage(rattrapageId, rattrapageData));
    onClose();
  };

  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier le Rattrapage</DialogTitle>
      <DialogContent>
        <TextField
          label="Matière"
          fullWidth
          margin="normal"
          name="matiere"
          value={rattrapageData.matiere}
          onChange={(e) => setRattrapageData({
             ...rattrapageData,
              matiere: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          name="description"
          multiline
          rows={4}
          value={rattrapageData.description}
          onChange={(e) => setRattrapageData({
            ...rattrapageData,
             description: e.target.value })}        />
     
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Enregistrer
        </Button>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}
