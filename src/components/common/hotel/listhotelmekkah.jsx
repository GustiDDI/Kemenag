import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ListHotelMekkah = () => {
  const [hotelCounts, setHotelCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the data where kota is "Mekkah"
        const mekahData = data.data.filter(item => item.kota === 'Mekkah');

        // Count occurrences of each hotel
        const counts = {};
        mekahData.forEach(item => {
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
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: hotelCounts.map(([hotelName]) => hotelName),
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return Math.round(val); // Round the values to remove decimals
        },
      },
      title: {
        text: 'Jumlah Jemaah', // Add y-axis title
        style: {
          fontSize: '12px', // Change title font size
        },
      },
    },
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

export default ListHotelMekkah;
