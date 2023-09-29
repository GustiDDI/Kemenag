import React from 'react';
import BloomCommunity from '../components/common/pilgrim360/bloomcommunity';
import BloomSimilar from '../components/common/pilgrim360/bllomsimilar';

const elementStyle = {
  width: '100%',
  marginBottom: '20px',
  borderRadius: '10px',
  border: '1px solid #ccc',
};

const containerStyle = {
  width: '100%',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const Pilgrim360 = () => {
  return (
    <div>
      <h1 className="center-text">Jemaah Similar</h1>
      <div style={elementStyle}>
        <BloomSimilar />
      </div>
      <h1 className="center-text">Jemaah Community</h1>
      <div style={elementStyle}>
        <BloomCommunity />
      </div>
    </div>
  );
};

export default Pilgrim360;
