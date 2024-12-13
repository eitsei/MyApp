import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const SideMenu = ({ 
  onClose, 
  headerComponent, 
  mainComponent,
  headerBackgroundColor = '#f0f0f0',
  mainBackgroundColor = '#000000'
}) => {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Icon name="close" size={30} color="#000" />
      </TouchableOpacity>

      {/* Header Section */}
      <View 
        style={[
          styles.headerContainer, 
          { backgroundColor: headerBackgroundColor }
        ]}
      >
        {headerComponent}
      </View>

      {/* Main Content Section */}
      <View 
        style={[
          styles.contentContainer, 
          { backgroundColor: mainBackgroundColor }
        ]}
      >
        {mainComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.8, // 70% of screen width
    height: height,

  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  headerContainer: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default SideMenu;