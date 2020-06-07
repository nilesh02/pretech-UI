import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {theme} from '../core/theme';

const TopSection = ({batchNumber, ProductName, OfficeInCharge, ...props}) => (
    <View style={styles.container}>
        <ImageBackground
            style={styles.container}
            source={require('../assets/Orange-BG.png')}
            imageStyle={{ resizeMode: 'cover' }}
        >
        <View style={styles.innerContainer}>
            <Text style={styles.textStyleOfficerName}>{OfficeInCharge}</Text>
            <Text style={styles.textStyleOfficerInCharge}>(Officer In Charge)</Text>
        </View>
        <View style={styles.innerContainerBottom}>
            <Text style={styles.textStyleBatchNumber}>Batch Number</Text>
            <Text style={styles.textStyleBatchNumberRight}>{batchNumber}</Text>
        </View>
        <View style={styles.innerContainerBottom1}>
            <Text style={styles.textStyleBatchNumber}>Product Name</Text>
            <Text style={styles.textStyleBatchNumberRight}>{ProductName}</Text>
        </View>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 280,
        backgroundColor: theme.colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    innerContainer: {
        marginTop: 50,
        alignSelf: 'center'
    },
    innerContainerBottom: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'flex-start'
    },
    innerContainerBottom1: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start'
    },
    textStyleOfficerName: {
        color: '#ffffff',
        fontFamily: 'bold',
        fontSize: 30,
        marginTop: 30,
        alignSelf: 'center'
    },
    textStyleOfficerInCharge: {
        color: '#ffffff',
        fontFamily: 'regular',
        fontSize: 16,
        alignSelf: 'center'
    },
    textStyleBatchNumber: {
        color: '#ffffff',
        fontFamily: 'regular',
        fontSize: 16,
        paddingLeft: '20%'
    },
    textStyleBatchNumberRight: {
        color: '#ffffff',
        fontFamily: 'bold',
        fontSize: 16,
        paddingLeft: '10%'
    },
});

export default TopSection;
