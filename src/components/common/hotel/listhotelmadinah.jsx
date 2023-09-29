import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ListHotelMadinah = () => {
  const [hotelCounts, setHotelCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the data where kota is "Madinah"
        const madinahData = data.data.filter(item => item.kota === 'Madinah');

        // Count occurrences of each hotel
        const counts = {};
        madinahData.forEach(item => {
          const hotelName = item.nama_hotel;
          counts[hotelName] = (counts[hotelName] || 0) + 1;
        });

        // Sort hotels by count in descending order
        const sortedHotelCounts = Object.entries(counts)
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 5); // Take the top 5

        // Update hotel counts
        setHotelCounts(sortedHotelCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: hotelCounts.map(([hotelName]) => hotelName),
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
      name: 'Hotel Counts',
      data: hotelCounts.map(([, count]) => count),
    },
  ];

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default ListHotelMadinah;
