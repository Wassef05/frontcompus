import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClasse } from '../../actions/classe.actions'; // Ajustez le chemin selon votre structure
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

export default function NewClasse({ open, onClose }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nomClasse: '',
        niveau: '',
        anneeScolaire: '',
        professeur: '' // Ici vous pouvez initialiser avec l'ID d'un professeur si nécessaire
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Ici, dispatchez l'action de création d'une nouvelle classe
        dispatch(createClasse(formData));
        onClose(); // Fermer le dialogue après soumission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Créer une Nouvelle Classe</DialogTitle>
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
                <Button onClick={handleSubmit}>Créer</Button>
            </DialogActions>
        </Dialog>
    );
}
