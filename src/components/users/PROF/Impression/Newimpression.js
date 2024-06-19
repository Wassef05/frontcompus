// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
// import { addImpressionProf } from '../../../../actions/impression.prof.actions';

// export default function ImpressionProfFormDialog({ open, onClose }) {
//   const dispatch = useDispatch();
  
//   const initialFormValues = {
//     nom_document: '',
//     responsable: '',
//     remarques: '',
//     nombreCopies: '',
//     schedule: '',
//     files: [],
//   };
//   const [formValues, setFormValues] = useState(initialFormValues);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files); // Convertir la FileList en un tableau
//     setFormValues({ ...formValues, files }); // Mettre à jour les fichiers dans le state
//   };

  
//     // Créer un FormData pour envoyer les fichiers
//     const handleSubmit = () => {
//         const formData = new FormData();
//         formData.append('nom_document', formValues.nom_document);
//         formData.append('responsable', formValues.responsable);
//         formData.append('remarques', formValues.remarques);
//         formData.append('nombreCopies', formValues.nombreCopies);
//         formData.append('schedule', formValues.schedule);
    
//     // Ajouter chaque fichier au FormData
//     formValues.files.forEach((file, index) => {
//       formData.append(`files`, file);
//     });

//     // Options de la requête axios
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     };

//     // Envoyer la requête avec le FormData contenant les fichiers
//     dispatch(addImpressionProf(formData, config)).then(() => {
//       alert('ImpressionProf ajoutée avec succès! ✅');
//       onClose();
//       setFormValues(initialFormValues);
//     }).catch((error) => {
//       console.error('Erreur lors de l\'ajout de la dmd impression:', error);
//       alert('Erreur lors de l\'ajout de la dmd impression ❌');
//     });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogContent>
//         <Typography variant="h6" gutterBottom>Ajouter une ImpressionProf</Typography>
//         <TextField autoFocus margin="dense" name="nom_document" label="Nom du document" type="text" fullWidth value={formValues.nom_document} onChange={handleChange} />
//         <TextField margin="dense" name="responsable" label="Responsable" type="text" fullWidth value={formValues.responsable} onChange={handleChange} />
//         <TextField margin="dense" name="remarques" label="Remarques" type="text" fullWidth multiline maxRows={4} value={formValues.remarques} onChange={handleChange} />
//         <TextField margin="dense" name="nombreCopies" label="Nombre de copies" type="text" fullWidth value={formValues.nombreCopies} onChange={handleChange} />
//         <TextField
//           margin="dense"
//           name="schedule"
//           label="Date prévue"
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={formValues.schedule}
//           onChange={handleChange}
//         />
//         <input type="file" multiple onChange={handleFileChange} />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">Annuler</Button>
//         <Button onClick={handleSubmit} color="primary">Ajouter</Button>
//       </DialogActions>
//     </Dialog>
//   );
//   }


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importer useSelector pour accéder au state Redux
import { Dialog, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { addImpressionProf } from '../../../../actions/impression.prof.actions';

export default function ImpressionProfFormDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const initialFormValues = {
    nom_document: '',
    responsable: '',
    remarques: '',
    nombreCopies: '',
    schedule: '',
    files: [],
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues({ ...formValues, files });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('nom_document', formValues.nom_document);
    formData.append('responsable', formValues.responsable);
    formData.append('remarques', formValues.remarques);
    formData.append('nombreCopies', formValues.nombreCopies);
    formData.append('schedule', formValues.schedule);

    formValues.files.forEach((file) => {
      formData.append('files', file);
    });

    dispatch(addImpressionProf(formData, currentUser)).then(() => {
      alert('ImpressionProf ajoutée avec succès! ✅');
      onClose();
      setFormValues(initialFormValues);
    }).catch((error) => {
      console.error('Erreur lors de l\'ajout de la dmd impression:', error);
      alert('Erreur lors de l\'ajout de la dmd impression ❌');
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
     <DialogContent>
   <Typography variant="h6" gutterBottom>Ajouter une ImpressionProf</Typography>
   <TextField autoFocus margin="dense" name="nom_document" label="Nom du document" type="text" fullWidth value={formValues.nom_document} onChange={handleChange} />
   <TextField margin="dense" name="responsable" label="Responsable" type="text" fullWidth value={formValues.responsable} onChange={handleChange} />
   <TextField margin="dense" name="remarques" label="Remarques" type="text" fullWidth multiline maxRows={4} value={formValues.remarques} onChange={handleChange} />
   <TextField margin="dense" name="nombreCopies" label="Nombre de copies" type="text" fullWidth value={formValues.nombreCopies} onChange={handleChange} />
   <TextField
     margin="dense"
     name="schedule"
     label="Date prévue"
     type="date"
     fullWidth
     InputLabelProps={{ shrink: true }}
     value={formValues.schedule}
     onChange={handleChange}
   />
   <input type="file" multiple onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit} color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}

