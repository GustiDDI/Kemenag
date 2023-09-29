import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  width: '100%',
  height:'390px',
  overflowX: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 600,
});

const ListHospitalMekkah = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data/rumahsakit');
        const filteredData = response.data.data.filter(item => item.kota_rumahsakit === 'Mekkah');
        // Sort data by Available Room in descending order
        const sortedData = filteredData.sort((a, b) => b.available_room - a.available_room);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCellStyle = (availableRoom) => {
    return {
      backgroundColor: availableRoom > 10 ? 'green' : 'red',
      color: 'white', // Set text color to white for better visibility
    };
  };

  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Nama Rumah Sakit</TableCell>
            <TableCell>Max Room</TableCell>
            <TableCell>Available Room</TableCell>
            <TableCell>Available ICU</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={getCellStyle(item.available_room)}>{item.nama_rumahsakit}</TableCell>
              <TableCell style={getCellStyle(item.available_room)}>{item.max_room}</TableCell>
              <TableCell style={getCellStyle(item.available_room)}>{item.available_room}</TableCell>
              <TableCell style={getCellStyle(item.available_room)}>{item.available_icu}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
};

export default ListHospitalMekkah;
