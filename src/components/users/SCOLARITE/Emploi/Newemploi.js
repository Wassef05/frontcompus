import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { addEmploi } from "../../../../actions/emploi.actions";

export default function EmploiFormDialog({ open, onClose }) {
  const dispatch = useDispatch();

  const initialFormValues = {
    title: "",
    description: "",
    user:"",
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Gestion du fichier sélectionné
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("user", formValues.user);
    if (file) {
      formData.append("file", file);
    }

    dispatch(addEmploi(formData))
      .then(() => {
        alert("Emploi ajouté avec succès! ✅");
        setFormValues(initialFormValues); // Réinitialisation des champs du formulaire
        setFile(null); // Réinitialisation du fichier
        onClose(); // Fermeture du modal après le succès de l'opération
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'emploi:", error);
        alert("Erreur lors de l'ajout de l'emploi ❌");
        // Ici, vous pouvez utiliser un système de notification plus sophistiqué
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Ajouter un emploi
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
          name='user'
          label="Prof"
          type="text"
          fullWidth
          multiline
          maxRows={4}
          value={formValues.user}
          onChange={handleChange}
        />


        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          maxRows={4}
          value={formValues.description}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/png, image/jpeg, application/pdf"
          onChange={handleFileChange}
          style={{ marginTop: "20px" }}
        />
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
