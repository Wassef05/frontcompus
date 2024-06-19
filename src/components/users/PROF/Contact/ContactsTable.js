import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactProfsByUser, deleteContactProf } from '../../../../actions/contact.prof.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function ContactProfsTable() {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  console.log("Redux State:", state);
  const { user: currentUser } = useSelector((state) => state.auth || {});
  // Use useSelector to get contactProfs from state, ensuring it's an array before mapping over it in the render.
  const contactProfs = useSelector(state => state.contactProf.contactProfs);

 
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getContactProfsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Objet</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactProfs.map((contactPorf, index) => (
            contactPorf && (
              <TableRow key={contactPorf._id || index}>
                <TableCell>{contactPorf.objet}</TableCell>
                <TableCell>{contactPorf.message}</TableCell>
                <TableCell>
                  <Button onClick={() => {}}>Consult</Button>
                  <Button onClick={() => {}}>Edit</Button>
                  <Button onClick={() => dispatch(deleteContactProf(contactPorf._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
