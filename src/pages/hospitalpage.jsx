import React from 'react';
import HeatMapMadinah from '../components/common/hospital/HeatMapHospitalMadinah';
import ListHospitalMadinah from '../components/common/hospital/ListHospitalMadinah';
import HeatMapMekkah from '../components/common/hospital/HeatMapHospitalMekkah';
import ListHospitalMekkah from '../components/common/hospital/ListHospitalMekkah';
import '../components/common/hotel/hotelpage.css';

const elementStyle = {
  width: '48%',
  marginBottom: '20px',
};

const containerStyle = {
  width: '100%',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const HospitalPage = () => {
  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Heat Map Hospital Mekah</h2>
          <div style={containerStyle} className="chart-container chart">
            <HeatMapMekkah />
          </div>
        </div>

        <div style={elementStyle}>
          <h2 className="center-text">Heat Map Hospital Madinah</h2>
          <div style={containerStyle} className="chart-container chart">
            <HeatMapMadinah />
          </div>
        </div>
      </div>

      <div className="map-section">
        <div style={elementStyle}>
          <h2 className="center-text">List of Hospitals in Mekah</h2>
          <div style={containerStyle} className="map-container map">
            <ListHospitalMekkah />
          </div>
        </div>

        <div style={elementStyle}>
          <h2 className="center-text">List of Hospitals in Madinah</h2>
          <div style={containerStyle} className="map-container map">
            <ListHospitalMadinah />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;
