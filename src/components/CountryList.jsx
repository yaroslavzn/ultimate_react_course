import React from 'react';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities
    .map((city) => ({ emoji: city.emoji, country: city.country }))
    .reduce((acc, curr) => {
      if (acc.some((item) => item.country === curr.country)) {
        return acc;
      }

      acc.push(curr);

      return acc;
    }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
