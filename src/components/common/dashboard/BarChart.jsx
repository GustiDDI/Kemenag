import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
  const [ageData, setAgeData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .then(data => {
        const ages = data.data.map(item => item.umur);
        const ageCounts = [0, 0, 0, 0, 0];

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

        const labels = ['30-39', '40-49', '50-59', '60-69', '70++'];

        setAgeData({
          labels: labels,
          series: [ageCounts],
        });
      })
      .catch(error => console.error('Error fetching age data:', error));
  }, []);

  const options = {
    chart: {
      type: 'bar',
      width: '90%',
    },
    xaxis: {
      categories: ageData.labels,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
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

  const series = [
    {
      name: 'Age Distribution',
      data: ageData.series[0],
    },
  ];

  return (
    <div className="age-distribution-chart" style={{ width: '90%' }}>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
