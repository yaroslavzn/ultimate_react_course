import styles from './CityItem.module.css';
import React from 'react';
import { formatDate } from '../helpers/formatDate';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const {
    emoji,
    cityName,
    date,
    position: { lat, lng },
  } = city;

  const isCurrent = currentCity?.id === city.id;

  const deleteCityHandler = (event) => {
    event.preventDefault();

    deleteCity(city.id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          isCurrent ? styles['cityItem--active'] : ''
        }`}
        to={`/app/cities/${city.id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={deleteCityHandler}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
