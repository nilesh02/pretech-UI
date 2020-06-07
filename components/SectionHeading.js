import React from 'react';
import { View, StyleSheet, Text,Dimensions } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SectionHeading = ({heading,...props }) => (
    <View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      marginVertical: 0.4,
      padding: 15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize:15,
      fontFamily:'bold',
      color: theme.colors.heading,
    },
  });
  
  export default SectionHeading;