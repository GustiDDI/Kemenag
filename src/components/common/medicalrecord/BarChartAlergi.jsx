import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AllergyChart = ({ selectedName, showChart }) => {
  const [allergyData, setAllergyData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart) {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;

        let filteredData = data;
        if (selectedName) {
          filteredData = data.filter(item => item.emberkasi_name === selectedName);
        }

        const allergyLabels = [
          "Alergi obat-obatan",
          "tidak ada alergi",
          "Alergi asap rokok",
          "Alergi makanan",
          "Alergi udara dingin",
          "Alergi kulit ",
          "Alergi paru-paru",
          "Alergi terhadap seafood",
          "Alergi terhadap udara lembab",
          "Alergi buah-buahan",
          "Alergi parfum"
        ];

        const allergyCounts = [];

        for (let i = 0; i < allergyLabels.length; i++) {
          allergyCounts[i] = 0;
        }

        filteredData.forEach(item => {
          const allergy = item.alergi;
          const index = allergyLabels.indexOf(allergy);
          if (index !== -1) {
            allergyCounts[index]++;
          }
        });

        const filteredLabels = allergyLabels.filter((label, index) => allergyCounts[index] > 0);
        const filteredCounts = allergyCounts.filter(count => count > 0);

        setAllergyData({
          labels: filteredLabels,
          series: [filteredCounts]
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
      type: 'bar',
      width: '90%', // Adjusted width using template literal
    },
    xaxis: {
      categories: allergyData ? allergyData.labels : [],
      labels: {
        style: {
          fontSize: '12px',  // Change label font size
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return Math.round(val); // Round the values to remove decimals
        }
      },
      title: {
        text: 'Jumlah Jemaah',  // Add y-axis title
        style: {
          fontSize: '12px',  // Change title font size
        }
      }
    }
  };

  const chartSeries = [
    {
      name: 'Allergy Distribution',
      data: allergyData ? allergyData.series[0] : [],
    },
  ];

  return (
    <div style={{ width: '90%' }}>
      {allergyData && (
        <div>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default AllergyChart;
