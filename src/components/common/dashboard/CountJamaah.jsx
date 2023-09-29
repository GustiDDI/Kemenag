import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

const MedicalRecordCount = () => {
  const [normalCount, setNormalCount] = useState(0);
  const [feverCount, setFeverCount] = useState(0);

  useEffect(() => {
    // Fetch data from the GoLang backend
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        const data = response.data.data;

        // Calculate normal and fever count based on "medical_condition" attribute
        const normalRecords = data.filter(record => record.medical_condition === 'Normal');
        const feverRecords = data.filter(record => record.medical_condition === 'Fever');

        setNormalCount(normalRecords.length);
        setFeverCount(feverRecords.length);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      fontSize: '24px',
      padding: '10px',
      borderRadius: '10px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '100px' }}>
        <i className="fa fa-heartbeat" style={{ fontSize: '72px', marginBottom: '10px', marginTop: '35px' }}></i>
        <p style={{ textAlign: 'center' }}>Sehat: {normalCount} Jemaah</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '100px' }}>
        <i className="fa fa-thermometer-full" style={{ fontSize: '72px', marginBottom: '10px', marginTop:'35px' }}></i>
        <p style={{ textAlign: 'center' }}>Demam: {feverCount} Jemaah</p>
      </div>
    </div>
  );
};

export default MedicalRecordCount;
