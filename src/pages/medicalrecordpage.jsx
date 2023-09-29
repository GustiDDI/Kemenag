import React, { useState } from 'react';
import AgeDistributionChart from '../components/common/medicalrecord/BarChartUsia';
import FilterNama from '../components/common/medicalrecord/filternamamedical';
import AllergyChart from '../components/common/medicalrecord/BarChartAlergi';
import PenyakitChart from '../components/common/medicalrecord/BarChartRiwayatPenyakit';
import MedicalConditionPieChart from '../components/common/medicalrecord/PieChartMedicalCondition';
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

const MedicalRecordPage = () => {
  const [selectedName, setSelectedName] = useState('');
  const [showChart, setShowChart] = useState(false);

  const handleSelectChange = (name) => {
    setSelectedName(name);
    setShowChart(true); // Set showChart to true when a name is selected
  };

  return (
    <div className="dashboard-container">
      <h1>Rekam Medis Jemaah</h1>
      <FilterNama handleSelectChange={handleSelectChange} /> {/* FilterNama outside the border */}
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Kondisi Kesehatan Jemaah</h2>
          <div style={containerStyle} className="chart-container">
            <MedicalConditionPieChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
        <div style={elementStyle}>
          <h2 className="center-text">Persebaran Umur Jemaah</h2>
          <div style={containerStyle} className="chart-container">
            <AgeDistributionChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
      </div>
      <div className="chart-section">
        <div style={elementStyle}>
          <h2 className="center-text">Riwayat Penyakit</h2>
          <div style={containerStyle} className="chart-container">
            <PenyakitChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
        <div style={elementStyle}>
          <h2 className="center-text">Riwayat Alergi</h2>
          <div style={containerStyle} className="chart-container">
            <AllergyChart selectedName={selectedName} showChart={showChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordPage;
