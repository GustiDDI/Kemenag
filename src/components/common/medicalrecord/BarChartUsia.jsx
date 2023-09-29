import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const BarChartUsia = ({ selectedName, showChart }) => {
  const [ageDistributionData, setAgeDistributionData] = useState(null);

  const fetchData = async () => {
    try {
      if (showChart && selectedName) {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;

        const filteredData = data.filter(item => item.emberkasi_name === selectedName);

        const ageGroups = ['30-39', '40-49', '50-59', '60-69', '70++'];
        const ageCounts = [0, 0, 0, 0, 0];

        filteredData.forEach(item => {
          const age = item.umur;
          if (age >= 30 && age <= 39) {
            ageCounts[0]++;
          } else if (age >= 40 && age <= 49) {
            ageCounts[1]++;
          } else if (age >= 50 && age <= 59) {
            ageCounts[2]++;
          } else if (age >= 60 && age <= 69) {
            ageCounts[3]++;
          } else {
            ageCounts[4]++;
          }
        });

        const filteredAgeGroups = ageGroups.filter((group, index) => ageCounts[index] > 0);
        const filteredAgeCounts = ageCounts.filter(count => count > 0);

        setAgeDistributionData({
          labels: filteredAgeGroups,
          series: [filteredAgeCounts],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedName, showChart]);

  return (
    <div style={{ width: '90%' }}>
      {ageDistributionData && (
        <div>
          <Chart
            options={{
              xaxis: {
                categories: ageDistributionData.labels,
              },
              yaxis: {
                title: {
                  text: 'Jumlah Jemaah',
                },
              },
            }}
            series={[
              {
                data: ageDistributionData.series[0],
                name: 'Age Distribution',
              },
            ]}
            type="bar"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default BarChartUsia;
