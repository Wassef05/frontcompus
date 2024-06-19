import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasseById, updateClasse } from '../../actions/classe.actions'; // Ajustez le chemin selon votre structure
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

export default function EditClasse({ open, onClose, classeId }) {
    const dispatch = useDispatch();
    const classeDetail = useSelector(state => state.classe.classeDetail); // Assurez-vous que cela correspond à votre structure de state
    const [formData, setFormData] = useState({
        nomClasse: '',
        niveau: '',
        anneeScolaire: '',
        professeur: '' // Supposons que cela soit l'ID du professeur
    });

    useEffect(() => {
        if (classeId) {
            dispatch(getClasseById(classeId));
        }
    }, [classeId, dispatch]);

    useEffect(() => {
        if (classeDetail && open) {
            setFormData({
                nomClasse: classeDetail.nomClasse,
                niveau: classeDetail.niveau,
                anneeScolaire: classeDetail.anneeScolaire,
                professeur: classeDetail.professeur // Assurez-vous d'ajuster en fonction de votre structure de données
            });
        }
    }, [classeDetail, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        dispatch(updateClasse(classeId, formData));
        onClose(); // Fermer le dialogue après soumission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Éditer la Classe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nomClasse"
                    label="Nom de la Classe"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.nomClasse}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="niveau"
                    label="Niveau"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.niveau}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="anneeScolaire"
                    label="Année Scolaire"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.anneeScolaire}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="professeur"
                    label="Professeur"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.professeur}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSubmit}>Mettre à jour</Button>
            </DialogActions>
        </Dialog>
    );
}
