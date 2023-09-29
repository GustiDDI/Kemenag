import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  width: '100%',
  height: '390px',
  overflowX: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 600,
});

const KonsumsiList = ({ selectedName }) => {
  const [konsumsiData, setKonsumsiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/data/logistic/konsumsi');
      let data = response.data.data;

      // Filter data based on selectedName if available
      if (selectedName) {
        data = data.filter(item => item.kota_logistic === selectedName);
      }

      // Sort data by Jumlah (amount) in descending order
      data.sort((a, b) => b.jumlah_konsumsi - a.jumlah_konsumsi);

      setKonsumsiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedName]); // Re-fetch data when selectedName changes

  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Nama Konsumsi</TableCell>
            <TableCell>Jumlah</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {konsumsiData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.nama_konsumsi}</TableCell>
              <TableCell>{item.jumlah_konsumsi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
};

export default KonsumsiList;
