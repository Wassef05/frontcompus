import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addCours } from '../../../../actions/cours.actions';

export default function CoursFormDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const initialFormValues = {
        title: '',
        description: '',
        file: null
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            setFormValues({
                ...formValues,
                file: file
            });
        }
    };

    const handleSubmit = () => {
        if (!formValues.title || !formValues.description) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        if (formValues.file) {
            formData.append('file', formValues.file);
        }
        formData.append('user', currentUser.id);

        dispatch(addCours(formData, currentUser.id))
            .then(() => {
                alert('Cours ajouté avec succès! ✅');
                onClose();
                setFormValues(initialFormValues);
                setSelectedFileName('');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du cours:', error);
                alert('Erreur lors de l\'ajout du cours ❌');
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Ajouter un cours
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Titre"
                    type="text"
                    fullWidth
                    value={formValues.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={formValues.description}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{ marginTop: 20 }}
                >
                    Télécharger le fichier
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                </Button>
                {selectedFileName && (
                    <Typography variant="body2" style={{ marginTop: 10 }}>
                        Fichier sélectionné : {selectedFileName}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    );
}
