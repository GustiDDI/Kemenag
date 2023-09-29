import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const GenderDonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Male', 'Female'],
      plotOptions: {
        pie: {
          donut: {
            size: '50%', // Adjust the size of the donut hole
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;

        // Count the number of males and females
        const maleCount = data.filter(item => item.gender === 'P').length;
        const femaleCount = data.filter(item => item.gender === 'L').length;

        // Update the chart data
        setChartData({
          series: [maleCount, femaleCount],
          options: {
            chart: {
              type: 'donut',
            },
            labels: ['Male', 'Female'],
            plotOptions: {
              pie: {
                donut: {
                  size: '50%', // Adjust the size of the donut hole
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      width="500"
    />
  );
};

export default GenderDonutChart;
