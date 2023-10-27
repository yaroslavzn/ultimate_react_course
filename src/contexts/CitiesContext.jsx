import { createContext, useCallback, useContext, useState } from 'react';
import { BASE_API_URL } from '../hooks/useFetch';

const CitiesContext = createContext(null);

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [addCityIsLoading, setAddCityIsLoading] = useState(false);

  const getCities = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_API_URL}/cities`);
      const data = await res.json();

      setCities(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCity = async (newCity) => {
    setAddCityIsLoading(true);

    try {
      const res = await fetch(`${BASE_API_URL}/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
      setCurrentCity(data);
    } catch (e) {
    } finally {
      setAddCityIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_API_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      await res.json();

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        setCurrentCity,
        currentCity,
        addCity,
        addCityIsLoading,
        deleteCity,
        getCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);

  if (context == null) {
    throw new Error('useCitites should be used inside the CitiesProvider');
  }

  return context;
};

export { CitiesProvider, useCities };
