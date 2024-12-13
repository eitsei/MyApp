import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '../components/Map';
import { VehicleProvider } from '../context/VehicleContext'; // Lisää VehicleProvider

export default function App() {
  return (
      <View style={styles.container}>
        <Map />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
