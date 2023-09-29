import React from 'react';
import MapMadinah from '../components/common/dashboard/MapMadinah';
import PieChart from '../components/common/dashboard/PieChart';
import BarChart from '../components/common/dashboard/BarChart';
import Animate from "../components/common/Animate";
import MapMekkah from '../components/common/dashboard/MapMekkah';
import BarChartEmbarkasi from '../components/common/dashboard/BarChartEmberkasi';
import BarChartTourTravel from '../components/common/dashboard/BarChartTourTravel';
import '../components/common/dashboard/DashboardPage.css';
import TemperatureChartMekkah from '../components/common/dashboard/WheaterMekkah';
import TemperatureChartMadinah from '../components/common/dashboard/WheaterMadinah';

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

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Persebaran Gender Jemaah</h2>
            <div style={containerStyle} className="chart-container">
              <PieChart />
            </div>
          </Animate>
        </div>
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Persebaran Umur Jemaah</h2>
            <div style={containerStyle} className="chart-container">
              <BarChart />
            </div>
          </Animate>
        </div>
      </div>
      <div className="chart-section">
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Embarkasi Jemaah</h2>
            <div style={containerStyle} className="chart-container">
              <BarChartEmbarkasi />
            </div>
          </Animate>
        </div>
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Tour Travel Jemaah</h2>
            <div style={containerStyle} className="chart-container">
              <BarChartTourTravel />
            </div>
          </Animate>
        </div>
      </div>
      <div className="chart-section">
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Weather Condition in Mekkah</h2>
            <div style={containerStyle} className="chart-container">
              <TemperatureChartMekkah />
            </div>
          </Animate>
        </div>
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Weather Condition in Madinah</h2>
            <div style={containerStyle} className="chart-container">
              <TemperatureChartMadinah />
            </div>
          </Animate>
        </div>
      </div>
      <div className="map-section">
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Jemaah Location - Mekkah</h2>
            <div style={containerStyle} className="map-container">
              <MapMekkah />
            </div>
          </Animate>
        </div>
        <div style={elementStyle}>
          <Animate type="fade" delay={1.5}>
            <h2 className="center-text">Jemaah Location - Madinah</h2>
            <div style={containerStyle} className="map-container">
              <MapMadinah />
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
