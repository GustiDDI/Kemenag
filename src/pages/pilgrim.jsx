import React, { useState } from 'react';
import FilterNama from '../components/common/pilgrim/filternama';
import Bloom360 from '../components/common/pilgrim/bloom360';

const elementStyle = {
  width: '100%',
  marginBottom: '30px',
  borderRadius: '10px',
  border: '1px solid #ccc',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const Pilgrim = () => {
  const [selectedName, setSelectedName] = useState('Hassan Zain');

  const handleSelectChange = (name) => {
    setSelectedName(name);
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '50%', marginRight: '20px', alignSelf: 'flex-start' }}>
        <h1>Jemaah 360</h1>
        <FilterNama handleSelectChange={handleSelectChange} />
      </div>
      <div style={{ ...elementStyle, marginTop: '30px', alignSelf: 'center', marginRight: '30px',marginLeft: '35px' }}>
        <Bloom360 selectedName={selectedName} />
      </div>
    </div>
  );
};

export default Pilgrim;
