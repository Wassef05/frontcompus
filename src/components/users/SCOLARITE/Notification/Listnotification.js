// import React from 'react';
// import NotificationsTable from './NotificationsTable';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// export default function NotificationsListModal({ open, onClose }) {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//       <DialogTitle>Liste des Notifications</DialogTitle>
//       <DialogContent>
//         <NotificationsTable />
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
import NotificationsTable from './NotificationsTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function NotificationsListModal({ open, onClose, role }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Liste des Notifications</DialogTitle>
      <DialogContent>
        {/* Passer le rôle à NotificationsTable pour filtrer les notifications */}
        <NotificationsTable role={role} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

