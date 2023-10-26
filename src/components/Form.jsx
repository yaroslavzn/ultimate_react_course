// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useUrlPosition } from '../hooks/useUrlPosition';
import BackButton from './BackButton';
import Button from './Button';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const GEO_DATA_API_URL =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const { lat, lng } = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState('');
  const { addCity, addCityIsLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    const getGeoData = async () => {
      setIsLoading(true);
      setError('');
      if (lat && lng) {
        try {
          const res = await fetch(
            `${GEO_DATA_API_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryName) {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );
          }

          console.log(data);
          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (e) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getGeoData();
  }, [lat, lng]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await addCity(newCity);
    navigate('/app/cities');
  };

  if (error) {
    return <Message message={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form
      className={`${styles.form} ${addCityIsLoading ? styles.loading : ''}`}
      onSubmit={submitFormHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button buttonType="primary">Add</Button>

        <BackButton />
      </div>
    </form>
  );
}

export default Form;
