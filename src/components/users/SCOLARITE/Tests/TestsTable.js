import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTests, deleteTest } from '../../../../actions/test.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function TestsTable() {
  const dispatch = useDispatch();

  const testsData = useSelector(state => state.test.tests.data);

  // Vérifiez si testsData est un tableau avant de tenter d'utiliser .map()
  const tests = Array.isArray(testsData) ? testsData : [];
;// Assurez-vous que le reducer est correctement configuré pour stocker les tests

  useEffect(() => {
    dispatch(getAllTests());
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
          {tests.map((test, index) => (
  test && ( // This check ensures that test is not undefined
    <TableRow key={test._id || index}> {/* Fallback to index if _id is undefined */}
      <TableCell>{test.title}</TableCell>
      <TableCell>{test.description}</TableCell>
      <TableCell>
      {test.files && test.files.map((file, fileIndex) => (
                  <div key={fileIndex}>
                    {/* Utilisez file.url pour ouvrir le fichier dans un nouvel onglet */}
                    <a href={file.url} target="_blank" rel="noopener noreferrer">Voir le fichier</a>
                  </div>
                ))}
</TableCell>
      <TableCell>
        <Button onClick={() => {}}>Consult</Button>
        <Button onClick={() => {}}>Edit</Button>
        <Button onClick={() => dispatch(deleteTest(test._id))}>Delete</Button>
      </TableCell>
    </TableRow>
  )
))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modals pour consulter ou éditer un test peuvent être ajoutés ici */}
    </>
  );
}
