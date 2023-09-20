import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterNama = ({ handleSelectChange }) => {
  const [names, setNames] = useState([]);
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setNames(response.data.data.map(item => item.nama));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setFilteredName(selectedName);
    handleSelectChange(selectedName);  // Update selected option
  };

  return (
    <div>
      <h1>Pilgrim 360</h1>
      <input
        type="text"
        list="nameOptions"
        value={filteredName}
        onChange={handleNameChange}
        placeholder="Select a name"
      />
      <datalist id="nameOptions">
        {names.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default FilterNama;
