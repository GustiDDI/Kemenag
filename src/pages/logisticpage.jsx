import React, { useState } from 'react';
import FilterNama from '../components/common/logistic/filter';
import TransportChart from '../components/common/logistic/PieChartTransport';
import AkomodasiChart from '../components/common/logistic/PieChartAkomodasi';
import KonsumsiList from '../components/common/logistic/ListKonsumsi';
import ObatList from '../components/common/logistic/ListObat';
import '../components/common/medicalrecord/MedicalRecordPage.css';

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

const LogisticPage = () => {
  const [selectedName, setSelectedName] = useState('');
  const [showChart, setShowChart] = useState(false);

  const handleSelectChange = (name) => {
    setSelectedName(name);
    setShowChart(true); // Set showChart to true when a name is selected
  };

  return (
    <div className="dashboard-container"> {/* Add class for dashboard styling */}
      <h1>Logistic Data</h1>
      <FilterNama handleSelectChange={handleSelectChange} />
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Transportation</h2>
          <div style={containerStyle} className="chart-container">
            <TransportChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
        <div style={elementStyle}>
          <h2 className="center-text">Accomodation</h2>
          <div style={containerStyle} className="chart-container">
            <AkomodasiChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
      </div>
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Consumption</h2>
          <div style={containerStyle} className="chart-container">
            <KonsumsiList selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
        <div style={elementStyle}>
          <h2 className="center-text">Medicine</h2>
          <div style={containerStyle} className="chart-container">
            <ObatList selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticPage;
