import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Button from './Button';
import styles from './Map.module.css';

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();
  const { isLoading, position, getPosition } = useGeolocation();
  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  const citySelectHandler = (e) => {
    const {
      latlng: { lat, lng },
    } = e;

    navigate(`form?lat=${lat}&lng=${lng}`);
  };

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button buttonType="position" onClick={() => getPosition()}>
          {isLoading ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}

        <CenterMap position={mapPosition} />

        <DetectClick onClickHandler={citySelectHandler} />
      </MapContainer>
    </div>
  );
};

const CenterMap = ({ position }) => {
  const mapView = useMap();

  mapView.setView(position);

  return null;
};

const DetectClick = ({ onClickHandler }) => {
  useMapEvents({
    click: onClickHandler,
  });

  return null;
};

export default Map;
