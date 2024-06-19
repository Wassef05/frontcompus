import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImpressionProfsByUser, deleteImpressionProf } from '../../../../actions/impression.prof.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format } from 'date-fns';

export default function ImpressionProfsTable() {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { userImpressionProfs } = useSelector(state => state.impressionProf.userImpressionProfs);
     console.log('mok',userImpressionProfs)
    useEffect(() => {
        if (currentUser && currentUser.id) {
            dispatch(getImpressionProfsByUser(currentUser.id));
        }
    }, [dispatch, currentUser.id]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom du document</TableCell>
                        <TableCell>Responsable</TableCell>
                        <TableCell>Remarques</TableCell>
                        <TableCell>Nombre de copies</TableCell>
                        <TableCell>Date prévue</TableCell>
                        <TableCell>Fichiers</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userImpressionProfs && userImpressionProfs.map((impressionProf, index) => (
                        <TableRow key={impressionProf._id || index}>
                            <TableCell>{impressionProf.nom_document}</TableCell>
                            <TableCell>{impressionProf.responsable}</TableCell>
                            <TableCell>{impressionProf.remarques}</TableCell>
                            <TableCell>{impressionProf.nombreCopies}</TableCell>
                            <TableCell>
                                {impressionProf.schedule ? format(new Date(impressionProf.schedule), 'PP') : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {impressionProf.files && impressionProf.files.map((file, fileIndex) => (
                                    <div key={fileIndex}>
                                        <a href={file.url} target="_blank" rel="noopener noreferrer">Voir le fichier</a>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => {}}>Consulter</Button>
                                <Button onClick={() => {}}>Modifier</Button>
                                <Button onClick={() => dispatch(deleteImpressionProf(impressionProf._id))}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
