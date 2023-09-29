import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChartEmbarkasi = () => {
  const [embarkasiData, setEmbarkasiData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    // Fetch embarkasi data from the Golang API
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the data and extract embarkasi information
        const embarkasiCounts = {
          'Bandara Sultan Iskandar Muda': 0,
          'Bandara Syamsuding Noor': 0,
          'Bandara Soekarno-Hatta': 0,
          'Bandara Juanda': 0,
          'Bandara Sultan Hasanuddin': 0,
        };

        // Count the occurrences of each embarkasi
        data.data.forEach(item => {
          const embarkasi = item.emberkasi_name;
          if (embarkasiCounts.hasOwnProperty(embarkasi)) {
            embarkasiCounts[embarkasi]++;
          }
        });

        // Extract labels and series from the embarkasi counts
        const labels = Object.keys(embarkasiCounts);
        const series = Object.values(embarkasiCounts);

        // Update the state with the processed embarkasi data
        setEmbarkasiData({
          labels: labels,
          series: series,
        });
      })
      .catch(error => console.error('Error fetching embarkasi data:', error));
  }, []); // Run this effect only once (on component mount)

  const chartOptions = {
    chart: {
      type: 'bar',
      width: '90%',
    },
    xaxis: {
      categories: embarkasiData.labels,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return Math.round(val);
        },
      },
      title: {
        text: 'Jumlah Jemaah',
        style: {
          fontSize: '12px',
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Embarkasi Distribution',
      data: embarkasiData.series,
    },
  ];

  return (
    <div className="embarkasi-distribution-chart" style={{ width: '90%' }}>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default BarChartEmbarkasi;
