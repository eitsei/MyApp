import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenu from './SideMenu';
import content from '../Texts/Contents.json';
import SideMenuContent from './SideMenuContent'

const { height } = Dimensions.get('window');

const SettingButton = ({ style }) => {
  const [slideIn] = useState(new Animated.Value(-300));
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleDrawer = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
    Animated.timing(slideIn, {
      toValue: isSideMenuOpen ? -300 : 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Header Component
  const HeaderContent = () => (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color:'white' }}>
        {content.sideMenu.header.title}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={40} color="#000" padding={5} zIndex={10} />
      </TouchableOpacity>
      
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideIn }] }]}>
        <SideMenu 
          onClose={toggleDrawer}
          headerComponent={<HeaderContent />}
          mainComponent={<SideMenuContent onClose={toggleDrawer} />}
          headerBackgroundColor="darkgreen"
          mainBackgroundColor="grey"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    height: height,
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

export default SettingButton;