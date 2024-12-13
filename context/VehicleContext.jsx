import React, { createContext, useState, useEffect } from 'react';
import fetchVehiclesByType from '../utils/FilterVehicles';

// Luo ajoneuvokonteksti
export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]); // Ajoneuvotiedot
  const [vehicleType, setVehicleType] = useState('spora'); // Oletusajoneuvotyyppi

  // Hakee ajoneuvotiedot annetun tyypin mukaan
  const fetchVehicles = async (type) => {
    try {
      const data = await fetchVehiclesByType(type || vehicleType);
      setVehicles(data);
      return data; // Palauttaa tiedot kutsujalle, jos tarvitaan
    } catch (error) {
      console.error('Virhe ajoneuvojen haussa:', error);
      throw error; // Heittää virheen edelleen, jos kutsuja tarvitsee sen
    }
  };

  useEffect(() => {
    // Hakee ajoneuvotiedot aluksi ja tyypin muuttuessa
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 1000);

    return () => clearInterval(interval); // Puhdistaa intervallin komponentin unmount-vaiheessa
  }, [vehicleType]);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicleType, fetchVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};
