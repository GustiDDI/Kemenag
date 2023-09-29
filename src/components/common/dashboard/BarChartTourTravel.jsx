import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChartTourTravel = () => {
  const [tourTravelData, setTourTravelData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    // Fetch tour travel data from the Golang API
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the data and extract tour travel information
        const tourTravelCounts = {
          'Nusa Haji Travel': 0,
          'Qibla Haji Services': 0,
          'Safa & Marwah Hajj Travel': 0,
          'Al-Firdaus Hajj Services': 0,
          'Hajar Al-Aswad Pilgrimage': 0,
          'Haji Jannah Indonesia': 0,
          'Safa Marwa Haji Express': 0,
        };

        // Count the occurrences of each tour travel
        data.data.forEach(item => {
          const tourTravel = item.travel_name;
          if (tourTravelCounts.hasOwnProperty(tourTravel)) {
            tourTravelCounts[tourTravel]++;
          }
        });

        // Extract labels and series from the tour travel counts
        const labels = Object.keys(tourTravelCounts);
        const series = Object.values(tourTravelCounts);

        // Update the state with the tour travel data
        setTourTravelData({
          labels: labels,
          series: [series],
        });
      })
      .catch(error => console.error('Error fetching tour travel data:', error));
  }, []); // Run this effect only once (on component mount)

  const chartOptions = {
    chart: {
      type: 'bar',
      width: '90%',
    },
    xaxis: {
      categories: tourTravelData.labels,
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
      name: 'Tour Travel Distribution',
      data: tourTravelData.series[0],
    },
  ];

  return (
    <div className="tour-travel-distribution-chart" style={{ width: '90%' }}>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default BarChartTourTravel;
