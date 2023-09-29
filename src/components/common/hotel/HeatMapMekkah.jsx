import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const HeatMapMekkah = () => {
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

        // Check if the map container is not already associated with a map
        const mapContainer = document.getElementById('map-mekkah');
        if (!mapContainer._leaflet_id) {
          // Create the Leaflet map
          const map = L.map('map-mekkah').setView([21.4267, 39.8262], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          // Count occurrences of each location
          const locationCounts = {};
          mekahData.forEach(item => {
            const key = `${item.hotel_latitude},${item.hotel_longitude}`;
            locationCounts[key] = (locationCounts[key] || 0) + 1;
          });

          // Create a heatmap data array based on hotel locations and counts
          const heatmapData = mekahData.map(item => [
            item.hotel_latitude,
            item.hotel_longitude,
            locationCounts[`${item.hotel_latitude},${item.hotel_longitude}`] || 1
          ]);

          // Create a heatmap layer
          L.heatLayer(heatmapData, { radius: 20 }).addTo(map);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div id="map-mekkah" style={{ height: '400px', width: '100%' }}></div>;
};

export default HeatMapMekkah;
