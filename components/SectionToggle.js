import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {theme} from '../core/theme';
import Switch from "react-native-paper/src/components/Switch";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SectionToggle = ({label, switchValue, handleSwitchChange, ...props}) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.innerContainer}>
            <Switch value={switchValue}
                    onValueChange={() => {
                        handleSwitchChange(switchValue)
                    }}
                    color={theme.colors.graphSwitchColor}/>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        marginVertical: 2,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#000',
        alignItems: 'center',
    },
    label: {
        width: '80%',
        fontSize: 16,
        fontWeight: "900",
        color: theme.colors.label,
    }
});

export default SectionToggle;