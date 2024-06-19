// import React from 'react';
// import RattrapagesTable from './RattrapagesTable'; // Assurez-vous de créer ce composant pour afficher les rattrapages
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// export default function RattrapagesListModal({ open, onClose }) {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Liste des Rattrapages</DialogTitle>
//       <DialogContent>
//         <RattrapagesTable onClose={onClose} />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Fermer
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React from 'react';
import RattrapagesTable from './RattrapsTable'; // Assurez-vous que le chemin d'accès est correct
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function RattrapagesListModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Liste des Rattrapages</DialogTitle>
      <DialogContent>
        <RattrapagesTable onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

