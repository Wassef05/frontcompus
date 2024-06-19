import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClasses, deleteClasse } from '../../actions/classe.actions'; // Ajustez le chemin selon votre structure
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ConsultClasse from './Consultclasse'; // Composant pour consulter les détails d'une classe
import EditClasse from './Editclasse'; // Composant pour éditer une classe

export default function ClassesTable() {
  const dispatch = useDispatch();
  const classes = useSelector(state => state.classe.classes); // Assurez-vous que cela correspond à votre structure de state
  const [selectedClasseId, setSelectedClasseId] = useState(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  const openConsultModal = (id) => {
    setSelectedClasseId(id);
    setConsultModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedClasseId(id);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteClasse(id));
    // Optionnel : Ajouter un callback pour recharger la liste après suppression
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la Classe</TableCell>
              <TableCell>Niveau</TableCell>
              <TableCell>Année Scolaire</TableCell>
              <TableCell>Professeur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classe) => (
              <TableRow key={classe._id}>
                <TableCell>{classe.nomClasse}</TableCell>
                <TableCell>{classe.niveau}</TableCell>
                <TableCell>{classe.anneeScolaire}</TableCell>
                <TableCell>{classe.professeur}</TableCell> {/* Ajustez en fonction de votre structure */}
                <TableCell>
                  <Button onClick={() => openConsultModal(classe._id)}>Consulter</Button>
                  <Button onClick={() => openEditModal(classe._id)}>Éditer</Button>
                  <Button onClick={() => handleDelete(classe._id)}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedClasseId && <ConsultClasse open={consultModalOpen} onClose={() => setConsultModalOpen(false)} classeId={selectedClasseId} />}
      {selectedClasseId && <EditClasse open={editModalOpen} onClose={() => setEditModalOpen(false)} classeId={selectedClasseId} />}
    </>
  );
}
