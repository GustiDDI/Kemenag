import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

const FilterNama = ({ handleSelectChange }) => {
  const [names, setNames] = useState([]);
  const [filteredName, setFilteredName] = useState('Hassan Zain');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/data')
      .then((response) => {
        const distinctNames = new Set(
          response.data.data.map((item) => item.nama)
        );
        setNames(Array.from(distinctNames));
        if (!names.includes(filteredName) && names.length > 0) {
          setFilteredName(names[0]);
        }
        handleShowBloomData();
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setFilteredName(selectedName);
  };

  const handleShowBloomData = () => {
    if (filteredName) {
      handleSelectChange(filteredName);
    } else {
      alert('Please select a valid name.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <TextField
        label="Select a name"
        variant="outlined"
        value={filteredName}
        onChange={handleNameChange}
        sx={{ flex: 1, marginRight: 2 }}
        inputProps={{
          list: 'name-list'
        }}
      />
      <datalist id="name-list">
        {names.map((name, index) => (
          <option key={index} value={name} />
        ))}
      </datalist>

      <Button
        variant="contained"
        onClick={handleShowBloomData}
        sx={{
          width: '200px',
          height: '50px',
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'darkgreen',
          },
        }}
      >
        Show Visualization
      </Button>
    </Box>
  );
};

export default FilterNama;
