import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjets, deleteProjet } from '../../../../actions/projet.scol.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function ProjetsTable() {
  const dispatch = useDispatch();

  const projetsData = useSelector(state => state.projet.projets.data);

  // Vérifiez si projetsData est un tableau avant de tenter d'utiliser .map()
  const projets = Array.isArray(projetsData) ? projetsData : [];
;// Assurez-vous que le reducer est correctement configuré pour stocker les projets

  useEffect(() => {
    dispatch(getAllProjets());
  }, [dispatch]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Fichiers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {projets.map((projet, index) => (
  projet && ( // This check ensures that projet is not undefined
    <TableRow key={projet._id || index}> {/* Fallback to index if _id is undefined */}
      <TableCell>{projet.title}</TableCell>
      <TableCell>{projet.description}</TableCell>
      <TableCell>
      {projet.files && projet.files.map((file, fileIndex) => (
                  <div key={fileIndex}>
                    {/* Utilisez file.url pour ouvrir le fichier dans un nouvel onglet */}
                    <a href={file.url} target="_blank" rel="noopener noreferrer">Voir le fichier</a>
                  </div>
                ))}
</TableCell>
      <TableCell>
        <Button onClick={() => {}}>Consult</Button>
        <Button onClick={() => {}}>Edit</Button>
        <Button onClick={() => dispatch(deleteProjet(projet._id))}>Delete</Button>
      </TableCell>
    </TableRow>
  )
))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modals pour consulter ou éditer un projet peuvent être ajoutés ici */}
    </>
  );
}
