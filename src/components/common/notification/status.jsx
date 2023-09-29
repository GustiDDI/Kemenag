// StatusChecker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusChecker = ({ onStatusUpdate }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        const data = response.data.data;
        if (data && data.length > 0) {
          onStatusUpdate(data.map(item => item.status));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Setup polling to fetch data periodically (e.g., every 10 seconds)
    const interval = setInterval(fetchData, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(interval);
  }, [onStatusUpdate]);

  return null;  // StatusChecker doesn't render anything
};

export default StatusChecker;
