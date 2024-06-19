import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCours, deleteCours, getSignedUrl } from '../../../../actions/cours.actions';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Listcours = ({ open, onClose, onEdit, onConsult }) => {
  const dispatch = useDispatch();
  const coursList = useSelector((state) => state.cours.cours);
  const [localCoursList, setLocalCoursList] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(getAllCours());
    }
  }, [dispatch, open]);

  useEffect(() => {
    setLocalCoursList(coursList);
  }, [coursList]);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await dispatch(deleteCours(id));
      alert('Cours supprimé avec succès! ✅');

      setLocalCoursList(localCoursList.filter(cours => cours._id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Erreur lors de la suppression du cours ❌');

    } finally {
      setDeleting(false);
    }
  };

  const handleGetSignedUrl = async (publicId) => {
    try {
      const url = await dispatch(getSignedUrl(publicId));
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error generating signed URL:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Cours</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Fichier Cours</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localCoursList.map((cours) => (
                <TableRow key={cours._id}>
                  <TableCell>{cours.title}</TableCell>
                  <TableCell>{cours.description}</TableCell>
                  <TableCell>
                    {cours.file && cours.file.public_id ? (
                      cours.file.public_id.trim() === "1" ? (
                        <a href={`http://localhost:8080/${cours.file.url}`} target="_blank" rel="noopener noreferrer">
                          Voir le fichier
                        </a>
                      ) : (
                        <IconButton
                          onClick={() => handleGetSignedUrl(cours.file.public_id)}
                          aria-label="view file"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )
                    ) : (
                      'Aucun fichier'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onEdit(cours)}>Modifier</Button>
                    <Button onClick={() => onConsult(cours)}>Consulter</Button>
                    <Button onClick={() => handleDelete(cours._id)} disabled={deleting}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Listcours;
