import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const MedicalConditionPieChart = ({ selectedName, showChart }) => {
  const [conditionData, setConditionData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart) {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;

        let filteredData = data;
        if (selectedName) {
          filteredData = data.filter(item => item.emberkasi_name === selectedName);
        }

        // Filter data for "Fever" and "Normal" medical conditions
        const filteredConditionData = filteredData.filter(item =>
          item.medical_condition === 'Fever' || item.medical_condition === 'Normal'
        );

        const conditionLabels = ['Fever', 'Normal'];
        const conditionCounts = [0, 0];

        filteredConditionData.forEach(item => {
          const condition = item.medical_condition;
          const index = conditionLabels.indexOf(condition);
          if (index !== -1) {
            conditionCounts[index]++;
          }
        });

        setConditionData({
          labels: conditionLabels,
          series: conditionCounts,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedName, showChart]);

  const chartOptions = {
    chart: {
      width: '90%', // Adjusted width using template literal
    },
    labels: conditionData ? conditionData.labels : [],
    plotOptions: {
      pie: {
        donut: {
          size: '50%', // Adjust the size of the donut hole
        },
      },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      {conditionData && (
        <div>
          <Chart
            options={chartOptions}
            series={conditionData.series}
            type="donut"
            height={360}
          />
        </div>
      )}
    </div>
  );
};

export default MedicalConditionPieChart;
