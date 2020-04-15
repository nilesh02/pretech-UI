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
      flexDirection:'row',
      width: '95%',
      marginVertical:2,
      padding:15,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      elevation:3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
    },
    heading: {
      fontSize:16,
      fontWeight:"bold",
      color: theme.colors.heading,
    },
  });
  
  export default SectionHeading;