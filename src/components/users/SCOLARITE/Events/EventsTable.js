import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, deleteEvent } from '../../../../actions/event.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import EventDetailModal from './Consultevent';
import EditEventModal from './Editevent';

export default function EventsTable() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const openDetailModal = (id) => {
    setSelectedEventId(id);
    setDetailModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedEventId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
            
              <TableCell>Description</TableCell>
              <TableCell>Horaire</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.type}</TableCell>
               
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.schedule}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Button onClick={() => openDetailModal(event._id)}>Consult</Button>
                  <Button onClick={() => openEditModal(event._id)}>Edit</Button>
                  <Button onClick={() => dispatch(deleteEvent(event._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EventDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} eventId={selectedEventId} />
      <EditEventModal open={editModalOpen} onClose={() => setEditModalOpen(false)} eventId={selectedEventId} />
    </>
  );
}
