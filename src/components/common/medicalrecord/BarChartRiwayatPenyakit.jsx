import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const PenyakitChart = ({ selectedName, showChart }) => {
  const [penyakitData, setPenyakitData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart) {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;

        let filteredData = data;
        if (selectedName) {
          filteredData = data.filter(item => item.emberkasi_name === selectedName);
        }

        const penyakitLabels = [
          "Katarak",
          "Anemia",
          "Penyakit lambung",
          "Asma",
          "asam urat",
          "Covid19",
          "Osteoporosis"
        ];

        const penyakitCounts = Array(penyakitLabels.length).fill(0);

        filteredData.forEach(item => {
          const riwayatPenyakit = item.riwayat_penyakit;

          // Split riwayatPenyakit into an array if it's a string
          const penyakitArr = riwayatPenyakit.split(',').map(p => p.trim());

          penyakitArr.forEach(penyakit => {
            const index = penyakitLabels.indexOf(penyakit);
            if (index !== -1) {
              penyakitCounts[index]++;
            }
          });
        });

        const filteredLabels = penyakitLabels.filter((label, index) => penyakitCounts[index] > 0);
        const filteredCounts = penyakitCounts.filter(count => count > 0);

        setPenyakitData({
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
      categories: penyakitData ? penyakitData.labels : [],
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
      name: 'Riwayat Penyakit Distribution',
      data: penyakitData ? penyakitData.series[0] : [],
    },
  ];

  return (
    <div style={{ width: '90%' }}>
      {penyakitData && (
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

export default PenyakitChart;
