import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { images } from "../../../assets";
import axios from 'axios';

const MapMekkah = () => {
    const mapRef = useRef(null);
    const markersRef = useRef([]);

    const updateMapMarkers = (data) => {
        const map = mapRef.current;
        const markers = markersRef.current;

        if (map) {
            data.forEach((item, index) => {
                const { latitude, longitude, nama, status } = item;
                const iconUrl = status === 'safe' ? images.safe : images.danger;

                // Check if a marker for this data point already exists
                if (markers[index]) {
                    markers[index].setLatLng([latitude, longitude]);
                    markers[index].setIcon(L.icon({
                        iconUrl: iconUrl,
                        iconSize: [16, 16],
                    }));
                    markers[index].bindPopup(`<strong>Nama Jemaah:</strong> ${nama}<br><strong>Status:</strong> ${status}`);
                } else {
                    // Create a new marker for this data point
                    const customIcon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [16, 16],
                    });
                    const marker = L.marker([latitude, longitude], { icon: customIcon })
                        .bindPopup(`<strong>Nama Jemaah:</strong> ${nama}<br><strong>Status:</strong> ${status}`);
                    markers.push(marker);
                    marker.addTo(map);
                }
            });

            // Remove any extra markers if data size decreased
            for (let i = data.length; i < markers.length; i++) {
                map.removeLayer(markers[i]);
            }
            markersRef.current = markers.slice(0, data.length);  // Update markers array
        }
    };

    useEffect(() => {
        const fetchJemaahData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/data');
                const data = response.data.data;
                updateMapMarkers(data);
            } catch (error) {
                console.error('Error fetching jemaah data:', error);
            }
        };

        if (!mapRef.current) {
            const map = L.map('map-mekkah').setView([21.3891, 39.8579], 11);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            mapRef.current = map;
        }

        const fetchData = () => fetchJemaahData();
        fetchData();

        const interval = setInterval(fetchData, 1000); // Refresh every 10 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div style={{
            padding: '10px',
            borderRadius: '10px',
        }}>
            <div id="map-mekkah" style={{ width: '100%',height: '400px', marginTop: '5px' }}></div>
        </div>
    );
};

export default MapMekkah;
