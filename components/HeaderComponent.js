import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {theme} from '../core/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderComponent = ({title,  ...props}) => (
    <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: "900",
        color: theme.colors.label,
    }
});

export default HeaderComponent;
