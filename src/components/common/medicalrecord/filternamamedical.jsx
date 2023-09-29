import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

const FilterNama = ({ handleSelectChange }) => {
  const [names, setNames] = useState([]);
  const [filteredName, setFilteredName] = useState('Bandara Sultan Iskandar Muda'); // Set initial value

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/data')
      .then((response) => {
        const distinctNames = new Set(
          response.data.data.map((item) => item.emberkasi_name)
        );
        setNames(Array.from(distinctNames));
        // If the initial value is not in the list, set it to the first name
        if (!names.includes(filteredName) && names.length > 0) {
          setFilteredName(names[0]);
        }
        handleShowChart(); // Call handleShowChart after setting the filteredName
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run this effect only once

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setFilteredName(selectedName);
  };

  const handleShowChart = () => {
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
        select
      >
        {names.map((name, index) => (
          <MenuItem key={index} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        onClick={handleShowChart}
        sx={{
          width: '300px',
          height: '50px',
          backgroundColor: 'green',  // Set the button's background color to green
          '&:hover': {
            backgroundColor: 'darkgreen',  // Change the hover background color
          },
        }}
      >
        Show Medical Conditions
      </Button>
    </Box>
  );
};

export default FilterNama;
