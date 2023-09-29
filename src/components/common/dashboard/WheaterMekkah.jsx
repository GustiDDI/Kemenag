import React from 'react';
import Chart from 'react-apexcharts';
import jsonData from './wheathermekah.json';

const TemperatureChartMekah = () => {
  const options = {
    xaxis: {
      categories: jsonData.hourly.time,
      labels: {
        show: false,
      },
    },
    yaxis: [
      {
        seriesName: 'Temperature (°C)',
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            colors: '#008FFB',
          },
          formatter: function (value) {
            return value + ' °C';
          },
        },
        title: {
          text: 'Temperature (°C)',
          style: {
            color: '#008FFB',
          },
        },
      },
      {
        seriesName: 'Relative Humidity (%)',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          },
          formatter: function (value) {
            return value + ' %';
          },
        },
        title: {
          text: 'Relative Humidity (%)',
          style: {
            color: '#00E396',
          },
        },
      },
      {
        seriesName: 'Dewpoint (°C)',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FEB019',
        },
        labels: {
          style: {
            colors: '#FEB019',
          },
          formatter: function (value) {
            return value + ' °C';
          },
        },
        title: {
          text: 'Dewpoint (°C)',
          style: {
            color: '#FEB019',
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Temperature (°C)',
      data: jsonData.hourly.temperature_2m,
    },
    {
      name: 'Relative Humidity (%)',
      data: jsonData.hourly.relativehumidity_2m,
    },
    {
      name: 'Dewpoint (°C)',
      data: jsonData.hourly.dewpoint_2m,
    },
  ];

  return (
    <div className="tour-travel-distribution-chart" style={{ width: '100%' }}>
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height={450}
    />
    </div>
  );
};

export default TemperatureChartMekah;
