import React from 'react';
import Map from '../components/common/dashboard/Map';
import PieChart from '../components/common/dashboard/PieChart';
import BarChart from '../components/common/dashboard/BarChart';
import Animate from "../components/common/Animate";

const DashboardPage = () => {
  const dashboardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  };

  const containerStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const chartSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Align items to the left and right
  };

  const chartContainerStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
  };

  const centerText = {
    textAlign: 'center', // Center the text
  };

  return (
    <div style={dashboardStyle}>
      <div style={containerStyle}>
        <div className="content">
          <div className="map-section">
            <Animate type="fade" delay={1.5} sx={{ height: "100%" }}>
              <h1 style={centerText}>Jemaah Location</h1>
              <div style={chartContainerStyle}>
                <Map />
              </div>
            </Animate>
          </div>
          <div className="chart-section" style={chartSectionStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <Animate type="fade" delay={2} sx={{ height: "100%" }}>
                <h2 style={centerText}>Persebaran Gender Jemaah</h2>
                <div style={chartContainerStyle}>
                  <PieChart />
                </div>
              </Animate>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
              <Animate delay={2.5}>
                <h3 style={centerText}>Persebaran Umur Jemaah</h3>
                <div style={chartContainerStyle}>
                  <BarChart />
                </div>
              </Animate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
