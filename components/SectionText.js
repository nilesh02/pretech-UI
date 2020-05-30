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
        width: '95%',
        marginVertical: 2,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        borderRadius: 20,
        borderWidth: 1,
        // borderColor: '#eb6e3d'
    },
    innerContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#000',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: "900",
        color: theme.colors.label,
    },
    value: {
        fontWeight: "500",
        fontSize: 15,
        color: theme.colors.value,
        alignItems: 'center',
    },
    unit: {
        fontWeight: "500",
        fontSize: 13,
        color: theme.colors.unit,
        alignItems: 'center',
    },
});

export default SectionText;
