import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import customMapStyle from './Styles/customMapStyle';
import MenuButton from './MenuButton';
import SettingsButton from './SettingsButton';
import fetchVehiclesByType from '../utils/FilterVehicles';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [vehicleType, setVehicleType] = useState("spora");
  const [vehicles, setVehicles] = useState([]);
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isVehiclesLoaded, setIsVehiclesLoaded] = useState(false); // Track if vehicles are loaded

  // Fetch current location and region when the component mounts
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sijaintilupa evätty', 'Sijaintia ei voi näyttää ilman lupaa.');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({})
      setLocation(userLocation.coords);
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })()
  }, [])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await fetchVehiclesByType(vehicleType);
        const validVehicles = fetchedVehicles
          .filter(vehicle => 
            vehicle.latitude  && !isNaN(Number(vehicle.latitude))  && 
            Math.abs(Number(vehicle.latitude))  <= 90  &&
            vehicle.longitude && !isNaN(Number(vehicle.longitude)) && 
            Math.abs(Number(vehicle.longitude)) <= 180
          )
          .map(vehicle => ({
            ...vehicle,
            color: getUniqueColor(vehicle.route), // Lisää väri jokaiselle ajoneuvolle
          }));
        setVehicles(validVehicles);
        setIsVehiclesLoaded(true);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 2000); // Reduced frequency

    return () => clearInterval(interval);
  }, [vehicleType]);

  // Keeping the color generation function
  function getUniqueColor(identifier) {
    // console.log(`Kutsuttu: ${identifier}`)
    const colorMap = {
      1: '#FF6B6B',   // Red
      2: '#4ECDC4',   // Teal
      3: '#45B7D1',   // Blue
      4: '#FDCB6E',   // Yellow
      5: '#6C5CE7',   // Purple
      6: '#A8E6CF',   // Mint
      7: '#FF8A5B',   // Orange
      8: '#FF5733',   // Crimson
      9: '#C70039',   // Scarlet
      10: '#900C3F',  // Burgundy
      11: '#581845',  // Dark Purple
      12: '#2E4053',  // Dark Blue
      13: '#1ABC9C',  // Light Teal
      14: '#F39C12',  // Golden Yellow
      15: '#D35400',  // Burnt Orange
    };
  
    // Ensure identifier is converted to an integer
    const routeNumber = parseInt(identifier);
    
    // Use a modulo operation to cycle through colors if route number is larger than color map
    const colorKey = (routeNumber % Object.keys(colorMap).length) + 1;
    
    return colorMap[colorKey] || '#000000';  // Default to black if no color found
  }

  // console.log(`Vehicles first: ${vehicles[0]}`)

  return (
    <View style={styles.container}>
      {isVehiclesLoaded ? (  // Render the map only when vehicles are loaded
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          toolbarEnabled={false}
          compassOffset={{ x: 50, y: 150 }}
        >
        {vehicles.map((vehicle, index) => {
          
          return (
              <Marker
                  key={index}
                  title={vehicle.route[0] === '0' ? vehicle.route.slice(1) : vehicle.route}
                  description={`Vauhti: ${vehicle.speed.toFixed(2)} km/h`}
                  coordinate={{
                    latitude: Number(vehicle.latitude),
                    longitude: Number(vehicle.longitude),
                  }}
                  anchor={{x: 0.5, y: 0.5}}
                  tracksViewChanges={true}
              >
                  <View 
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: vehicle.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: 'white'
                      }}
                  >
                        <Text style={{
                          color: 'white', 
                          fontWeight: 'bold',
                          fontSize: 14
                        }}>
                          {vehicle.route[0] === '0' ? vehicle.route.slice(1) : vehicle.route}
                      </Text>
                  </View>
            </Marker>
          );
        })}
        </MapView>
      ) : (
        <Text>Loading vehicles...</Text> // Show a loading message until vehicles are loaded
      )}
      
      <MenuButton 
        style={styles.menuButton}
        vehicles={vehicles}
        setVehicles={setVehicles}
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
      />
      <SettingsButton style={styles.settingsButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  menuButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  markerContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    zIndex:10
  },
  markerText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 14
  },
  markerArrow: {
    position: 'absolute',
    top: -10,
  },
  markerArrowText: {
    fontSize: 20, 
    color: 'black'
  }
});

export default Map;
