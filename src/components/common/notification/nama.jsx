import React, { useState, useEffect } from 'react';
import StatusChecker from './status';
import axios from 'axios';
import './Nama.css';
import UserCard from './usercard';
import Map from './map';
import ExecuteButton from './executebutton';

const containerStyle = {
  display: 'flex',
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  marginBottom: '20px',
  padding: '20px',
};

const cardStyle = {
  flex: '1',
  marginRight: '20px',
};

const mapStyle = {
  flex: '1',
  height: '825px',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const Nama = () => {
  const [names, setNames] = useState([]);
  const [dispatchData, setDispatchData] = useState([]);
  const [apiData, setApiData] = useState(null);

  const handleStatusUpdate = async () => {
    try {
      const responseUser = await axios.get('http://localhost:8080/api/data');
      const responseDispatch = await axios.get('http://localhost:8080/api/data/dispatch');

      const userData = responseUser.data.data;
      const dispatchData = responseDispatch.data.data;

      const dangerNames = userData
        .filter(item => item.status === 'danger')
        .map(item => ({
          nama: item.nama,
          umur: item.umur,
          gender: item.gender,
          ktp: item.ktp,
          passport: item.passport_jemaah,
          medical_condition: item.medical_condition,
          no_kloter: item.no_kloter,
          heart_rate: item.heart_rate,
          blood_pressure: item.blood_pressure,
          temperature: item.temperature,
          oxygen_level: item.oxygen_level,
          latitude: item.latitude,
          longitude: item.longitude,
          passport_jemaah: item.passport_jemaah,
          travel_name: item.travel_name,
          emberkasi_name: item.emberkasi_name,
        }))[0];  // Use [0] to select the first item

      // Transform the data to match the provided structure
      const apiDataStructure = {
        nama: dangerNames.nama,
        umur: dangerNames.umur,
        gender: dangerNames.gender,
        ktp: dangerNames.ktp,
        passport: dangerNames.passport_jemaah,
        emberkasi_name:dangerNames.emberkasi_name,
        travel_name:dangerNames.travel_name,
        medical_condition: dangerNames.medical_condition,
        heart_rate: dangerNames.heart_rate,
        blood_pressure: dangerNames.blood_pressure,
        temperature: dangerNames.temperature,
        oxygen_level: dangerNames.oxygen_level,

        link_map: `https://www.google.com/maps?q=${dangerNames.latitude},${dangerNames.longitude}`,
        recipient: dispatchData[0].telepon_dispatch
      };

      setNames([dangerNames]);
      setDispatchData(dispatchData);
      setApiData(apiDataStructure);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleStatusUpdate();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pilgrim in Emergency Situation</h1>
      <StatusChecker onStatusUpdate={handleStatusUpdate} />
      {apiData && (
        <ExecuteButton
          apiData={apiData}
          onExecute={(response) => {
            console.log('API executed:', response);
            // Handle the API execution response here if needed
          }}
        />
      )}
      {names.map((user, index) => (
        <div style={containerStyle} key={index}>
          <div style={cardStyle}>
            <UserCard user={user} />
          </div>
          <div style={mapStyle}>
            <Map
              nama={user.nama}
              latitude={user.latitude}
              longitude={user.longitude}
              dispatchData={dispatchData}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nama;
