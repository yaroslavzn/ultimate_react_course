import React, { useEffect } from 'react';
import styles from './AppLayout.module.css';
import SideBar from '../components/SideBar';
import Map from '../components/Map';
import User from '../components/User';
import { useAuth } from '../contexts/AuthContext';
import { useCities } from '../contexts/CitiesContext';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const { getCities } = useCities();

  useEffect(() => {
    getCities();
  }, [getCities]);

  return (
    <div className={styles.app}>
      <SideBar />

      <Map />

      {isAuthenticated && <User />}
    </div>
  );
};

export default AppLayout;
