import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
  const [ageData, setAgeData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    // Fetch age data from the Golang API
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the data and extract age information
        const ages = data.data.map(item => item.umur);
        const ageCounts = [0, 0, 0, 0, 0]; // Initialize age count array for the new age ranges

        // Count the occurrences of each age within the new age ranges
        ages.forEach(age => {
          if (age >= 30 && age <= 39) {
            ageCounts[0]++;
          } else if (age >= 40 && age <= 49) {
            ageCounts[1]++;
          } else if (age >= 50 && age <= 59) {
            ageCounts[2]++;
          } else if (age >= 60 && age <= 69) {
            ageCounts[3]++;
          } else if (age >= 70) {
            ageCounts[4]++;
          }
        });

        // Generate labels for the new age groups
        const labels = ['30-39', '40-49', '50-59', '60-69', '70++'];

        // Update the state with the processed age data
        setAgeData({
          labels: labels,
          series: ageCounts,
        });
      })
      .catch(error => console.error('Error fetching age data:', error));
  }, []); // Run this effect only once (on component mount)

  const options = {
    chart: {
      type: 'bar',
      height: 300,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ageData.labels,
      title: {
        text: 'Umur'
      }
    },
    yaxis: {
      title: {
        text: 'Jumlah',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div className="age-distribution-chart">
      <Chart options={options} series={[{ data: ageData.series }]} type="bar" height={350} width={400} />
    </div>
  );
};

export default BarChart;
