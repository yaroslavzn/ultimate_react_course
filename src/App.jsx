import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import ProductPage from './pages/ProductPage';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './guards/AuthGuard';

function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <AuthGuard>
                    <AppLayout />
                  </AuthGuard>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
