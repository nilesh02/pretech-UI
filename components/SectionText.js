import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {theme} from '../core/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SectionText = ({label, value, unit, ...props}) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.innerContainer}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.unit}>{unit}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 0.5,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#000',
        alignItems: 'center',
    },
    label: {
        fontSize: 13,
        color: theme.colors.label,
        fontFamily:'bold',
    },
    value: {
        fontSize: 13,
        color: theme.colors.value,
        alignItems: 'center',
        fontFamily:'bold',
    },
    unit: {
        fontFamily:'bold',
        fontSize: 11,
        color: theme.colors.unit,
        alignItems: 'center',
    },
});

export default SectionText;
