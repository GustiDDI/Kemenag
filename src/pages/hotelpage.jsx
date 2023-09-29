import React from 'react';
import HeatMapMekkah from '../components/common/hotel/HeatMapMekkah';
import HeatMapMadinah from '../components/common/hotel/HeatMapMadinah';
import ListHotelMekkah from '../components/common/hotel/listhotelmekkah';
import ListHotelMadinah from '../components/common/hotel/listhotelmadinah';
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

const HotelPage = () => {
  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Heat Map Hotel Mekah</h2>
          <div style={containerStyle} className="chart-container chart">
            <HeatMapMekkah />
          </div>
        </div>

        <div style={elementStyle}>
          <h2 className="center-text">Heat Map Hotel Madinah</h2>
          <div style={containerStyle} className="chart-container chart">
            <HeatMapMadinah />
          </div>
        </div>
      </div>

      <div className="map-section">
        <div style={elementStyle}>
          <h2 className="center-text">Top 5 Hotel Mekah</h2>
          <div style={containerStyle} className="map-container map">
            <ListHotelMekkah />
          </div>
        </div>

        <div style={elementStyle}>
          <h2 className="center-text">Top 5 Hotel Madinah</h2>
          <div style={containerStyle} className="map-container map">
            <ListHotelMadinah />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
