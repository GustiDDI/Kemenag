import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const TransportChart = ({ selectedName, showChart }) => {
  const [transportData, setTransportData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart) {
        const response = await axios.get('http://localhost:8080/api/data/logistic/transport');
        const data = response.data.data;

        let filteredData = data;
        if (selectedName) {
          filteredData = data.filter(item => item.kota_logistic === selectedName);
        }

        const transportLabels = [
          "bus",
          "buggy car",
          "minibus"
        ];

        const transportCounts = transportLabels.map(label => {
          const count = filteredData.reduce((acc, item) => {
            return item.tipe_transportasi === label ? acc + item.jumlah_transportasi : acc;
          }, 0);
          return count;
        });

        const filteredLabels = transportLabels.filter((label, index) => transportCounts[index] > 0);
        const filteredCounts = transportCounts.filter(count => count > 0);

        setTransportData({
          labels: filteredLabels,
          series: filteredCounts
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
    labels: transportData ? transportData.labels : [],
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
      {transportData && (
        <div>
          <Chart
            options={chartOptions}
            series={transportData.series}
            type="donut"
            height={360}
          />
        </div>
      )}
    </div>
  );
};

export default TransportChart;
