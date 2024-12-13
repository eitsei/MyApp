import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


const MenuButton = ({ style, vehicles, setVehicles, vehicleType, setVehicleType }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const animation = new Animated.Value(0)
  const [buttons, setButtons] = useState([])

  const createButtons = (vehicles) => {
    const buttonsMap = vehicles.map((route) => {
      if (vehicleType === "spora") {
        const line = parseInt(route.route)
        return { id: line, label: route.route }
      } else if (vehicleType === "toge") {
        const a = route.route.slice(-1)
        return { id: a.charCodeAt(0), label: a }
      }
      return null
    }).filter(button => button !== null)
      .sort((a, b) => a.id - b.id)
    const uniqueButtons = Array.from(new Set(buttonsMap.map(button => button.id)))
    .map(id => buttonsMap.find(button => button.id === id))

    setButtons(uniqueButtons)
  }



  useEffect(() => {
    if (vehicles.length > 0) {
      createButtons(vehicles) // Kutsutaan luomista vain, kun ajoneuvot on ladattu
      //console.log("Napit luotu!" + vehicles[0].speed)
    }
  }, [vehicles]) // Tämä effect kuuntelee vain `vehicles`-tilan muutoksia

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false))
    } else {
      setMenuVisible(true)
      Animated.timing(animation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start()
    }
  }

  const handlePress = (id) => {
    setActiveButton(prevActiveButton => (prevActiveButton === id ? null : id))
  }

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -60 * buttons.length],
  })

  const icon = vehicleType === "spora" ? 'tram' : (vehicleType === "toge" ? 'train' : 'menu')


  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Icon name={menuVisible ? 'close' : icon} size={24} color="#fff" />
      </TouchableOpacity>

      {menuVisible && (
        <Animated.View
          style={[styles.menuContainer, { transform: [{ translateY }] }]}
        >
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={[
                styles.circularButton,
                activeButton === button.id && styles.activeButton,
              ]}
              onPress={() => handlePress(button.id)}
            >
              <Text style={styles.buttonText}>{button.id}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    marginVertical: 40,
  },
  circularButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#000',
  },
})

export default MenuButton
