import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AkomodasiChart = ({ selectedName, showChart }) => {
  const [akomodasiData, setAkomodasiData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart) {
        const response = await axios.get('http://localhost:8080/api/data/logistic/akomodasi');
        const data = response.data.data;

        let filteredData = data;
        if (selectedName) {
          filteredData = data.filter(item => item.kota_logistic === selectedName);
        }

        const akomodasiLabels = [
          "klinik kesehatan",
          "AC Portable",
          "Toilet Portable",
          "Tenda"
        ];

        const akomodasiCounts = akomodasiLabels.map(label => {
          const count = filteredData.reduce((acc, item) => {
            return item.nama_akomodasi === label ? acc + item.jumlah_akomodasi : acc;
          }, 0);
          return count;
        });

        const filteredLabels = akomodasiLabels.filter((label, index) => akomodasiCounts[index] > 0);
        const filteredCounts = akomodasiCounts.filter(count => count > 0);

        setAkomodasiData({
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
    labels: akomodasiData ? akomodasiData.labels : [],
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
      {akomodasiData && (
        <div>
          <Chart
            options={chartOptions}
            series={akomodasiData.series}
            type="donut"
            height={360}
          />
        </div>
      )}
    </div>
  );
};

export default AkomodasiChart;
