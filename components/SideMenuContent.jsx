import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import content from '../Texts/Contents.json';

const SideMenuContent = () => {

  const renderContent = (items) => {
    return items.map((item, index) => {
      switch(item.type) {
        case 'paragraph':
          return (
            <Text key={index} style={styles.paragraph}>
              {item.content}
            </Text>
          );
        case 'link':
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => Linking.openURL(item.url)}
            >
              <Text style={styles.link}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        default:
          return null;
      }
    });
  };

  return (
    <View style={styles.container}>
      {renderContent(content.sideMenu.mainContent.text)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 22,
    color:'white'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  }
});

export default SideMenuContent;