import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrices, deletePrice } from '../../../../actions/pricing.actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PriceDetailModal from './Consultprice';
import EditPriceModal from './Editprice';

export default function PricesTable() {
  const dispatch = useDispatch();
  const { prices } = useSelector(state => state.price);
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllPrices());
  }, [dispatch]);

  const openDetailModal = (id) => {
    setSelectedPriceId(id);
    setDetailModalOpen(true);
  };

  const openEditModal = (id) => {
    setSelectedPriceId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
            
              <TableCell>Description</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((price) => (
              <TableRow key={price._id}>
                <TableCell>{price.title}</TableCell>
                <TableCell>{price.price}</TableCell>
               
                <TableCell>{price.description}</TableCell>
                
                <TableCell>
                  <Button onClick={() => openDetailModal(price._id)}>Consult</Button>
                  <Button onClick={() => openEditModal(price._id)}>Edit</Button>
                  <Button onClick={() => dispatch(deletePrice(price._id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PriceDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} priceId={selectedPriceId} />
      <EditPriceModal open={editModalOpen} onClose={() => setEditModalOpen(false)} priceId={selectedPriceId} />
    </>
  );
}
